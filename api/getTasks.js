export function getTasksXML(url, token) {
  const xhr = new XMLHttpRequest();

  const data = {
    page: 1,
    limit: 10,
  };

  xhr.open('POST', `${url}/tasks/search`);

  xhr.responseType = 'json';

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('authorization', `Bearer ${token}`);

  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log('error', xhr.response);
    } else {
      console.log('TasksXML', xhr.response);
    }
  };

  xhr.send(JSON.stringify(data));
}

export function getTasksFetch(url, token) {
  return fetch(`${url}/tasks/search`, {
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
      console.log('TasksFetch', res);
    })
    .catch((err) => console.log('error', err));
}

export function getTasksAxios(url, token) {
  return axios
    .post(
      `${url}/tasks/search`,
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
      console.log('TasksAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
