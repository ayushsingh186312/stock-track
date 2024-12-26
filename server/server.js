//import { connectDB } from "./config/db.js"
//const express = require('express');
//const app = express();
//const MongoClient = require('mongodb').MongoClient;
//const createRouter = require('./helpers/create_router');
//const cors = require('cors');

//app.use(cors());
//app.use(express.json());
//connectDB();
//MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true})
//.then((client) => {
//    const db = client.db('portfolio');
//    const sharesCollection = db.collection('shares');
//    const sharesRouter = createRouter(sharesCollection);
//    app.use('/api/shares', sharesRouter);
//})
//.catch(console.error)
//api endpoints
//app.use('/api/shares', sharesRouter);


//app.get("/",(req,res)=>{
//    res.send("API Working")
//})
//app.listen(5000, function(){
//    console.log(`Listening on port ${ this.address().port }`);
//});
//import { connectDB } from "./db/db.js";
const express = require('express');
const app = express();
const createRouter = require('./helpers/create_router');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String (Replace `<username>`, `<password>`, and `<cluster-url>` with your Atlas details)
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ayushsingh186312:rMm5I3THjQgngvnr@cluster0.1bxn4.mongodb.net/";

// Connect to MongoDB Atlas
MongoClient.connect(uri, { useUnifiedTopology: true })
    .then((client) => {
        console.log("Connected to MongoDB Atlas");

        const db = client.db('portfoliotracer'); // Replace 'portfolio' with your database name
        const sharesCollection = db.collection('shares');
        const sharesRouter = createRouter(sharesCollection);

        // Use the router
        app.use('/', sharesRouter);
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB Atlas", err);
    });

// API Endpoints
app.get("/", (req, res) => {
    res.send({message:"API is working"});
});

// Start the server
app.listen(5000, function () {
    console.log(`Listening on port ${this.address().port}`);
});
