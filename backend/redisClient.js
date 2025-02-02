const redis = require('redis');

const client = redis.createClient({
    url: 'redis://localhost:6379' // or your Docker container IP
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.connect().catch(console.error);

module.exports = client;