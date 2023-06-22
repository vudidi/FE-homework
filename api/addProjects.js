export function addProjectXML(url, token) {
  const xhr = new XMLHttpRequest();

  const data = {
    name: 'ProjectXML',
    code: 'code#876456346',
  };

  xhr.open('POST', `${url}/projects`);

  xhr.responseType = 'json';

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('authorization', `Bearer ${token}`);

  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log('error', xhr.response);
    } else {
      localStorage.setItem('ProjectXML', xhr.response._id);
      console.log('ProjectXML', xhr.response);
    }
  };

  xhr.send(JSON.stringify(data));
}

export function addProjectFetch(url, token) {
  return fetch(`${url}/projects`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'ProjectFetch',
      code: 'code#354127635',
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      localStorage.setItem('ProjectFetch', res._id);
      console.log('ProjectFetch', res);
    })
    .catch((err) => console.log('error', err));
}

export function addProjectAxios(url, token) {
  return axios
    .post(
      `${url}/projects`,
      {
        name: 'ProjectAxios',
        code: 'code#74563432',
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      localStorage.setItem('ProjectAxios', res.data._id);
      console.log('ProjectAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
