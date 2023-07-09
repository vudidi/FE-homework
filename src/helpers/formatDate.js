const monthsTitle = {
  0: 'янв',
  1: 'фев',
  2: 'мар',
  3: 'апр',
  4: 'мая',
  5: 'июня',
  6: 'июля',
  7: 'авг',
  8: 'сен',
  9: 'окт',
  10: 'нояб',
  11: 'дек',
};

function formatedMinutes(num) {
  if (num === 1 || (num > 20 && num.toString().charAt(1) === '1')) {
    return 'минуту';
  } else if (
    num === 2 ||
    num === 3 ||
    num === 4 ||
    (num > 20 && num.toString().charAt(1) === '2') ||
    (num > 20 && num.toString().charAt(1) === '3') ||
    (num > 20 && num.toString().charAt(1) === '4')
  ) {
    return 'минуты';
  } else {
    return 'минут';
  }
}

const formatHours = (hours) => {
  if (hours.toString().length < 2) {
    return '0' + hours;
  } else {
    return hours;
  }
};

const formatMinutes = (minutes) => {
  if (minutes.toString().length < 2) {
    return '0' + minutes;
  } else {
    return minutes;
  }
};

export function getDateAndTime(date) {
  const datePost = new Date(Date.parse(date));

  const year = new Date().getFullYear();
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const hours = formatHours(new Date().getHours());
  const minutes = formatMinutes(new Date().getMinutes());

  const yearPost = datePost.getFullYear();
  const monthPost = datePost.getMonth();
  const dayPost = datePost.getDate();
  const hoursPost = formatHours(datePost.getHours());
  const minutesPost = formatMinutes(datePost.getMinutes());

  if (
    year === yearPost &&
    day === dayPost &&
    month === monthPost &&
    hours === hoursPost
  ) {
    const createdMinutes = minutes - minutesPost;
    if (createdMinutes === 0) {
      return `только что`;
    } else {
      return `${createdMinutes} ${formatedMinutes(createdMinutes)} назад`;
    }
  } else if (year === yearPost && day === dayPost && month === monthPost) {
    return `сегодня в ${hoursPost}:${minutesPost}`;
  } else if (year === yearPost && day === dayPost + 1 && month === monthPost) {
    return `вчера в ${hoursPost}:${minutesPost}`;
  } else {
    return `${dayPost} ${monthsTitle[monthPost]} ${yearPost} в ${hoursPost}:${minutesPost}`;
  }
}

export function getFullDateAndTime(date) {
  const datePost = new Date(Date.parse(date));

  const yearPost = datePost.getFullYear();
  const monthPost = datePost.getMonth();
  const dayPost = datePost.getDate();
  const hoursPost = formatHours(datePost.getHours());
  const minutesPost = formatMinutes(datePost.getMinutes());

  return `${dayPost} ${monthsTitle[monthPost]} ${yearPost} в ${hoursPost}:${minutesPost}`;
}
