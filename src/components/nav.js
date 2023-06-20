export default function createHeader(avatar) {
  return `<header class="header">
<nav class="header__nav">
  <ul class="header__nav-items">
    <li class="header__nav-item">
      <button id="projects" class="button nav-button">Проекты</button>
    </li>
    <li class="header__nav-item">
      <button id="tasks" class="button nav-button">Задачи</button>
    </li>
    <li class="header__nav-item">
      <button id="users" class="button nav-button">Пользователи</button>
    </li>
    <li class="header__nav-item">
      <button id="account" class="button user-button">
        <img
          class="user-button__avatar"
          src=${avatar}
          alt="Аватар пользователя"
        />
        <svg class="user-button__icon">
          <use xlink:href="#arrow-down" />
        </svg>
      </button>
      <ul class="dropdown dropdown-menu">
        <li class="dropdown dropdown-menu__item">
          <a class="dropdown dropdown-menu__link" href="#">Профиль</a>
        </li>
        <li class="dropdown dropdown-menu__item">
          <a class="dropdown dropdown-menu__link" href="#">Выход</a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
</header>`;
}
