---
layout: post
title: Fun with Web Audio and other modern API's
titleinfo: Alex Gibson
desc: An article on building a synth effect unit using the Web Audio API and other new features available to web developers.
---

Of all the new JavaScript API's becoming available in web browsers today, the [Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html) has to be one of the most exciting recent additions for web app and HTML5 game developers. This API opens a whole range of new possibilities, and requires very little knowledge of DSP to achieve some pretty impressive results. In short, it offers the developer a lot more scope and control when compared to <del>using</del> abusing the poor old [HTML5 Audio element](http://html5doctor.com/native-audio-in-the-browser/).

The Web Audio API
-----------------

The Web Audio API works a bit like wiring together a modular, programmable synthesizer or audio processor. It is not only capable of playing back pre-recorded sounds with sample accuracy, but it can also create raw sound using [oscillators](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#Oscillator) and waveforms - the core elements of any audio synthesizer. It can route sounds, perform [frequency analysis](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#RealtimeAnalyserNode) and even apply native effects such as [convolution reverb](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#ConvolverNode), [delay](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#DelayNode) and [distortion](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#WaveShaperNode) effects.

The Web Audio API is currently supported in Chrome, Safari 6 and iOS6 Safari. I thought it was about time to start learning how to use the API and have some fun experimenting, so after a few hours I managed to throw together a relatively simple [synth effect unit](https://alexgibson.github.io/wavepad). It's both mouse and touch friendly, and functions in a similar way to the [Korg Kaoss Pad](http://www.korg.com/uk/products/dj/kaoss_pad_kp3_plus/), albeit with a much simpler set of features.

The basic audio components for the demo are pretty simple. It consists of a single oscillator, a filter, a delay node, and two volume gain nodes (one for delay feedback, the other for master output). The demo also uses an audio frequency analyzer to create a visual representation of the audio output, which is drawn to the [Canvas](https://developer.mozilla.org/en-US/docs/HTML/Canvas) for added real time, visual feedback.

Please note that the current WebKit implementation shown in the code examples below may differ from the final non-prefixed version, according to the official [W3C specification](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html).

{% highlight javascript %}
var myAudioContext = new webkitAudioContext();
var myAudioAnalyser = myAudioContext.createAnalyser();
var source = myAudioContext.createOscillator();
var nodes = {};

nodes.filter = myAudioContext.createBiquadFilter();
nodes.volume = myAudioContext.createGainNode();
nodes.delay = myAudioContext.createDelayNode();
nodes.feedbackGain = myAudioContext.createGainNode();
{% endhighlight %}

The `source` is then routed through the processor `nodes` and connected to the audio context destination (i.e. the speakers).

{% highlight javascript %}
source.connect(nodes.filter);
nodes.filter.connect(nodes.volume);
nodes.filter.connect(nodes.delay);
nodes.delay.connect(nodes.feedbackGain);
nodes.feedbackGain.connect(nodes.volume);
nodes.feedbackGain.connect(nodes.delay);
nodes.volume.connect(myAudioAnalyser);
myAudioAnalyser.connect(myAudioContext.destination);
{% endhighlight %}

Responding to user input
------------------------

Touching the user interface surface manipulates the oscillator frequency along the `x` axis, and the filter cutoff value along the `y` axis. To start the sound, `source.noteOn(0)` is called.

{% highlight javascript %}
source.frequency.value = x;
nodes.filter.frequency.value = y;
source.noteOn(0);
{% endhighlight %}

There are a range of different waveforms to use in the main oscillator, and multiple different filter types to experiment with. It's more a musical toy than anything serious, but it can produce some interesting sci-fi effects and spaced-out synth sounds by using different delay times and feedback settings. If you haven't already, have some fun and [try it out](https://alexgibson.github.io/wavepad).

Because this is a demo that currently runs in only the most modern browsers, I was also free to use some other useful new API's and CSS effects.

Smoother animations using requestAnimationFrame
-----------------------------------------------

Canvas animation frame rate is handled by the browser using [requestAnimationFrame](http://paulirish.com/2011/requestanimationframe-for-smart-animating/). This helps to achieve smoother animation and better browser performance. It is also better for your CPU (and battery), as <abbr title="requestAnimationFrame">rAF</abbr> will automatically pause animation when the browser tab is not visible.

{% highlight javascript %}
function animateSpectrum () {
    var mySpectrum = requestAnimationFrame(animateSpectrum);
    drawSpectrum();
}
{% endhighlight %}

CSS Filter effects
------------------

The red blur effect on the finger tracking element is achieved using [CSS filter effects](http://www.html5rocks.com/en/tutorials/filters/understanding-css/).

{% highlight css %}
.blurred {
    -webkit-filter: blur(5px);
    filter: blur(5px);
}
{% endhighlight %}

window.matchMedia
-----------------

The adaptive user interface switches to a mobile optimized interface when the viewport is smaller than a set threshold. This is done using the [matchMedia](https://developer.mozilla.org/en-US/docs/DOM/window.matchMedia) API to detect CSS Media Queries in JavaScript.

{% highlight javascript %}
if (window.matchMedia) {
    var breakPoint = window.matchMedia('(max-width: 512px)');
    var isSmallViewport = breakPoint.matches ? true : false;

    breakPoint.addListener(function (mql) {
        isSmallViewport = mql.matches ? true : false;
    });
}
{% endhighlight %}

classList API
-------------

CSS active and pressed states are applied using the handy new [classList API](https://developer.mozilla.org/en-US/docs/DOM/element.classList). This makes adding and removing multiple class names in CSS much less of a chore.

{% highlight javascript %}
var finger = document.querySelector('.finger');

finger.classList.add('active');
finger.classList.remove('active');
{% endhighlight %}

Page Visibility API
-------------------

Audio is automatically muted when the browser tab is not active using the [Page Visibility API](http://www.nczonline.net/blog/2011/08/09/introduction-to-the-page-visibility-api/). This is currently supported in Chrome, but not yet in Safari 6.

Demo
----

You can check out the [demo here](https://alexgibson.github.io/wavepad). Try it in Chrome, Safari 6 or iOS6. There are still a few glitches to iron out on iOS6, but feel free to [open an issue](https://github.com/alexgibson/wavepad/issues) if you find a bug or have any new ideas for features.
