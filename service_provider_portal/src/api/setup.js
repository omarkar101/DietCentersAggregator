import API from './api';

export const Post = (endpoint, data, headers) => {
  const postHeaders = headers || {};
  postHeaders['x-access-token'] = JSON.parse(localStorage.getItem('token'))
  return API({
    method: 'post',
    url: endpoint,
    data: data,
    headers: postHeaders
  })
}

export const Get = (endpoint, data, headers) => {
  const getHeaders = headers || {};
  getHeaders['x-access-token'] = JSON.parse(localStorage.getItem('token'))
  return API({
    method: 'get',
    url: endpoint,
    data: data,
    headers: getHeaders
  })
}
