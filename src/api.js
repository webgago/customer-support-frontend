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
        .catch(() => reject({ errors: { base: 'Something went wrong' }, response }));
    })
    .catch(() => reject({ errors: { base: 'Something went wrong' }}));
  })
}

function get(url, body, headers={}) {
  return request(url, 'GET', body, headers)
}

function post(url, body, headers={}) {
  return request(url, 'POST', body, headers)
}

export function login(body) {
  return post('/login', body).then((json) => {
    return { token: json.jwt, user: jwtDecode(json.jwt) }
  })
}
