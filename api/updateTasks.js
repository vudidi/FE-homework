export function updateTaskXML(url, token, id) {
  const xhr = new XMLHttpRequest();

  const data = {
    name: 'updatedTaskXML',
    executor: '648af1a17287972ce8676ee6',
    description: 'updated description',
    projectId: '6491be49da30960a23d88b81',
    _id: id,
  };

  xhr.open('PUT', `${url}/tasks`);

  xhr.responseType = 'json';

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('authorization', `Bearer ${token}`);

  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log('error', xhr.response);
    } else {
      console.log('updatedTaskXML', xhr.response);
    }
  };

  xhr.send(JSON.stringify(data));
}

export function updateTaskFetch(url, token, id) {
  return fetch(`${url}/tasks`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'updatedTaskFetch',
      executor: '648af1a17287972ce8676ee6',
      description: 'updated description',
      projectId: '6491be49da30960a23d88b81',
      _id: id,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('updatedTaskFetch', res);
    })
    .catch((err) => console.log('error', err));
}

export function updateTaskAxios(url, token, id) {
  return axios
    .put(
      `${url}/tasks`,
      {
        name: 'updatedTaskAxios',
        executor: '648af1a17287972ce8676ee6',
        description: 'updated description',
        projectId: '6491be49da30960a23d88b81',
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
      console.log('updatedTaskAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
