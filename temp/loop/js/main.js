var wavepad = (function () {

    'use strict';

    var surface,
        finger,
        source,
        source2,
        source3,
        source4,
        audioBuffer,
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
                    alert('Your browser does not yet support the Web Audio API');
                    return;
                }

                doc.getElementById('play').addEventListener('click', wavepad.playSounds, false);
                doc.getElementById('stop').addEventListener('click', wavepad.stopSounds, false);

                wavepad.loadSoundFile('alert.mp3');
                wavepad.loadSoundFile2('sound2.mp3');
                wavepad.loadSoundFile3('sound3.mp3');
                wavepad.loadSoundFil4('sound4.mp3');
                  
                nodes.volume = myAudioContext.createGainNode();
                nodes.volume2 = myAudioContext.createGainNode();
                nodes.volume3 = myAudioContext.createGainNode();
                nodes.volume4 = myAudioContext.createGainNode();
                nodes.masterVolume = myAudioContext.createGainNode();
                
                myAudioAnalyser = myAudioContext.createAnalyser();
                myAudioAnalyser.smoothingTimeConstant = 0.85;
            },

            loadSoundFile: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function(e) {
                    wavepad.initSound(this.response); // this.response is an ArrayBuffer.
                };
                xhr.send();
            },

            initSound: function (arrayBuffer) {
                myAudioContext.decodeAudioData(arrayBuffer, function(buffer) {
                    audioBuffer = buffer;
                }, function(e) {
                    console.log('Error decoding file', e);
                }); 
            },

            loadSoundFile2: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function(e) {
                    wavepad.initSound2(this.response); // this.response is an ArrayBuffer.
                };
                xhr.send();
            },

            initSound2: function (arrayBuffer) {
                myAudioContext.decodeAudioData(arrayBuffer, function(buffer) {
                    audioBuffer2 = buffer;
                }, function(e) {
                    console.log('Error decoding file', e);
                }); 
            },

            loadSoundFile3: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function(e) {
                    wavepad.initSound3(this.response); // this.response is an ArrayBuffer.
                };
                xhr.send();
            },

            initSound3: function (arrayBuffer) {
                myAudioContext.decodeAudioData(arrayBuffer, function(buffer) {
                    audioBuffer3 = buffer;
                }, function(e) {
                    console.log('Error decoding file', e);
                }); 
            },

            loadSoundFile4: function (url) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function(e) {
                    wavepad.initSound4(this.response); // this.response is an ArrayBuffer.
                };
                xhr.send();
            },

            initSound4: function (arrayBuffer) {
                myAudioContext.decodeAudioData(arrayBuffer, function(buffer) {
                    audioBuffer4 = buffer;
                }, function(e) {
                    console.log('Error decoding file', e);
                }); 
            },

            routeSounds: function () {

                source = myAudioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.loop = true;

                source2 = myAudioContext.createBufferSource();
                source2.buffer = audioBuffer2;
                source2.loop = true;

                source3 = myAudioContext.createBufferSource();
                source3.buffer = audioBuffer3;
                source3.loop = true;

                source4 = myAudioContext.createBufferSource();
                source4.buffer = audioBuffer4;
                source4.loop = true;

                nodes.volume.gain.value = 1;
                nodes.volume2.gain.value = 0.2;
                nodes.volume3.gain.value = 0.2;
                nodes.volume4.gain.value = 0.2;
                nodes.masterVolume.gain.value = 0.2;

                source.connect(nodes.volume);
                source2.connect(nodes.volume2);
                source3.connect(nodes.volume3);
                source4.connect(nodes.volume4);

                nodes.volume.connect(nodes.masterVolume);
                nodes.volume2.connect(nodes.masterVolume);
                nodes.volume3.connect(nodes.masterVolume);
                nodes.volume4.connect(nodes.masterVolume);

                nodes.masterVolume.connect(myAudioAnalyser);
                myAudioAnalyser.connect(myAudioContext.destination);
            },

            playSounds: function (e) {

                wavepad.routeSounds();
                
                source.noteOn(0);
                source2.noteOn(0);
                source3.noteOn(0);
                source4.noteOn(0);
            },

            stopSounds: function () {
                source.noteOff(0);
                source2.noteOff(0);
                source3.noteOff(0);
                source4.noteOff(0);
            },

            animateSpectrum: function () {
                mySpectrum = requestAnimationFrame(wavepad.animateSpectrum, document.querySelector('canvas'));
                wavepad.drawSpectrum();
            },

            drawSpectrum: function () {
                var canvas = document.querySelector('canvas');
                var ctx = canvas.getContext('2d');
                var canvasSize = isSmallViewport ? 256 : 512;
                var multiplier = isSmallViewport ? 1 : 2;
                var width = canvasSize;
                var height = canvasSize;
                var bar_width = isSmallViewport ? 10 : 20;

                canvas.width = canvasSize - 10;
                canvas.height = canvasSize - 10;
     
                ctx.clearRect(0, 0, width, height);
                ctx.fillStyle = '#1d1c25';
     
                var freqByteData = new Uint8Array(myAudioAnalyser.frequencyBinCount);
                myAudioAnalyser.getByteFrequencyData(freqByteData);
     
                var barCount = Math.round(width / bar_width);
                for (var i = 0; i < barCount; i++) {
                    var magnitude = freqByteData[i];
                    // some values need adjusting to fit on the canvas
                    ctx.fillRect(bar_width * i, height, bar_width - 1, -magnitude * multiplier);
                }
            }
        };
}());

window.addEventListener("DOMContentLoaded", wavepad.init, true);