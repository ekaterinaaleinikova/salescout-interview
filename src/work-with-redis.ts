import { createClient } from 'redis';

async function manageRedis(): Promise<void> {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    await client.set('name', 'Alice');
    await client.set('age', '30');

    const name = await client.get('name');
    const age = await client.get('age');

    console.log(`Name: ${name}, Age: ${age}`);
    await client.quit();
}

module.exports = { manageRedis };
