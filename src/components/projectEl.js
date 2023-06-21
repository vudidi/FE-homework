function createProjectEl(data) {
  const { title, projectCode, create, update } = data;

  const template = document.querySelector("#tmpl-project");
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

  const menuBtn = item.querySelector("#list-project-btn");
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
      menuBtn.classList.remove("list-project-btn_active");
    }
  });

  return item;
}

const list = document.querySelector("#project-list");

export default function receiveProjectEl(item) {
  const newProject = createProjectEl(item);
  list.prepend(newProject);
}
