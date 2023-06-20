import "@/index.html";
import "@/scss/index.scss";
import "@/utils/register.js";
import { getOverflowValue } from "./utils/showTooltip.js";
import createHeader from "@/components/nav.js";
import createNoContentBlock from "@/components/noContent.js";
import receiveProjectEl from "@/components/projectEl.js";
import receiveTaskEl from "./components/taskEl.js";
import avatar from "@/assets/images/avatar.png";
import projects from "@/data/projects.js";
import tasks from "@/data/tasks.js";

function initApp() {
  let app = document.querySelector(".page");
  let navHtml = createHeader(avatar);
  app.insertAdjacentHTML("afterbegin", navHtml);

  let main = document.querySelector(".content");
  let noContentHtml = createNoContentBlock("Не создан ни один проект");
  main.insertAdjacentHTML("beforeend", noContentHtml);
}

initApp();

projects.forEach((project) => {
  receiveProjectEl(project);
  getOverflowValue(".list-title");
  getOverflowValue(".list-projectCode");
  getOverflowValue(".list-create");
  getOverflowValue(".list-update");
});

tasks.forEach((task) => {
  receiveTaskEl(task);
  getOverflowValue(".list-title");
  getOverflowValue(".list-projectCode");
  getOverflowValue(".list-create");
  getOverflowValue(".list-update");
});

const buttons = document.querySelectorAll(".button");
const btnsId = [];

buttons.forEach((button) => {
  btnsId.push(button.id);
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("dropdown")) {
    btnsId.forEach((btnId) => {
      if (btnId) {
        if (e.target.id === btnId) {
          const dropDownNextSibling =
            e.target.nextElementSibling?.classList.contains("dropdown-menu");
          if (dropDownNextSibling) {
            e.target.nextElementSibling.classList.toggle(
              "dropdown-menu_visible"
            );
            e.target.classList.toggle(`${btnId}_active`);
          } else {
            e.target.classList.add(`${btnId}_active`);
            e.target.setAttribute("disabled", "true");
          }
        } else if (e.target.parentElement.id === btnId) {
          const dropDownParentSibling =
            e.target.parentElement.nextElementSibling?.classList.contains(
              "dropdown-menu"
            );
          if (dropDownParentSibling) {
            e.target.parentElement.nextElementSibling.classList.toggle(
              "dropdown-menu_visible"
            );
            e.target.parentElement.classList.toggle(`${btnId}_active`);
          } else {
            e.target.parentElement.classList.add(`${btnId}_active`);
            e.target.parentElement.setAttribute("disabled", "true");
          }
        } else {
          const el = document.getElementById(`${btnId}`);
          el.classList.remove(`${btnId}_active`);
          el.removeAttribute("disabled");
          const elSibling =
            el.nextElementSibling?.classList.contains("dropdown-menu");
          if (elSibling) {
            el.nextElementSibling.classList.remove("dropdown-menu_visible");
          }
        }
      }
    });
  }
});
