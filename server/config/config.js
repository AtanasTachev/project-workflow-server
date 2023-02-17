module.exports = {
    development: {
        port: process.env.PORT || 3060,
        dbConnection: 'mongodb://localhost:27017/ProjectWorkflow'
        
    },
    build: {
        port: process.env.PORT || 3060,
        dbConnection: 'mongodb+srv://atanas:3698741Md@cluster0.lgbxa.mongodb.net/projectWorkflow?retryWrites=true&w=majority'
    }
}