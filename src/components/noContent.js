export default function createNoContentBlock(title) {
  return `  <section class="noContent">
  <p class="noContent__text">${title}</p>
  <button class="button page-button">Добавить</button>
</section>`;
}
