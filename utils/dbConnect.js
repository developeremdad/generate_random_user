function dbConnect() {
    const { MongoClient } = require('mongodb');
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eogpx.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

    // console.log(uri);

    client.connect(err => {
        console.log("Database connected");
        // perform actions on the collection object
        // client.close();
      });
      return client;
}

module.exports = dbConnect;