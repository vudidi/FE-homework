export default function getUserInitials(fullname) {
  const userName = fullname.split(' ');
  let initials = '';

  if (userName.length > 1) {
    initials = userName[0].charAt(0) + userName[1].charAt(0);
  } else {
    initials = userName[0].charAt(0);
  }

  return initials;
}
