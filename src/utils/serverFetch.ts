export default function serverFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const API_PREFIX = process.env.API_URL
  return new Promise((resolve, reject) => {
    fetch(`${API_PREFIX}${url}`, options).then(async (res) => {
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
