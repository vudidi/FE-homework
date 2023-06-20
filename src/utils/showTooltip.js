export function getOverflowValue(elClass) {
  const textElments = document.querySelectorAll(elClass);

  textElments.forEach((el) => {
    if (el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight) {
      el.addEventListener("mouseover", () => {
        el.style.cursor = "pointer";
        el.nextElementSibling.classList.add("tooltip_visible");
      });
      el.addEventListener("mouseout", () => {
        el.nextElementSibling.classList.remove("tooltip_visible");
      });
    }
  });
}
