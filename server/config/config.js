module.exports = {
    development: {
        port: process.env.PORT || 3060,
        dbConnection: 'mongodb://localhost:27017/ProjectWorkflow'
        
    },
    build: {
        port: process.env.PORT || 3060,
        dbConnection: 'mongodb+srv://atanas:357951Mongo@cluster0.lgbxa.mongodb.net/projectWorkflow'
    }
}