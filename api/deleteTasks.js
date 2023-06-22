export function deleteTaskXML(url, token, id) {
  const xhr = new XMLHttpRequest();

  xhr.open('DELETE', `${url}/tasks/${id}`);

  xhr.responseType = 'json';

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('authorization', `Bearer ${token}`);

  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.log('error', xhr.response);
    } else {
      localStorage.removeItem('TaskXML');
      console.log(xhr.response.message);
    }
  };

  xhr.send();
}

export function deleteTaskFetch(url, token, id) {
  return fetch(`${url}/tasks/${id}`, {
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
      localStorage.removeItem('TaskFetch');
      console.log(res.message);
    })
    .catch((err) => console.log('error', err));
}

export function deleteTaskAxios(url, token, id) {
  return axios
    .delete(`${url}/tasks/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      localStorage.removeItem('TaskAxios');
      console.log(res.data.message);
    })
    .catch((err) => {
      console.log('error', err);
    });
}
