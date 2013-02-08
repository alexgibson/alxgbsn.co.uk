
/*
 * 
 * Tomb Raider Music Mixer
 * Web Audio API programming by Alex Gibson 2013
 * http://alxgbsn.co.uk | @alex_gibson
 * 
 */

/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, console: false, webkitAudioContext: false, AudioContext: false, requestAnimationFrame: false, Uint8Array: false */

var TRMixer = (function () {

    'use strict';

    var brass,                              //brass source node
        highPerc,                           //high perc source node
        lowPerc,                            //low perc source node
        strings,                            //strings source node
        bufferBrass,                        //brass audio buffer
        bufferHighPerc,                     //high perc audio buffer
        bufferLowPerc,                      //low perc audio buffer
        bufferStrings,                      //strings audio buffer
        nodes = {},                         //nodes object
        myAudioContext,                     //web audio context
        myAudioAnalyser,                    //audio analyser
        mySpectrum,                         //audio apectrum graph
        brassFile = 'brass.m4a',            //brass audio filename
        highPercFile = 'high-perc.m4a',     //high perc audio filename
        lowPercFile = 'low-perc.m4a',       //low perc audio filename
        stringsFile = 'strings.m4a',        //strings audio filename
        soundsURL = 'sounds/';              //sounds URL path

    return {

        /*
         * Initialise loading sound files and create Web Audio component nodes
         */
        init: function () {
            var doc = document;

            //create an audio context
            if ('webkitAudioContext' in window) {
                myAudioContext = new webkitAudioContext();
            } else if ('AudioContext' in window) {
                myAudioContext = new AudioContext();
            } else {
                console.error('Your device does not yet support the Web Audio API');
                return;
            }

            //add click event listeners for play & stop buttons
            doc.getElementById('toggle').addEventListener('click', TRMixer.toggleSounds, false);

            //load sounds files
            TRMixer.loadSoundFile(soundsURL + brassFile, 1);
            TRMixer.loadSoundFile(soundsURL + highPercFile, 2);
            TRMixer.loadSoundFile(soundsURL + lowPercFile, 3);
            TRMixer.loadSoundFile(soundsURL + stringsFile, 4);

            //create volume gain nodes for each sound
            nodes.volumeBrass = myAudioContext.createGainNode();
            nodes.volumeHighPerc = myAudioContext.createGainNode();
            nodes.volumeLowPerc = myAudioContext.createGainNode();
            nodes.volumeStrings = myAudioContext.createGainNode();

            //creat master volume gain node
            nodes.masterVolume = myAudioContext.createGainNode();

            //create audio analyser node
            myAudioAnalyser = myAudioContext.createAnalyser();
            myAudioAnalyser.smoothingTimeConstant = 0.85;

            //animate spectrum analyser
            TRMixer.animateSpectrum();

            //prevent default document scrolling
            doc.addEventListener('touchmove', function (e) {
                if (e.target.type === 'range') { return; }
                e.preventDefault();
            }, false);

            //enable CSS active pseudo styles
            doc.addEventListener("touchstart", function() {}, false);
        },

        /**
         * Helper method to request a sound file and call initialise on load
         * @param url (string), mixerChannel (number)
         */
        loadSoundFile: function (url, mixerChannel) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function (e) {
                console.log('Sound file loaded: ', url);
                TRMixer.initSound(this.response, mixerChannel); // this.response is an ArrayBuffer.
            };
            xhr.send();
        },

        /**
         * Initialise audioBuffers by decoding mp3 audio data
         * @param arrayBuffer (arrayBuffer), mixerChannel (number)
         */
        initSound: function (arrayBuffer, mixerChannel) {
            myAudioContext.decodeAudioData(arrayBuffer, function (buffer) {
                switch (mixerChannel) {
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

                //if all four audioBuffers are ready, initialise the mixer interface
                if (bufferBrass && bufferHighPerc && bufferLowPerc && bufferStrings) {
                    TRMixer.initMixer();
                    console.log('Mixer -> Ready');
                }
            }, function (e) {
                //something went wrong loading the sounds, log an error
                console.error('Error decoding file', e);
            });
        },

        /**
         * Initialise the mixer user interface
         */
        initMixer: function () {
            var doc = document,
                brassSlider = doc.getElementById('brass'),
                highPercSlider = doc.getElementById('high-perc'),
                lowPercSlider = doc.getElementById('low-perc'),
                stringsSlider = doc.getElementById('strings');

            //enable play & stop button
            doc.getElementById('toggle').removeAttribute('disabled');

            //add input event listeners for slider changes
            brassSlider.addEventListener('input', TRMixer.sliderChange, false);
            highPercSlider.addEventListener('input', TRMixer.sliderChange, false);
            lowPercSlider.addEventListener('input', TRMixer.sliderChange, false);
            stringsSlider.addEventListener('input', TRMixer.sliderChange, false);

            //enable sliders
            brassSlider.removeAttribute('disabled');
            highPercSlider.removeAttribute('disabled');
            lowPercSlider.removeAttribute('disabled');
            stringsSlider.removeAttribute('disabled');
        },

        /**
         * Set the audioBuffer sources and connect the nodes to destination (speakers)
         */
        routeSounds: function () {
            var doc = document;

            //brass source
            brass = myAudioContext.createBufferSource();
            brass.buffer = bufferBrass;
            brass.loop = true;

            //high percussion source
            highPerc = myAudioContext.createBufferSource();
            highPerc.buffer = bufferHighPerc;
            highPerc.loop = true;

            //low percussion source
            lowPerc = myAudioContext.createBufferSource();   
            lowPerc.buffer = bufferLowPerc;
            lowPerc.loop = true;

            //strings source
            strings = myAudioContext.createBufferSource(); 
            strings.buffer = bufferStrings;
            strings.loop = true;

            //set volumes based on current slider values
            nodes.volumeBrass.gain.value = doc.getElementById('brass').value;
            nodes.volumeHighPerc.gain.value = doc.getElementById('high-perc').value;
            nodes.volumeLowPerc.gain.value = doc.getElementById('low-perc').value;
            nodes.volumeStrings.gain.value = doc.getElementById('strings').value;
            nodes.masterVolume.gain.value = 1;

            //connect the sources to volume nodes
            brass.connect(nodes.volumeBrass);
            highPerc.connect(nodes.volumeHighPerc);
            lowPerc.connect(nodes.volumeLowPerc);
            strings.connect(nodes.volumeStrings);

            //connect the volume nodes to master gain node
            nodes.volumeBrass.connect(nodes.masterVolume);
            nodes.volumeHighPerc.connect(nodes.masterVolume);
            nodes.volumeLowPerc.connect(nodes.masterVolume);
            nodes.volumeStrings.connect(nodes.masterVolume);

            //connect master gain node to audio analyser
            nodes.masterVolume.connect(myAudioAnalyser);

            //connect audio analyser to the speakers
            myAudioAnalyser.connect(myAudioContext.destination);
        },

        toggleSounds: function () {
            var button = document.getElementById('toggle');
            if (myAudioContext.activeSourceCount > 0) {
                TRMixer.stopSounds();
                button.classList.remove('on');
            } else {
                TRMixer.playSounds();
                button.classList.add('on');
            }
        },

        /**
         * Start playing the sounds
         */
        playSounds: function () {
            TRMixer.routeSounds();
            brass.noteOn(0);
            highPerc.noteOn(0);
            lowPerc.noteOn(0);
            strings.noteOn(0);
            console.log('Mixer -> Playing');
        },

        /**
         * Stop playing the sounds
         */
        stopSounds: function () {
            if (myAudioContext.activeSourceCount > 0) {
                brass.noteOff(0);
                highPerc.noteOff(0);
                lowPerc.noteOff(0);
                strings.noteOff(0);
                console.log('Mixer -> Stopped');
            }
        },

        /**
         * Event handler for slider input changes
         * @param slider (event object)
         */
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

        /**
         * Animation loop for audio analyser canvas output governed by requestAnimationFrame
         */
        animateSpectrum: function () {
            mySpectrum = requestAnimationFrame(TRMixer.animateSpectrum, document.getElementById('spectrum-output'));
            TRMixer.drawSpectrum();
        },

        /**
         * Draws audio frequency byte data to canvas
         */
        drawSpectrum: function () {
            var canvas = document.querySelector('canvas'),
                ctx = canvas.getContext('2d'),
                width = 340,
                height = 250,
                bar_width = 15,
                barCount = Math.round(width / bar_width),
                freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount),
                magnitude,
                i;

            canvas.width = width - 10;
            canvas.height = height - 10;

            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(172, 225, 133, 0.8)';

            myAudioAnalyser.getByteFrequencyData(freqByteData);

            for (i = 0; i < barCount; i += 1) {
                magnitude = freqByteData[i];
                // some values need adjusting to fit on the canvas
                ctx.fillRect(bar_width * i, height, bar_width - 1, -magnitude);
            }
        }
    };
}());

window.addEventListener("DOMContentLoaded", TRMixer.init, true);