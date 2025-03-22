import axios from 'axios'
const baseUrl = 'https://puhelinluettelon-backend-yxlg.onrender.com/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => {
    return response.data
  })
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
    return response.data
  })
}

const modify = (id, newInfo) => {
  const url = `http://localhost:3001/persons/${id}`
  const request = axios.put(url, newInfo)
    return request.then(response => {
      return response.data
    })
}


export default { getAll, create, remove, modify}