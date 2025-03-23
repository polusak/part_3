import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}


const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => {
    return {error: false, message: response.data}
  }).catch(error => {
    const err = error.response.data.error
    return {error: true, message: err}
  })
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
  
    return response.data
  })
}

const modify = (id, newInfo) => {
  const url = `${baseUrl}/${id}`
  const request = axios.put(url, newInfo)
    return request.then(response => {
      return response.data
    })
}


export default { getAll, create, remove, modify}