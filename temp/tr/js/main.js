var TRMixer = (function () {

    'use strict';

    var brass,
        highPerc,
        lowPerc,
        strings,
        bufferBrass,
        bufferHighPerc,
        bufferLowPerc,
        bufferStrings,
        nodes = {},
        myAudioContext,
        myAudioAnalyser,
        mySpectrum,
        soundsURL = 'sounds/';

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

            doc.getElementById('play').addEventListener('click', TRMixer.playSounds, false);
            doc.getElementById('stop').addEventListener('click', TRMixer.stopSounds, false);

            TRMixer.loadSoundFile(soundsURL + 'brass.mp3', 1);
            TRMixer.loadSoundFile(soundsURL + 'high-perc.mp3', 2);
            TRMixer.loadSoundFile(soundsURL + 'low-perc.mp3', 3);
            TRMixer.loadSoundFile(soundsURL + 'strings.mp3', 4);

            nodes.volumeBrass = myAudioContext.createGainNode();
            nodes.volumeHighPerc = myAudioContext.createGainNode();
            nodes.volumeLowPerc = myAudioContext.createGainNode();
            nodes.volumeStrings = myAudioContext.createGainNode();
            nodes.masterVolume = myAudioContext.createGainNode();

            myAudioAnalyser = myAudioContext.createAnalyser();
            myAudioAnalyser.smoothingTimeConstant = 0.85;

            TRMixer.animateSpectrum();

            doc.addEventListener('touchmove', function (e) {
                if (e.target.type === 'range') { return; }
                e.preventDefault();
            }, false);
        },

        loadSoundFile: function (url, node) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function (e) {
                console.log('Sound file loaded: ', url);
                TRMixer.initSound(this.response, node); // this.response is an ArrayBuffer.
            };
            xhr.send();
        },

        initSound: function (arrayBuffer, node) {
            myAudioContext.decodeAudioData(arrayBuffer, function (buffer) {
                switch (node) {
                case 1:
                    bufferBrass = buffer;
                    break;
                case 2:
                    bufferHighPerc = buffer;
                    break;
                case 3:
                    bufferLowPerc = buffer;
                    break;
                case 4:
                    bufferStrings = buffer;
                    break;
                }

                console.log('Sound file decoded: ', buffer);

                if (bufferBrass && bufferHighPerc && bufferLowPerc && bufferStrings) {
                    TRMixer.initMixer();
                    console.log('Mixer status: ready');
                }
            }, function (e) {
                console.log('Error decoding file', e);
                document.getElementById('status').innerHTML = 'Status: Error loading sounds';
            });
        },

        initMixer: function () {
            var doc = document,
                brassSlider = doc.getElementById('brass'),
                highPercSlider = doc.getElementById('high-perc'),
                lowPercSlider = doc.getElementById('low-perc'),
                stringsSlider = doc.getElementById('strings');

            doc.getElementById('status').innerHTML = 'Status: Ready';
            doc.getElementById('play').removeAttribute('disabled');
            doc.getElementById('stop').removeAttribute('disabled');

            brassSlider.addEventListener('input', TRMixer.sliderChange, false);
            highPercSlider.addEventListener('input', TRMixer.sliderChange, false);
            lowPercSlider.addEventListener('input', TRMixer.sliderChange, false);
            stringsSlider.addEventListener('input', TRMixer.sliderChange, false);

            brassSlider.removeAttribute('disabled');
            highPercSlider.removeAttribute('disabled');
            lowPercSlider.removeAttribute('disabled');
            stringsSlider.removeAttribute('disabled');
        },

        routeSounds: function () {
            var doc = document;

            brass = myAudioContext.createBufferSource();
            brass.buffer = bufferBrass;
            brass.loop = true;

            highPerc = myAudioContext.createBufferSource();
            highPerc.buffer = bufferHighPerc;
            highPerc.loop = true;

            lowPerc = myAudioContext.createBufferSource();
            lowPerc.buffer = bufferLowPerc;
            lowPerc.loop = true;

            strings = myAudioContext.createBufferSource();
            strings.buffer = bufferStrings;
            strings.loop = true;

            nodes.volumeBrass.gain.value = doc.getElementById('brass').value;
            nodes.volumeHighPerc.gain.value = doc.getElementById('high-perc').value;
            nodes.volumeLowPerc.gain.value = doc.getElementById('low-perc').value;
            nodes.volumeStrings.gain.value = doc.getElementById('strings').value;
            nodes.masterVolume.gain.value = 1;

            brass.connect(nodes.volumeBrass);
            highPerc.connect(nodes.volumeHighPerc);
            lowPerc.connect(nodes.volumeLowPerc);
            strings.connect(nodes.volumeStrings);

            nodes.volumeBrass.connect(nodes.masterVolume);
            nodes.volumeHighPerc.connect(nodes.masterVolume);
            nodes.volumeLowPerc.connect(nodes.masterVolume);
            nodes.volumeStrings.connect(nodes.masterVolume);

            nodes.masterVolume.connect(myAudioAnalyser);
            myAudioAnalyser.connect(myAudioContext.destination);
        },

        playSounds: function () {
            if (myAudioContext.activeSourceCount > 0) {
                TRMixer.stopSounds();
            }
            TRMixer.routeSounds();
            brass.noteOn(0);
            highPerc.noteOn(0);
            lowPerc.noteOn(0);
            strings.noteOn(0);
            console.log('Mixer -> Playing');
        },

        stopSounds: function () {
            if (myAudioContext.activeSourceCount > 0) {
                brass.noteOff(0);
                highPerc.noteOff(0);
                lowPerc.noteOff(0);
                strings.noteOff(0);
                console.log('Mixer -> Stopped');
            }
        },

        sliderChange: function (slider) {
            if (myAudioContext.activeSourceCount > 0) {
                switch (slider.target.id) {
                case 'brass':
                    nodes.volumeBrass.gain.value = slider.target.value;
                    break;
                case 'high-perc':
                    nodes.volumeHighPerc.gain.value = slider.target.value;
                    break;
                case 'low-perc':
                    nodes.volumeLowPerc.gain.value = slider.target.value;
                    break;
                case 'strings':
                    nodes.volumeStrings.gain.value = slider.target.value;
                    break;
                }
            }
        },

        animateSpectrum: function () {
            mySpectrum = requestAnimationFrame(TRMixer.animateSpectrum, document.getElementById('spectrum-output'));
            TRMixer.drawSpectrum();
        },

        drawSpectrum: function () {
            var canvas = document.querySelector('canvas'),
                ctx = canvas.getContext('2d'),
                canvasSize = 250,
                width = canvasSize,
                height = canvasSize,
                bar_width = 10,
                barCount = Math.round(width / bar_width),
                freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount),
                magnitude,
                i;

            canvas.width = canvasSize - 10;
            canvas.height = canvasSize - 10;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#333';

            myAudioAnalyser.getByteFrequencyData(freqByteData);

            for (i = 0; i < barCount; i += 1) {
                magnitude = freqByteData[i];
                // some values need adjusting to fit on the canvas
                ctx.fillRect(bar_width * i, height, bar_width - 1, - magnitude);
            }
        }
    };
}());

window.addEventListener("DOMContentLoaded", TRMixer.init, true);