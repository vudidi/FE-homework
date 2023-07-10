export function getPagPages(pagesCount, page) {
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    const obj = {
      num: '',
      isSelected: false,
    };

    obj.num = i;
    i === +page ? (obj.isSelected = true) : (obj.isSelected = false);

    pages.push(obj);
  }

  return pages;
}
