const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CORS = require('cors');
const passport = require('passport');
const chalk = require('chalk');
const routes = require('./app/routes');

const config = require('./config/common');

app.set('env', 'development');

require('./config/mongoose')(config, app.get('env'));

require('./config/passport')(passport, app.get('env'));
app.use(passport.initialize());
app.use(passport.session());

app.use(CORS());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => {
    console.log('%s Server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});

// app.use(function (error, req, res, next) {
//    res.status(error.status || 500);
//    // res.json(error.message);
//     console.log(error);
//     res.send(error.message);
// });

routes(app);
