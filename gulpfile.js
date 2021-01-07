'use strict';

const ghpages = require('gh-pages');
const dist = '_site';

function deploy(cb) {
    ghpages.publish(dist, function(err) {
        console.error(err); // eslint-disable-line no-console
    });

    cb();
}

module.exports = deploy;
