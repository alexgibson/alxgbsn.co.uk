/*
 * Copyright (c) 2013 Alex Gibson
 * Released under MIT license
 * http://alxgbsn.co.uk
 */

/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, console: false */
/*global webkitAudioContext: false, AudioContext: false, requestAnimationFrame: false */

var drumKit = (function () {

	'use strict';

	var myAudioContext,
		soundsPath = 'sounds/',
		kick = 'kick.mp3',
		snare = 'snare.mp3',
		closedHat = 'closed-hat.mp3',
		openHat = 'open-hat.mp3',
		cymbal = 'cymbal.mp3',
		highConga = 'high-conga.mp3',
		midConga = 'mid-conga.mp3',
		lowConga = 'low-conga.mp3',
		highTom = 'high-tom.mp3',
		midTom = 'mid-tom.mp3',
		lowTom = 'low-tom.mp3',
		kickBuffer,
		snareBuffer,
		closedHatBuffer,
		openHatBuffer,
		cymbalBuffer,
		highCongaBuffer,
		midCongaBuffer,
		lowCongaBuffer,
		highTomBuffer,
		midTomBuffer,
		lowTomBuffer;

	return {

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

			//load sounds files
			drumKit.loadSoundFile(soundsPath + kick, 'kick');
			drumKit.loadSoundFile(soundsPath + snare, 'snare');
			drumKit.loadSoundFile(soundsPath + closedHat, 'closed-hat');
			drumKit.loadSoundFile(soundsPath + openHat, 'open-hat');
			drumKit.loadSoundFile(soundsPath + cymbal, 'cymbal');
			drumKit.loadSoundFile(soundsPath + highConga, 'high-conga');
			drumKit.loadSoundFile(soundsPath + midConga, 'mid-conga');
			drumKit.loadSoundFile(soundsPath + lowConga, 'low-conga');
			drumKit.loadSoundFile(soundsPath + highTom, 'high-tom');
			drumKit.loadSoundFile(soundsPath + midTom, 'mid-tom');
			drumKit.loadSoundFile(soundsPath + lowTom, 'low-tom');

			//prevent default document scrolling
			doc.addEventListener('touchmove', function (e) {
				if (e.target.type === 'range') { return; }
				e.preventDefault();
			}, false);

			//enable CSS active pseudo styles
			doc.addEventListener("touchstart", function () {}, false);
		},

		/**
		 * Helper method to request a sound file and call initialise on load
		 * @param url (string), mixerChannel (number)
		 */
		loadSoundFile: function (url, name) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.responseType = 'arraybuffer';
			xhr.onload = function (e) {
				console.log('Sound file loaded: ', url);
				drumKit.initSound(this.response, name); // this.response is an ArrayBuffer.
			};
			xhr.send();
		},

		initSound: function (arrayBuffer, name) {
			myAudioContext.decodeAudioData(arrayBuffer, function (buffer) {
				switch (name.toLowerCase()) {
				case 'kick':
					kickBuffer = buffer;
					break;
				case 'snare':
					snareBuffer = buffer;
					break;
				case 'closed-hat':
					closedHatBuffer = buffer;
					break;
				case 'open-hat':
					openHatBuffer = buffer;
					break;
				case 'cymbal':
					cymbalBuffer = buffer;
					break;
				case 'high-conga':
					highCongaBuffer = buffer;
					break;
				case 'mid-conga':
					midCongaBuffer = buffer;
					break;
				case 'low-conga':
					lowCongaBuffer = buffer;
					break;
				case 'high-tom':
					highTomBuffer = buffer;
					break;
				case 'mid-tom':
					midTomBuffer = buffer;
					break;
				case 'low-tom':
					lowTomBuffer = buffer;
					break;
				}
				console.log('Sound file decoded: ', buffer);

				//if all four audioBuffers are ready, initialise the mixer interface
				if (kickBuffer && snareBuffer && closedHatBuffer && openHatBuffer && cymbalBuffer && highCongaBuffer && midCongaBuffer && lowCongaBuffer && highTomBuffer && midTomBuffer && lowTomBuffer) {
					drumKit.initUI();
				}
			}, function (e) {
				//something went wrong loading the sounds, log an error
				console.error('Error decoding file', e);
			});
		},

		initUI: function () {
			var doc = document,
				kick = doc.getElementById('kick'),
    			kickTap = new Tap(kick),
    			snare = doc.getElementById('snare'),
    			snareTap = new Tap(snare),
    			hat = doc.getElementById('hat'),
    			hatTap = new Tap(hat),
    			cymbal = doc.getElementById('cymbal'),
    			cymbalTap = new Tap(cymbal),
    			highConga = doc.getElementById('high-conga'),
    			highCongaTap = new Tap(highConga),
    			midConga = doc.getElementById('mid-conga'),
    			midCongaTap = new Tap(midConga),
    			lowConga = doc.getElementById('low-conga'),
    			lowCongaTap = new Tap(lowConga),
    			highTom = doc.getElementById('high-tom'),
    			highTomTap = new Tap(highTom),
    			midTom = doc.getElementById('mid-tom'),
    			midTomTap = new Tap(midTom),
    			lowTom = doc.getElementById('low-tom'),
    			lowTomTap = new Tap(lowTom);

			kick.addEventListener('tap', drumKit.playKick, false);
			snare.addEventListener('tap', drumKit.playSnare, false);
			hat.addEventListener('tap', drumKit.playHat, false);
			cymbal.addEventListener('tap', drumKit.playCymbal, false);
			highConga.addEventListener('tap', drumKit.playHighConga, false);
			midConga.addEventListener('tap', drumKit.playMidConga, false);
			lowConga.addEventListener('tap', drumKit.playLowConga, false);
			highTom.addEventListener('tap', drumKit.playHighTom, false);
			midTom.addEventListener('tap', drumKit.playMidTom, false);
			lowTom.addEventListener('tap', drumKit.playLowTom, false);
			
			console.log('Drum Machine -> UI Ready');
		},

		playKick: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = kickBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		},

		playSnare: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = snareBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		},

		playHat: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = closedHatBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		},

		playCymbal: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = cymbalBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		},

		playHighConga: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = highCongaBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		},

		playMidConga: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = midCongaBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		},

		playLowConga: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = lowCongaBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		},

		playHighTom: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = highTomBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		},

		playMidTom: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = midTomBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		},

		playLowTom: function () {
			var source = myAudioContext.createBufferSource();
			source.buffer = lowTomBuffer;
			source.connect(myAudioContext.destination);
			source.noteOn(0);
		}
	};
}());

window.addEventListener("DOMContentLoaded", drumKit.init, true);