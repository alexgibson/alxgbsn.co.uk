---
layout: post
title: Building a PlayBook WebWorks app
titleinfo: Alex Gibson
desc: Using HTML5 API's and WebWorks SDK to build an application for the BlackBerry PlayBook
---

I was recently hired to develop the front–end HTML, CSS and JavaScript for a BlackBerry PlayBook application, packaged using RIM's [WebWorks SDK](http://blackberry.github.io/webworks/). The main purpose of the app was to assist the user in consuming a large volume of digital content (in the form of text, images and video) via a streamlined, touch friendly interface. Despite a reasonably small development window, the PlayBook browser and development tools proved to be very capable in getting the job done.

What follows is a run down of the key HTML5 features used in the application, and how well they performed on the device. Please note the code shown in this article is simplified in places for the sake of clarity, and is by no means complete.

Local database support
----------------------

While an Internet connection would be required to view on-line images and stream video via YouTube, one of the main technical requirements was that the app should still function and be navigable when off-line. Incremental data returned via a remote server should be permanently stored on the device and always accessible. The maximum payload of data this app required was around 15 to 20MB, so the natural development choice was to use an [HTML5 WebSQL Database](http://www.w3.org/TR/webdatabase/), since the Playbook browser does not yet support [IndexedDB](http://www.w3.org/TR/IndexedDB/), and the 5MB limit for [localStorage](http://dev.w3.org/html5/webstorage/) was too small for the size of data required.

Implementation was quite straight forward, with the application creating a simple WebSQL database on first launch, together with a single table called 'appdata' to act as a main store.

{% highlight javascript %}
var storage = {},
    myData = null,
    dbName = 'mydatabase',
    dbVersion = '1.0',
    dbDescription = 'app data store',
    dbSize = 20 * 1024 * 1024;

function handleDbError (e) {

    console.log(e.message);
    console.log(e.code);
}

function initDatabase () {

    try {
        var data = '';

        storage.db = openDatabase(dbName, dbVersion, dbDescription, dbSize);
        storage.db.transaction(function (tx) {

            tx.executeSql("CREATE TABLE IF NOT EXISTS appdata (id unique, text)");

        }, handleDbError);

        storage.db.transaction(function (tx) {

            tx.executeSql("INSERT OR IGNORE INTO appdata (id, text) VALUES(?,?)", [dbName, data]);

        }, handleDbError);

        } catch(e) {
            handleDbError(e);
    }
}

initDatabase();
{% endhighlight %}

The application then makes a remote server call, and the JSON string returned as a response is then parsed and used immediately. At the same time, the data is saved asynchronously to the local database (in a single table row entry).

{% highlight javascript %}
function getData () {

    var myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {

        if (myRequest.readyState === 4 && myRequest.status === 200) {
            myData = JSON.parse(myRequest.responseText);
            updateDatabase();
            startApp();
        }
    };

    myRequest.open('GET', 'http://', true);
    myRequest.send();
}

function updateDatabase () {

    try {
        var data = JSON.stringify(myData);

        storage.db = openDatabase(dbName, dbVersion, dbDescription, dbSize);
        storage.db.transaction(function (tx) {

            tx.executeSql("UPDATE appdata SET text=? WHERE id=?", [data, dbName]);

        }, handleDbError);

        } catch(e) {
            handleDbError(e);
    }
}
{% endhighlight %}

If the app is later launched while off-line, local data is then read back from the database and parsed back to an object, so the app only ever requires a single database read operation.

{% highlight javascript %}
function throwReadError (e) {

    console.log(e.message);
    console.log(e.code);

    if(!myData) {
        showAlert("This app requires an Internet connection for first launch");
    }
}

function readFromDatabase () {

    storage.db = openDatabase(dbName, dbVersion, dbDescription, dbSize);
    storage.db.transaction(function (tx) {

        tx.executeSql('SELECT * FROM appdata', [], function (tx, results) {

            myData = JSON.parse(results.rows.item(0).text);
            startApp();
        });

    }, throwReadError);
}
{% endhighlight %}

The PlayBook coped with this size of data store very well. We never hit any bugs or performance issues. Updating the client data on subsequent app launches was also pretty trivial due to the very basic data store model. The PlayBook does not appear to ask the user for storage permission at any size of data we tested, although 50MB is likely the limit if other browsers are anything to go by.

Off-line detection
------------------

For off-line detection the app initially used `navigator.Online`, which at first appears to be supported by the PlayBook Browser.

{% highlight javascript %}
var isOnline = window.navigator.onLine;

initDatabase();

if (isOnline) {
    getData();
} else {
    readFromDatabase();
}
{% endhighlight %}

However, once the first WebWorks build was made it became clear something was not right, since `navigator.Online` was always returning `true` on launch. This turns out to be an [existing bug](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/Bug-report-navigator-onLine-incorrect-status/m-p/1214513/highlight/true#M15043), but one that can be easily fixed using a WebWorks API call for off-line detection:

{% highlight javascript %}
var isOnline = 'blackberry' in window ? blackberry.system.hasDataCoverage() : window.navigator.onLine;
{% endhighlight %}

Notice here we use a simple feature detect using the `blackberry` window object, so we can carry on using `navigator.Online` in the browser (for development purposes).

CSS animation
-------------

While the PlayBook has very good support for CSS [2D](http://www.w3.org/TR/css3-2d-transforms/) and [3D](http://www.w3.org/TR/css3-3d-transforms/) Transforms and [animations](http://www.w3.org/TR/css3-animations/), it seems to struggle providing hardware acceleration. While RIM claims 3d transforms are hardware accelerated on the PlayBook, in real world development we found that only the simplest examples managed anywhere near the smooth performance you come to expect on the iPad.

When building an app with a sizable DOM, the PlayBook seems to struggle when it comes to animating content. For example, if you display an element that has a CSS animation associated with it, the PlayBook seems to choke if it needs to render the element and then immediately animate it. Searching on the WebWorks support forums, there are many other developers experiencing [similar issues](http://supportforums.blackberry.com/t5/Web-and-WebWorks-Development/State-of-hardware-accelleration-in-browser/m-p/1050143/highlight/true#M12534). More odd quirks also exist, like hardware acceleration failing if the element uses CSS gradients.

For this reason, performing full screen animations and transitions we're simply too much for the Playbook to pull off reliably. Only after lots of testing, `setTimeout` wrangling, tweaking and refining, we're we able to achieve some decent results.

Hopefully RIM can provide a future update that fixes current hardware acceleration issues, but as it stands this is currently the Playbook's only major weak point for WebWorks development.

Touch events
------------

The app featured multiple sections where scrollable, dynamic touch–based carousels were needed. For this task [iScroll4](http://cubiq.org/iscroll-4) came to the rescue, and proved to be very reliable on the PlayBook browser. Even zoom-able sections that needed multi–touch proved to be no problem for the device.

The only notable exception is that the PlayBook seems to support multi-touch in a slightly different way to how it works on iOS. For example, while you can perform a two–touch gesture on a single element on the PlayBook, you do not seem to be able to drag around two separate elements independently of each other. The Playbook appears to be limited in the number of simultaneous, independent touch–points it can support.

Native hooks
------------

API wise, the app used 95% browser–based API's. The remaining areas where WebWorks had to step in were for small things, like opening external links in the PlayBook browser and providing native alert boxes.

{% highlight javascript %}
function showAlert (message) {
    try {
        blackberry.ui.dialog.standardAskAsync(message, blackberry.ui.dialog.D_OK, {
            title : "Alert",
            size: blackberry.ui.dialog.SIZE_MEDIUM,
            position : blackberry.ui.dialog.CENTER
        });
    } catch (e) {
        alert(message);
        console.log(e);
    }
}

function launchBrowser (url) {
    var args = new blackberry.invoke.BrowserArguments(url);
    blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
}
{% endhighlight %}

Remote debugging
----------------

This is the area really where the Playbook shines in the eyes of a web developer, as you can quickly and very easily [remote debug](http://devblog.blackberry.com/2011/06/debugging-blackberry-web-apps/) on an actual device, over your local network. This saved many hours development time and bug fixing, especially when testing device related JavaScript events, such as orientation changes.

Hopefully one day we will have this kind of support on the other major mobile web browsers, and not need rely on third party solutions. RIM are really one step ahead of the competition here.

Conclusion
----------

For web developers, building native applications using the WebWorks SDK is overall a very good experience. There is still room for improvement in key areas such as hardware acceleration performance, but otherwise the Playbook browser is a close second to iOS Safari in terms of [browser features and support](http://www.sencha.com/blog/html5-scorecard-rim-blackberry-playbook-2/).

If only it was as easy for RIM to instill the same level of enthusiasm and confidence in tablet buying consumers!
