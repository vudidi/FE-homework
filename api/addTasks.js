export function addTaskXML(url, token) {
  const xhr = new XMLHttpRequest();

  const data = {
    name: 'taskXML',
    description: 'description',
    projectId: '6491be72da30960a23d88b96',
  };

  xhr.open('POST', `${url}/tasks`);

  xhr.responseType = 'json';

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('authorization', `Bearer ${token}`);

  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log('error', xhr.response);
    } else {
      localStorage.setItem('TaskXML', xhr.response._id);
      console.log('TaskXML', xhr.response);
    }
  };

  xhr.send(JSON.stringify(data));
}

export function addTaskFetch(url, token) {
  return fetch(`${url}/tasks`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'taskFetch',
      description: 'description',
      projectId: '6491be72da30960a23d88b96',
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      localStorage.setItem('TaskFetch', res._id);
      console.log('TaskFetch', res);
    })
    .catch((err) => console.log('error', err));
}

export function addTaskAxios(url, token) {
  return axios
    .post(
      `${url}/tasks`,
      {
        name: 'taskAxios',
        description: 'description',
        projectId: '6491be72da30960a23d88b96',
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      localStorage.setItem('TaskAxios', res.data._id);
      console.log('TaskAxios', res.data);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
