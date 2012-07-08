---
layout: post
title: Using HTML5 localStorage as a fallback for offline form submission
---

I recently put together a working demo for a client showing how you might use HTML5 localStorage as a fallback for form data submission when a mobile device is offline without signal. I've published the full [source code over on GitHub](https://github.com/alexgibson/OfflineForm) together with a demo for anyone who is interested.

The demo uses <code>window.navigator.onLine</code> to listen for a boolean value of <code>true</code> or <code>false</code>, determining whether the device is online or offline. When online, the app makes a regular XmlHttpRequest and sends data to a server. If the device loses signal and goes offline, the app queues up and saves submitted data to localStorage as a JSON string. When online connection is next restored, the app then re-sends the queued data to the server automatically. Once the data has been sent successfully, the item is then removed from localStorage.

I won't go through all the code line by line as it's reasonably straight forward, but feel free to take a closer look on [GitHub](https://github.com/alexgibson/OfflineForm). Many Webkit based smart phones now support <code>window.navigator.onLine</code>, as does desktop Safari or Firefox. To test, try enabling flight mode on your phone, or disable wifi on your laptop once the app is open.