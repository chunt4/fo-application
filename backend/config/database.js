const mongoose = require('mongoose');

const databaseUrl = 'mongodb://localhost:27017/fo-app';
const dbAtlas = 'mongodb+srv://root:KzdDjjtJsuJGaXnw@cluster0.kakul.mongodb.net/fo-db'

mongoose.connect(dbAtlas, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

db.once('connected', () => {
    console.log('Backend: Connected to MongoDB ' + db.name + ' at ' + db.host + ': ' + db.port);
})