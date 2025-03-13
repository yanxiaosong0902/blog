import { connect } from '@/lib/mongo'
// import { client as redis } from '@/lib/redis'
import { NextRequest, NextResponse } from 'next/server'

let data = 'hello world1'

let count = 0
const timer = setInterval(() => {
  if (count === 10) {
    data = 'hahah'
    console.log('data changed')
    clearInterval(timer)
  }
  console.log('count:', count)
  count ++
}, 1000)


export async function GET(req: NextRequest) {
  console.log(req.headers.get('x-forwarded-for'))
  // await redis.connect()
  // await redis.set('foo', 'bar')
  // const result = await redis.get('foo')
  // console.log(result)  // >>> bar
  return NextResponse.json({
    data: data,
    code: 200
  })
  const client = connect()
  try {
    if (!client) {
      return NextResponse.json({
        error: 'Error connecting to MongoDB',
      })
    }
    const db = client.db('sample_mflix')
    const collection = db.collection('movies')
    const movies = await collection.findOne()
    return NextResponse.json({
      code: 200,
      data: movies,
    })
  } catch {
    return NextResponse.json({
      error: 'database error',
      code: 500
    })
  } finally {
    client.close()
  }
}
