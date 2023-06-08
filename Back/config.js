module.exports = {
    port: 5001,
    mongoKey: 'mongodb+srv://admin:admin@cluster0.fkgktie.mongodb.net/',
    corsOptions: {
        // origin: 'http://localhost:3000',
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        optionsSuccessStatus: 200
    }
}