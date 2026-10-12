const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// build the connection string and set the connection timeout
const connect = () => {
    setTimeout(() => {
        mongoose.connect(dbURI).catch(err => {
            console.log('Mongoose connection error: ', err);
        });
    }, 1000);
};

// monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// windows specific listener
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

// configure for graceful shutdown
const gracefulShutdown = async (msg) => {
    await mongoose.connection.close();
    console.log(`Mongoose disconnected through ${msg}`);
};

// event listeners to process graceful shutdowns

// shutdown invoked by nodemon signal
process.once('SIGUSR2', async () => {
    await gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

// shutdown invoked by app termination
process.on('SIGINT', async () => {
    await gracefulShutdown('app termination');
    process.exit(0);
});

// shutdown invoked by container termination
process.on('SIGTERM', async () => {
    await gracefulShutdown('app shutdown');
    process.exit(0);
});

// make initial connection to database
connect();

// import mongoose schema
require('./travlr');

module.exports = mongoose;