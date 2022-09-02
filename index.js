const express = require("express");
const dbConnect = require("./utils/dbConnect");
const app = express()

const port = process.env.PORT || 5000;
// dbConnect();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eogpx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    const database = client.db("random_user");
    const collectionUsers = database.collection('users');
    console.log("Database connected");
    // perform actions on the collection object
    client.close();
});


app.all("*", (req, res) => {
    res.send("No route founded. please try another route.")
});

app.listen(port, () => {
    console.log(`Random user app listen on port: ${port}`);
});

process.on("unhandledRejection", (error) => {
    console.log(`unhandledRejection Error: Name: ${error.name} & Message: ${error.message}`);
    app.close(() => {
        process.exit(1);
    });
});