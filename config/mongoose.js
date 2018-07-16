const mongoose = require('mongoose');
const messages = require('../assets/messages');
const chalk = require('chalk');

module.exports = function(config, env) {

    mongoose.connect(config[env].db.url)
        .then(() => {
            console.log('%s %s', chalk.green('✓'), messages.SYSTEM.mongoose.CONNECTION_SUCCESSFUL);
        })
        .catch((error) => {
            console.log('%s %s : %s', chalk.red('✗'), messages.SYSTEM.mongoose.CONNECTION_FAILED, error.message);
        });

    // mongoose.set("debug", (collectionName, method, query, doc) => {
    //     console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
    // });

};