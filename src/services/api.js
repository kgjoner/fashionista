const baseUrl = 'https://5e9935925eabe7001681c856.mockapi.io/api/v1'

export const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/catalog`)
      .then(resp => {
        if(!resp.ok) throw {
          status: resp.status,
          message: resp.statusText
        }
        return resp.json()
      })
      .then(data => {
        let names = [];
        resolve(data.map(p => {
          if(names.includes(p.name)) {
            return {...p, name: p.name + ' II'}
          }
          names.push(p.name)
          return p
        }))
      })
      .catch(err => reject(err))
  })
}