import 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'

const API_URL = 'http://localhost:3000'

function defaultHeaders (headers) {
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    ...headers
  }
  const userToken = localStorage.getItem('userToken')
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`
  }
  return headers
}

function convertErrors ({ errors }) {
  if (errors) {
    const reducer = (result, entry) => {
      let key = entry[0]
      let values = entry[1]
      if (key === 'base') key = '_error'
      return Object.assign(result, { [key]: values[0] })
    }
    return Object.entries(errors).reduce(reducer, {})
  }
}

function request (url, method, body, headers = {}) {
  let options = { method, body: JSON.stringify(body), headers: defaultHeaders(headers) }

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${url}`, options).then((response) => {
      response.json()
        .then((json) => {
          if (response.ok) {
            resolve(json)
          } else {
            let errors = convertErrors(json)
            reject({ errors, response })
          }
        })
        .catch(() => {
          if (response.status === 201 || response.status === 204) {
            resolve()
          }
          if (response.status === 401) {
            reject({ errors: { base: ['Unauthorized'] }, unauthorized: true })
          }
          reject({ errors: { base: ['Wrong json'] }, response })
        })
    })
    .catch((e) => {
      reject({ errors: { base: ['Something went wrong'] } })
      throw e
    })
  })
}

function get (url, body, headers = {}) {
  return request(url, 'GET', body, headers)
}

function post (url, body, headers = {}) {
  return request(url, 'POST', body, headers)
}

function put (url, body, headers = {}) {
  return request(url, 'PUT', body, headers)
}

function destroy (url, body, headers = {}) {
  return request(url, 'DELETE', body, headers)
}

export function login (body) {
  return post('/login', body).then((json) => {
    return { token: json.jwt, user: jwtDecode(json.jwt) }
  })
}

export function signup ({ firstName, lastName, email, password }) {
  let params = { first_name: firstName, last_name: lastName, email, password }

  return post('/signup', params).then(() => params)
}

export function ticket (id) {
  return get(`/tickets/${id}`)
}

export function deleteTicket (id) {
  return destroy(`/tickets/${id}`)
}

export function replyToTicket (id, params = {}) {
  return post(`/tickets/${id}/reply`, params)
}

export function reopenTicket (id) {
  return put(`/tickets/${id}/reopen`)
}

export function closeTicket (id) {
  return put(`/tickets/${id}/close`)
}

export function createTicket (params) {
  return post('/tickets', params)
}

export function searchTickets (params = {}) {
  return post('/tickets/search', params)
}

export function loadReport () {
  return get('/report')
}

export function searchUsers (params = {}) {
  return post('/users/search', params)
}

export function deleteUser (id) {
  return destroy(`/users/${id}`)
}
