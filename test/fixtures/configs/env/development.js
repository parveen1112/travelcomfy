module.exports = {
    mongoDB: {
        host: 'localhost',
        port: 27017,
        database: 'appSys'
    },
    port: process.env.PORT || 8001,
    host: process.env.HOST || '127.0.0.1'
};
