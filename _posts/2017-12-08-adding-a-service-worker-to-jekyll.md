---
layout: post
title: Adding Service Worker to Jekyll
desc: How to integrate a Service Worker in your Jekyll blog to help improve website performance
excerpt: Implementing a Service Worker is something I've only really toyed with in the past. I recently felt like I needed to get reacquainted with their inner workings again, so I decided to implement one for this blog. Here are some tips and tricks I learned along the way.
---

Implementing a Service Worker is something I've only really [toyed with in the past](https://github.com/alexgibson/wavepad). I recently felt like I needed to get reacquainted with their inner workings again, so I decided to implement one for this blog. Here are some tips and tricks I learned along the way.

Choose a caching strategy
-------------------------

Caching is one of the hardest problems in programming, and also one of the main reasons why service workers can be a bit difficult to understand at first. Choosing the wrong caching strategy for your service worker can lead to unexpected and sometimes difficult to reproduce bugs, so it's important to spend some time thinking about what will work best for your website.

The last service worker I wrote used an *offline first* approach. This worked out OK since it was only a single HTML page with a limited number of static assets. The service worker looked in the cache first for any `GET` request, and only went out to the network if there was no match:

{% highlight javascript %}
self.addEventListener('fetch', event => {
    let request = event.request;

    // Always fetch non-GET requests from the network.
    if (request.method !== 'GET') {
        event.respondWith(fetch(request));
        return;
    }

    // Look to the cache first, then fall back to the network.
    event.respondWith(
        caches.match(request).then(response => {
            return response || fetch(request);
        })
    );
});
{% endhighlight %}

For this blog that's not really what I wanted though, since when people visit I want to be sure they always see the most recent content straight away. For this reason I went for a *network first* approach for HTML pages, and falling back to a simple *offline* page if a request fails:

{% highlight javascript %}
self.addEventListener('fetch', event => {
    let request = event.request;

    // Always fetch non-GET requests from the network.
    if (request.method !== 'GET') {
        event.respondWith(fetch(request));
        return;
    }

    // For HTML requests, try the network first else fall back to the offline page.
    if (request.headers.get('Accept').indexOf('text/html') !== -1) {
        event.respondWith(
            fetch(request).catch(() => caches.match('/offline/'))
        );
        return;
    }
});
{% endhighlight %}

I could have additionally chosen to cache pages that users have already visited, and served those up if the network fails and there is a match in the service worker cache. I'm not convinced however, that my personal blog posts are really interesting enough that people actually want them heavily cached on their hard drives, so for now a simple offline page will suffice ;)

Dealing with static assets
--------------------------

In order to get page load performance benefits out of my service worker whilst using a network first strategy for HTML pages, I chose a slightly different strategy for serving static assets such as CSS, JavaScript and image files. Here we look in the service worker cache first and return a response straight away. If no match is found, we go out to the network:

{% highlight javascript %}
self.addEventListener('fetch', event => {
    let request = event.request;

    // Always fetch non-GET requests from the network.
    if (request.method !== 'GET') {
        event.respondWith(fetch(request));
        return;
    }

    // For HTML requests, try the network first else fall back to the offline page.
    if (request.headers.get('Accept').indexOf('text/html') !== -1) {
        event.respondWith(
            fetch(request).catch(() => caches.match('/offline/'))
        );
        return;
    }

    // For non-HTML requests, look in the cache first else fall back to the network.
    event.respondWith(
        caches.match(request).then(response => {
            return response || fetch(request);
        })
    );
});
{% endhighlight %}

There is a potential issue here however. What if a visitor requests an HTML page, but that page uses updated assets that no longer match what's stored in the current service worker cache? This could lead to both visual bugs and broken behavior, which is not good. Rather than try to fight against the cache, using immutable assets is a good strategy here.

Immutability to the rescue!
---------------------------

Jekyll doesn't support immutable assets out-of-the-box, but luckily there is already a plugin called [jekyll-assets](https://github.com/envygeeks/jekyll-assets) that can hash asset filenames for you (and more). Once I had this installed, I updated both my liquid templates and my service worker's `updateStaticCache` function to use the hashed filenames. This ensures that my service worker never accidentally responds with an outdated asset that a web page might be using, since the actual file names are individually hashed:

{% highlight javascript %}
function updateStaticCache() {
    return caches.open(cacheName).then(cache => {
        return cache.addAll([
            {% raw %}'{{ assets['styles.scss'].digest_path }}',
            '{{ assets['main.js'].digest_path }}',
            '{{ assets['avatar-180.png'].digest_path }}',
            '/offline/'{% endraw %}
        ]);
    });
}
{% endhighlight %}

In order to get Jekyll to parse the JavaScript here, I had to trick it into thinking the file is a piece of YAML front-matter. You can do this by inserting two rows of three dashes at the top of the service worker file. I also used Jekll's date/time functions to automatically version the Service Worker each time the static site is generated:

{% highlight javascript %}{% raw %}
---
---

const version = '{{site.time | date: '%Y%m%d%H%M%S'}}';
const cacheName = `static::${version}`;
{% endraw%}{% endhighlight %}

If you're curious to see everything together, you can view my [full service worker code here](https://github.com/alexgibson/alxgbsn.co.uk/blob/master/sw.js).
