module.exports = {

    development: {
        db: {
            url: 'mongodb://localhost:27017/nsapp'
        },
        token: {
            secret: 'development_secret',
            ttl: 900
        }
    },

    production: {
        db: {
            url: 'mongodb://localhost:27017/nsapp'
        }
    }

};