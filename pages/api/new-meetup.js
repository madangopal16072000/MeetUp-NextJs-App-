import { MongoClient } from 'mongodb'

const handler = async (req, res) => {

    if(req.method === 'POST')
    {
        const data = req.body;

        const {title, image, address, description} = data;

        const client = await MongoClient.connect(process.env.DB_URL);
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({message : 'meetup inserted successfully!'});

    }
}

export default handler;