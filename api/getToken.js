export default function getToken(url) {
  return fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: 'dovgal.v',
      password: 'jc63fk',
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      localStorage.setItem('token', res.token);
    })
    .catch((err) => console.log('error', err));
}
