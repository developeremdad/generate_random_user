const express = require("express");
require('dotenv').config()
const cors = require('cors');
const dbConnect = require("./utils/dbConnect");
const app = express()
const userRoute = require("./routes/users.route.js");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// database connection
// const client = dbConnect();
// const database = client.db("random_user");
// const collectionUsers = database.collection('users');



app.use("/user", userRoute);

app.get('/', (req, res) =>{
    res.status(200).send({
        success: true,
        messages: "Success",
        data: `Server is running on port: ${port}`
      });
})
app.all("*", (req, res) => {
    console.log('Unmatched route: ', req.url);
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