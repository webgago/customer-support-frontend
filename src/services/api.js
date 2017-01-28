import fetch from 'isomorphic-fetch'
import jwtDecode from 'jwt-decode'

const API_URL = "http://localhost:3001";

function defaultHeaders(headers) {
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
    ...headers
  };
  const userToken = localStorage.getItem('userToken');
  if (userToken) {
    headers.Authorization = `Bearer ${userToken}`
  }
  return headers
}

function request(url, method, body, headers={}) {
  let options = { method, body: JSON.stringify(body), headers: defaultHeaders(headers) };

  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${url}`, options).then((response) => {
      response.json()
        .then((json) => {
          if (response.ok) {
            resolve(json);
          } else {
            reject({ ...json, response });
          }
        })
        .catch(() => {
          if(response.status == 201 || response.status == 204) {
            resolve()
          }
          if(response.status == 401){
            reject({unauthorized: true})
          }
          reject({ errors: { base: ['Wrong json'] }, response })
        });
    })
    .catch(() => reject({ errors: { base: ['Something went wrong'] }}));
  })
}

function get(url, body, headers={}) {
  return request(url, 'GET', body, headers)
}

function post(url, body, headers={}) {
  return request(url, 'POST', body, headers)
}

function put(url, body, headers={}) {
  return request(url, 'PUT', body, headers)
}

export function login(body) {
  return post('/login', body).then((json) => {
    return { token: json.jwt, user: jwtDecode(json.jwt) }
  })
}

export function signup({firstName, lastName, email, password}) {
  let params = {first_name: firstName, last_name: lastName, email, password}

  return post('/signup', params).then(() => params)
}

export function tickets() {
  return get('/tickets')
}

export function ticket(id) {
  return get(`/tickets/${id}`)
}

export function replyToTicket(id, params) {
  return post(`/tickets/${id}/reply`, params)
}

export function reopenTicket(id) {
  return put(`/tickets/${id}/reopen`)
}

export function closeTicket(id) {
  return put(`/tickets/${id}/close`)
}

export function searchTickets(params) {
  return post('/tickets/search', params)
}

export function loadReport(params) {
  return get('/report', params)
}
