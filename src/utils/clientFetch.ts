export default function clientFetch<T>(url: string, options?: RequestInit): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch(url, options).then(async (res) => {
      try {
        const response = await res.json()
        resolve(response)

      } catch (error) {
        reject(error)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}
