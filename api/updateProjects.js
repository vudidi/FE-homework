export function updateProjectXML(url, token, id) {
  const xhr = new XMLHttpRequest();

  const data = {
    name: 'updatedProjectXML',
    code: 'code#876456346',
    _id: id,
  };

  xhr.open('PUT', `${url}/projects`);

  xhr.responseType = 'json';

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('authorization', `Bearer ${token}`);

  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log('error', xhr.response);
    } else {
      console.log('updatedProjectXML', xhr.response);
    }
  };

  xhr.send(JSON.stringify(data));
}

export function updateProjectFetch(url, token, id) {
  return fetch(`${url}/projects`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'updatedProjectFetch',
      code: 'code#354127635',
      _id: id,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('updatedProjectFetch', res);
    })
    .catch((err) => console.log('error', err));
}

export function updateProjectAxios(url, token, id) {
  return axios
    .put(
      `${url}/projects`,
      {
        name: 'updatedProjectAxios',
        code: 'code#74563432',
        _id: id,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      console.log('updatedProjectAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
