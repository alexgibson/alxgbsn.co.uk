---
layout: post
title: Creating a dark mode theme using CSS Custom Properties
desc: How to create a simple and efficient dark mode colour theme using CSS Custom Properties.
excerpt: Variables are one of the many reasons people use CSS preprocessors today. Referencing recurring values (such as for color, margin and padding etc) helps us to write cleaner, more maintainable, and consistent CSS. Whilst preprocessors have extended CSS with some great patterns that we now often take for granted, using variables when compiling to static CSS has some pretty hard limitations. This is especially true when it comes to theming.
---

Variables are one of the many reasons people use CSS preprocessors today. Referencing recurring values (such as for `color`, `margin` and `padding` etc) helps us to write cleaner, more maintainable, and consistent CSS. Whilst preprocessors have extended CSS with some great patterns that we now often take for granted, using variables when compiling to static CSS has some pretty hard limitations. This is especially true when it comes to theming.

As an example, let's take a look at creating a dark mode theme using [Sass](https://sass-lang.com/). Here's a simplified example for what could be a basic page header:

```scss

$color-background: #fff;
$color-text: #000;
$color-title: #999;

$color-background-dark: #000;
$color-text-dark: #fff;
$color-title-dark: #ccc;

.header {
    // default theme colours
    background-color: $color-background;
    color: $color-text;

    .header-title {
        color: $color-title;
    }

    // dark theme colours
    .t-dark & {
        background-color: $color-background-dark;
        color: $color-text-dark;

        .header-title {
            color: $color-title-dark;
        }
    }
}
```

The above example isn't very complicated, but it also isn't terribly efficient. Because Sass has to compile all our styles down to static CSS at build time, we lose all the benefits that dynamic variables could provide. We end up generating selectors for each theme style, and repeating the same properties for each colour change. Here's what the generated CSS looks like:

```css
.header {
    background-color: #fff;
    color: #000;
}

.header .header-title {
    color: #999;
}

.t-dark .header {
    background-color: #000;
    color: #fff;
}

.t-dark .header .header-title {
    color: #ccc;
}
```


This may not look like much, but for large or complex projects with many of components, this pattern can end up creating a lot of extra CSS. Bundling every selector required to do each theme is suboptimal in terms of performance. We could try to solve this by compiling each theme to a separate stylesheet and then dynamically loading our CSS, or by removing unused CSS post-compilation, but this all adds more complexity when it should be simple.

Another issue with the above pattern is related to maintainability. Ensuring that selectors and matching properties exist for each theme can easily be prone to human error. We could try and alleviate this by using component mixins to generate our CSS, but this still doesn't fix the underlying problem we see with static compilation. Wouldn't it be great if we could just update the variables at runtime and be done with it all?

Hello Custom Properties
-----------------------

[CSS Custom Properties](https://developer.mozilla.org/docs/Web/CSS/--*) (or CSS variables, as they are commonly referred to) help to solve many of these problems. Unlike preprocessors which compile variables to static values in CSS, custom properties are _dynamic_. This makes them incredibly flexible and a perfect fit for writing efficient, practical CSS themes.

Custom properties are powerful because they follow the rules of [inheritance](https://developer.mozilla.org/docs/Learn/CSS/Introduction_to_CSS/Cascade_and_inheritance) and the [cascade](https://developer.mozilla.org/docs/Web/CSS/Cascade), just like regular CSS properties. If the value of a custom property changes, all DOM elements associated with a selector that uses that property are repainted by the browser automatically.

Here's the same header example implemented using CSS custom properties:

```scss
:root {
    --color-background: #fff;
    --color-text: #000;
    --color-title: #999;
}

:root.t-dark {
    --color-background: #000;
    --color-text: #fff;
    --color-title: #ccc;
}

.header {
    background-color: var(--color-background);
    color: var(--color-text);

    .header-title {
        color: var(--color-title);
    }
}
```

Much more readable and succinct! We only ever have to write our header component CSS once, and our theme colours can be updated dynamically at runtime in the browser. Whilst this is only a basic example, it is easy to see how this scales _so much_ better. And because custom properties are _dynamic_ it means we can do all kinds of new things, such as change their values from within CSS media queries, or even via JavaScript.

Supporting dark mode in macOS Mojave
------------------------------------

Safari recently added support for a `prefers-color-scheme` media query that works with macOS Mojave's new dark mode feature. This enables web pages to opt-in to whichever mode the system preference is set to.

```scss
@media (prefers-color-scheme: dark) {
    :root {
        --color-background: #000;
        --color-text: #fff;
        --color-title: #ccc;
    }
}
```

You can also detect the preference in JavaScript like so:

```javascript
// detect dark mode preference.
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

Because I'm a big fan of dark UI's (I find them much easier on the eye, especially over extended periods of time), I couldn't resist adding a custom theme to this blog. For browsers which don't yet support `prefers-color-scheme`, I also added a theme toggle to the top right navigation.

Detecting support for CSS custom properties
-------------------------------------------

Detecting browser support for custom properties is pretty straight forward, and can be done in either CSS or JavaScript.

You can detect support for custom properties in CSS using `@supports`:

```scss
@supports (--color-background: #fff) {
    :root {
        --color-background: #fff;
        --color-text: #000;
        --color-title: #999;
    }
}
```

You can also provide fallbacks for older browsers just by using a previous declaration, which is often simpler.

```scss
.header {
    background-color: #fff;
    background-color: var(--color-background);
}
```

It's worth noting here that providing a fallback does create more redundant properties in your CSS. Depending on your project, not using any fallback may be just fine. Browsers that don't support custom properties will resort to default user agent styles, which are still perfectly accessible.

You can also detect support for custom properties in JavaScript using the following line of code (I'm using this to determine whether or not to initialise the theme selector in the navigation).

```javascript
const supportsCustomProperties = window.CSS && window.CSS.supports('color', 'var(--fake-color');
```

Take a closer look
------------------

If you would like to take a closer look at the code I used to implement my dark mode theme, feel free to poke around at the source code on [GitHub](https://github.com/alexgibson/alxgbsn.co.uk).
