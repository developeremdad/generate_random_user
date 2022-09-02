const express = require("express");
const dbConnect = require("./utils/dbConnect");
const app = express()
const userRoute = require("./routes/users.route.js");

const port = process.env.PORT || 5000;

// database connection
const database = dbConnect();
const collectionUsers = database.collection('users');



app.use("/users", userRoute);

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