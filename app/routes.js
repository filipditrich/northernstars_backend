const authRoute = require('./auth');
const sysRoute = require('./sys');
const adminRoute = require('./admin');

module.exports = function (app) {

    app.use('/api/auth', authRoute(app));
    app.use('/api/sys', sysRoute(app));
    app.use('/api/admin', adminRoute(app));

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            response: {
                identifier: error.name || error.identifier,
                message: error.message,
                success: error.success || false,
                stack: error.stack || null
            }
        });
    });

};