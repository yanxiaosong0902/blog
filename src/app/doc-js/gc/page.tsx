import serverFetch from '@/utils/serverFetch'

export default async  function GarbageCollector() {
  const data = await serverFetch<any>('/api/page-view', {
    next: {
      revalidate: 3600
    }
  })
  console.log(data)
  return (
    <div>
      <p>gc:{data.data}</p>
      <p>gc:{data.data}</p>
      <p>gc:{data.data}</p>
      <p>gc:{data.data}</p>
      <p>gc:{data.data}</p>
      <p>gc:{data.data}</p>
      <p>gc:{data.data}</p>
      <p>gc:{data.data}</p>
    </div>
  )
}
