import API from './api';

export const Post = (endpoint, data, headers) => {
  const postHeaders = headers || {};
  postHeaders['x-access-token'] = JSON.parse(localStorage.getItem('token'))
  console.log(postHeaders);
  return API({
    method: 'post',
    url: endpoint,
    data: data,
    headers: postHeaders
  })
}

export const Get = (endpoint, data, headers) => {
  const getHeaders = headers || {
    
  };
  return API({
    method: 'get',
    url: endpoint,
    data: data,
    headers: getHeaders
  })
}
