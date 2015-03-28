---
layout: post
title: Taking Web Audio Offline in iOS 6 Safari
titleinfo: Alex Gibson
desc: How to cache audio files for offline use using the Web Audio API
---

The following words are from of my first [guest post for HTML5 Doctor](http://html5doctor.com/author/alexg/). You can read the [original article here](http://html5doctor.com/taking-web-audio-offline-in-ios-6-safari/).

Playing cached audio for offline use on iOS Safari has long been a challenge that has proved to be mission impossible. With the advent of the [Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html) however, it is now finally achievable (despite still needing to jump through a few hoops).

The bad news is that you still can't cache an MP3 file using [Application Cache](http://html5doctor.com/go-offline-with-application-cache/), and then simply load it using an `XmlHttpRequest`. Safari on iOS6 will cache the MP3, but then refuse to play it and fail silently (how useful!). But all is not lost…

Base64 to the rescue
--------------------

Because the Web Audio API offers developers direct control over the [audioBuffer](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioBufferSourceNode), it means you can now convert data formats on-the-fly and then feed it directly to the Web Audio API for playback. For example, if you encode an MP3 file as a base64 string, you can then decode it to an [arrayBuffer](https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBuffer) and convert the raw audio data.

Encoding an audio file
----------------------

You can easily convert an mp3 file to a base64 string using [OpenSSL](http://www.openssl.org/). If you are on Mac OSX it comes pre-installed, so just open up Terminal and type the following command. Make sure to replace `<infile>` with the path to your mp3, and `<outfile>` with your chosen destination for the encoded data.

`openssl base64 -in <infile> -out <outfile>`

This will output a base64 string representation of your sound file. You can then cache the string using any form of web storage you choose (e.g. [Application Cache](http://html5doctor.com/go-offline-with-application-cache/), [localStorage](http://html5doctor.com/storing-data-the-simple-html5-way-and-a-few-tricks-you-might-not-have-known/), [webSQL](http://html5doctor.com/introducing-web-sql-databases/))

Base64 to arrayBuffer
---------------------

In order to decode the base64 string back into an [arrayBuffer](https://developer.mozilla.org/en/JavaScript_typed_arrays/ArrayBuffer), you will need to use a custom method. Check out Daniele Guerrero's [base64-binary.js](https://github.com/danguer/blog-examples/blob/master/js/base64-binary.js) as a good script that can be used exactly for this purpose. It decodes a base64 string into a [Uint8Array](https://developer.mozilla.org/en/JavaScript_typed_arrays/Uint8Array) typed array and stores it in an `arrayBuffer`. Once this is done, it is then simply a case of decoding the audio data using the Web Audio API's `decodeAudioData()` method.

{% highlight javascript %}
var arrayBuff = Base64Binary.decodeArrayBuffer(sound);

myAudioContext.decodeAudioData(arrayBuff, function(audioData) {
    myBuffer = audioData;
});
{% endhighlight %}

Once you have the audio data decoded, it is just a case of passing it to your audio buffer source and playing the sound.

{% highlight javascript %}
mySource = myAudioContext.createBufferSource();
mySource.buffer = myBuffer;
mySource.connect(myAudioContext.destination);
mySource.noteOn(0);
{% endhighlight %}

Full demo and source code
-------------------------

Check out the [online demo](http://alxgbsn.co.uk/offlinewebaudio/) and [source code](https://github.com/alexgibson/offlinewebaudio) for a complete example of the techniques discussed in this article.

Browser support
---------------

Currently the demo works in Safari 6, Chrome desktop and iOS6 Safari. The technique has potential to work in any browser that supports Web Audio API however, so hopefully Chrome Mobile can soon add support as well.

The W3C is currently pursuing the Web Audio API [as a standard](http://www.w3.org/2011/audio/wiki/W3C_Audio_Publications_and_Milestones).
