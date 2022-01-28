const {MongoClient} = require('mongodb')

const client = new MongoClient('mongodb+srv://anmrez:admin@cluster0.ffvge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')


const start = async () => {
  try {
    await client.connect()
    console.log('connecting mongo...');
    await client.db().collection('users')
    const users = client.db().collection('users')
    await users.insertOne({ name: 'anmrez' })
    const user = await users.findOne({ name: 'anmrez' })
    console.log(user);
  } catch (e) {
    console.log(e);
  }
}
console.log(start.user);
