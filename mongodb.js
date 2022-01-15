//CRUD - Create Read Update Delete

// const mongodb = require('mongodb');

// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId;

const {MongoClient, ObjectId} = require('mongodb');

//127.0.0.1 ==> localhost IP address
const connectionURL = 'mongodb://127.0.0.1:27017';
//database name(can be anything)
const databaseName = 'task-manager';

// to create id by youself
// const id = new ObjectId()
// console.log(id);
// console.log(id.toHexString());
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database!');
    }

    // console.log('Connected successfully');
    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Akshay',
    //     age: 21
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user');
    //     }

    //     console.log(result.insertedId);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Yash',
    //         age: 20
    //     },
    //     {
    //         name: 'khandelwal',
    //         age: 21
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert docs.');
    //     }

    //     console.log(result.insertedIds);
    // })
        

    // db.collection('tasks').insertMany([
    //     {
    //         desc: 'MongoDB',
    //         completed: false
    //     },
    //     {
    //         desc: 'NodeJS',
    //         completed: false
    //     },
    //     {
    //         desc: 'React JS',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert tasks!!');
    //     }

    //     console.log(result.insertedCount);
    //     console.log(result.insertedIds);
    // })


    // db.collection('users').findOne({_id: new ObjectId("61d44d2eedc45399a703a2d2")}, (error,user) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }
    //     console.log(user);
    // })


    //find returns a cursor

    // db.collection('users').find({name: 'Yash'}).toArray((error, users) => {
    //     if(error){
    //         return console.log('Error');
    //     }
    //     //users is an array of matched objects
    //     (users.map((user) => {
    //         console.log(user._id);
    //     }));
    // })

    // db.collection('users').find({age: 20}).count((error, count) => {
    //     console.log(count);
    // })

    // db.collection('tasks').findOne({_id: new ObjectId("61d450367efed3980f3678d4")}, (error, task) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(task);
    // })

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     if(error){
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(tasks);
    // })

    // db.collection('users').updateOne({_id: new ObjectId("61d447cf4d91c1eff65bc2ac")}, {
    //     $inc: {
    //         age: -1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({completed: false}, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // })


    //***using PROMISES***
    // db.collection('users').deleteMany({age: 20}).then((result)=>console.log(result)).catch((error) => console.log(error))

    //***using CALLBACK***
    // db.collection('users').deleteOne({name: 'Akshay'}, (error, result) => {
    //     if(error)
    //         return console.log(error);
    //     console.log(result);
    // })

    db.collection('tasks').deleteOne({
        desc: 'React JS'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})