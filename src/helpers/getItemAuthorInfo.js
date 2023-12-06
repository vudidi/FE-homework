export function getItemAuthor(users, userID) {
  const user = users.find((user) => {
    return user._id === userID;
  });

  if (user) {
    const userName = [];

    user.name.split(' ').forEach((el, index) => {
      if (index === 0) {
        userName.push(el);
      } else {
        userName.push(el.charAt(0) + '.');
      }
    });

    return `${userName.join(' ')} создал(а)`;
  } else {
    return '';
  }
}

export function getItemAuthorEdited(users, userID) {
  const user = users.find((user) => {
    return user._id === userID;
  });

  if (user) {
    const userName = [];

    user.name.split(' ').forEach((el, index) => {
      if (index === 0) {
        userName.push(el);
      } else {
        userName.push(el.charAt(0) + '.');
      }
    });

    return `${userName.join(' ')} изменил(а)`;
  } else {
    return '';
  }
}

export function getItemAuthorAvatar(users, userID) {
  const user = users.find((user) => {
    return user._id === userID;
  });

  if (user) {
    return user.picture;
  } else {
    return null;
  }
}
