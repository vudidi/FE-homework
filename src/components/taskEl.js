function createTaskEl(data) {
  const { title, projectCode, create, update, avatar } = data;

  const template = document.querySelector("#tmpl-task");
  const item = template.content.cloneNode(true);

  item.querySelector(".list-title").textContent = title;
  item.querySelector(".tooltip__title").firstElementChild.textContent = title;
  item.querySelector(".list-projectCode").textContent = projectCode;
  item.querySelector(".tooltip__projectCode").firstElementChild.textContent =
    projectCode;
  item.querySelector(".list-create").textContent = create;
  item.querySelector(".tooltip__create").firstElementChild.textContent = create;
  item.querySelector(".list-update").textContent = update;
  item.querySelector(".tooltip__update").firstElementChild.textContent = update;
  item.querySelector(".list-userAvatar").src = avatar;

  const menuBtn = item.querySelector("#list-task-btn");
  const dropDownMenu = item.querySelector(".dropdown-menu");
  menuBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle("dropdown-menu_visible");
    menuBtn.classList.toggle("list-task-btn_active");
  });

  document.addEventListener("click", (e) => {
    const isDropdownSibling =
      e.target.parentElement.classList.contains("dropdownBtn");
    const isDropdown = e.target.classList.contains("dropdown");

    if (e.target !== menuBtn && !isDropdown && !isDropdownSibling) {
      dropDownMenu.classList.remove("dropdown-menu_visible");
      menuBtn.classList.remove("list-task-btn_active");
    }
  });

  return item;
}

const list = document.querySelector("#task-list");

export default function receiveTaskEl(item) {
  const newTask = createTaskEl(item);
  list.prepend(newTask);
}
