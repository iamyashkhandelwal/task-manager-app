const mongoose = require('mongoose');

//connection URL = same as mongoDB/<databaseName>

//***Connecting to the database***
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    autoIndex: true
})

//#*#*#* Mongoose converts the first letter of collection name to lowercase and also makes it plural...eg User->users & Task->tasks






