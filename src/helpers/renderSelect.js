import customSelect from '@/helpers/customSelect';

export default function renderSelect() {
  const select = document.querySelectorAll('.select');
  select.forEach((el) => {
    customSelect(el);
  });
}
