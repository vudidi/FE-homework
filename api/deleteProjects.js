export function deleteProjectXML(url, token, id) {
  const xhr = new XMLHttpRequest();

  xhr.open('DELETE', `${url}/projects/${id}`);

  xhr.responseType = 'json';

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('authorization', `Bearer ${token}`);

  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log('error', xhr.response);
    } else {
      localStorage.removeItem('ProjectXML');
      console.log(xhr.response.message);
    }
  };

  xhr.send();
}

export function deleteProjectFetch(url, token, id) {
  return fetch(`${url}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      localStorage.removeItem('ProjectFetch');
      console.log(res.message);
    })
    .catch((err) => console.log('error', err));
}

export function deleteProjectAxios(url, token, id) {
  return axios
    .delete(`${url}/projects/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      localStorage.removeItem('ProjectAxios');
      console.log(res.data.message);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
