import { MongoClient } from 'mongodb';
import nextConnect, { Middleware } from 'next-connect';

const url = process.env.MONGO_URL || "mongodb://localhost";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database: Middleware = async (req, _, next) => {
    if (!client.isConnected()) await client.connect();
    //@ts-ignore
    req.dbClient = client;
    //@ts-ignore
    req.db = client.db('picross');
    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;