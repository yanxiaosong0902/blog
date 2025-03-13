import { createClient } from 'redis'

export const client = createClient({
  username: 'default',
  password: 'null',
  socket: {
    host: 'memcached-15597.crce178.ap-east-1-1.ec2.redns.redis-cloud.com',
    port: 15597
  }
})

client.on('error', err => console.log('Redis Client Error', err))
