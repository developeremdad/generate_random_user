function dbConnect() {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eogpx.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    const database = client.db("random_user");
    client.connect(err => {
        console.log("Database connected");
        // perform actions on the collection object
        // client.close();
      });
      return database;
}

module.exports = dbConnect;