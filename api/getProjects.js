export function getProjectsXML(url, token) {
  const xhr = new XMLHttpRequest();

  const data = {
    page: 1,
    limit: 10,
  };

  xhr.open('POST', `${url}/projects/search`);

  xhr.responseType = 'json';

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('authorization', `Bearer ${token}`);

  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log('error', xhr.response);
    } else {
      console.log('ProjectsXML', xhr.response);
    }
  };

  xhr.send(JSON.stringify(data));
}

export function getProjectsFetch(url, token) {
  return fetch(`${url}/projects/search`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page: 1,
      limit: 10,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('ProjectsFetch', res);
    })
    .catch((err) => console.log('error', err));
}

export function getProjectsAxios(url, token) {
  return axios
    .post(
      `${url}/projects/search`,
      {
        page: 1,
        limit: 10,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      console.log('ProjectsAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
