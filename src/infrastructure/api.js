/* 
  Old api was hosted by a third part and it is no longer available.
  Hence, for the sake of simplicity, the data is now gotten from a json file,
  what does not affect this project intent.
  
  old code:
  const baseUrl = 'https://5e9935925eabe7001681c856.mockapi.io/api/v1'
*/

import data from '../data.json'

export const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    // fetch(`${baseUrl}/catalog`)
    //   .then(resp => {
    //     if(!resp.ok) throw new Error ({
    //       status: resp.status,
    //       message: resp.statusText
    //     })
    //     return resp.json()
    //   })
      // .then(data => {
    let names = [];
    resolve(data
      .filter(p => p.name)
      .map(p => {
        if(names.includes(p.name)) {
          return {...p, name: p.name + ' II'}
        }
        names.push(p.name)
        return p
      })
    )
      // })
      // .catch(err => reject(err))
  })
}