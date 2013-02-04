var mixer = (function () {

    'use strict';

    var surface,
        finger,
        source1,
        source2,
        source3,
        source4,
        buffer1,
        buffer2,
        buffer3,
        buffer4,
        nodes = {},
        myAudioContext,
        myAudioAnalyser,
        mySpectrum,
        impulseResponse,
        hasTouch = 'ontouchstart' in window || 'createTouch' in document,
        eventStart = hasTouch ? 'touchstart' : 'mousedown',
        eventMove = hasTouch ? 'touchmove' : 'mousemove',
        eventEnd = hasTouch ? 'touchend' : 'mouseup',
        isSmallViewport = false,
        isMuted = false;

    return {

        init: function () {
            var doc = document;

            if ('webkitAudioContext' in window) {
                myAudioContext = new webkitAudioContext();
            } else if ('AudioContext' in window) {
                myAudioContext = new AudioContext();
            } else {
                console.error('Your device does not yet support the Web Audio API');
                return;
            }

            doc.getElementById('play').addEventListener('click', mixer.playSounds, false);
            doc.getElementById('stop').addEventListener('click', mixer.stopSounds, false);

            mixer.loadSoundFile('sound1.mp3', 1);
            mixer.loadSoundFile('sound2.mp3', 2);
            mixer.loadSoundFile('sound3.mp3', 3);
            mixer.loadSoundFile('sound4.mp3', 4);

            nodes.volume1 = myAudioContext.createGainNode();
            nodes.volume2 = myAudioContext.createGainNode();
            nodes.volume3 = myAudioContext.createGainNode();
            nodes.volume4 = myAudioContext.createGainNode();
            nodes.masterVolume = myAudioContext.createGainNode();

            myAudioAnalyser = myAudioContext.createAnalyser();
            myAudioAnalyser.smoothingTimeConstant = 0.85;
        },

        loadSoundFile: function (url, node) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function (e) {
                console.log('Sound file loaded: ', url);
                mixer.initSound(this.response, node); // this.response is an ArrayBuffer.
            };
            xhr.send();
        },

        initSound: function (arrayBuffer, node) {
            myAudioContext.decodeAudioData(arrayBuffer, function (buffer) {
                switch (node) {
                case 1:
                    buffer1 = buffer;
                    break;
                case 2:
                    buffer2 = buffer;
                    break;
                case 3:
                    buffer3 = buffer;
                    break;
                case 4:
                    buffer4 = buffer;
                    break;
                }

                console.log('Audio file decoded: ', buffer);

                if (buffer1 && buffer2 && buffer3 && buffer4) {
                    mixer.initMixer();
                }
            }, function (e) {
                console.log('Error decoding file', e);
            });
        },

        initMixer: function () {
            var doc = document,
                slider1 = doc.getElementById('channel1'),
                slider2 = doc.getElementById('channel2'),
                slider3 = doc.getElementById('channel3'),
                slider4 = doc.getElementById('channel4');

            doc.getElementById('play').removeAttribute('disabled');
            doc.getElementById('stop').removeAttribute('disabled');

            slider1.addEventListener('input', mixer.sliderChange, false);
            slider2.addEventListener('input', mixer.sliderChange, false);
            slider3.addEventListener('input', mixer.sliderChange, false);
            slider4.addEventListener('input', mixer.sliderChange, false);

            slider1.removeAttribute('disabled');
            slider2.removeAttribute('disabled');
            slider3.removeAttribute('disabled');
            slider4.removeAttribute('disabled');
        },

        routeSounds: function () {

            source1 = myAudioContext.createBufferSource();
            source1.buffer = buffer1;
            source1.loop = true;

            source2 = myAudioContext.createBufferSource();
            source2.buffer = buffer2;
            source2.loop = true;

            source3 = myAudioContext.createBufferSource();
            source3.buffer = buffer3;
            source3.loop = true;

            source4 = myAudioContext.createBufferSource();
            source4.buffer = buffer4;
            source4.loop = true;

            nodes.volume1.gain.value = 0.2;
            nodes.volume2.gain.value = 0.2;
            nodes.volume3.gain.value = 0.2;
            nodes.volume4.gain.value = 0.2;
            nodes.masterVolume.gain.value = 1;

            source1.connect(nodes.volume1);
            source2.connect(nodes.volume2);
            source3.connect(nodes.volume3);
            source4.connect(nodes.volume4);

            nodes.volume1.connect(nodes.masterVolume);
            nodes.volume2.connect(nodes.masterVolume);
            nodes.volume3.connect(nodes.masterVolume);
            nodes.volume4.connect(nodes.masterVolume);

            nodes.masterVolume.connect(myAudioAnalyser);
            myAudioAnalyser.connect(myAudioContext.destination);
        },

        playSounds: function () {
            if (myAudioContext.activeSourceCount > 0) {
                mixer.stopSounds();
            }
            mixer.routeSounds();
            source1.noteOn(0);
            source2.noteOn(0);
            source3.noteOn(0);
            source4.noteOn(0);
        },

        stopSounds: function () {
            if (myAudioContext.activeSourceCount > 0) {
                source1.noteOff(0);
                source2.noteOff(0);
                source3.noteOff(0);
                source4.noteOff(0);
            }
        },

        sliderChange: function (slider) {
            if (myAudioContext.activeSourceCount > 0) {
                switch (slider.target.id) {
                case 'channel1':
                    nodes.volume1.gain.value = slider.target.value;
                    break;
                case 'channel2':
                    nodes.volume2.gain.value = slider.target.value;
                    break;
                case 'channel3':
                    nodes.volume3.gain.value = slider.target.value;
                    break;
                case 'channel4':
                    nodes.volume4.gain.value = slider.target.value;
                    break;
                }
            }
        },

        animateSpectrum: function () {
            mySpectrum = requestAnimationFrame(mixer.animateSpectrum, document.querySelector('canvas'));
            mixer.drawSpectrum();
        },

        drawSpectrum: function () {
            var canvas = document.querySelector('canvas'),
                ctx = canvas.getContext('2d'),
                canvasSize = isSmallViewport ? 256 : 512,
                multiplier = isSmallViewport ? 1 : 2,
                width = canvasSize,
                height = canvasSize,
                bar_width = isSmallViewport ? 10 : 20,
                barCount = Math.round(width / bar_width),
                freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount),
                magnitude,
                i;

            canvas.width = canvasSize - 10;
            canvas.height = canvasSize - 10;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#1d1c25';

            myAudioAnalyser.getByteFrequencyData(freqByteData);

            for (i = 0; i < barCount; i += 1) {
                magnitude = freqByteData[i];
                // some values need adjusting to fit on the canvas
                ctx.fillRect(bar_width * i, height, bar_width - 1, -magnitude * multiplier);
            }
        }
    };
}());

window.addEventListener("DOMContentLoaded", mixer.init, true);