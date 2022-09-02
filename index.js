const express = require("express");
const dbConnect = require("./utils/dbConnect");
const app = express()

const port = process.env.PORT || 5000;
dbConnect();


app.all("*", (req,res) =>{
    res.send("No route founded. please try another route.")
});

app.listen(port, ()=>{
    console.log(`Random user app listen on port: ${port}`);
});

process.on("unhandledRejection", (error) =>{
    console.log(`unhandledRejection Error: Name: ${error.name} & Message: ${error.message}`);
    app.close(()=>{
        process.exit(1);
    });
});