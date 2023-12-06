export default function resetForm() {
  const inputs = document.querySelectorAll('.field__input');
  const inputsError = document.querySelectorAll('.field__error');

  inputs.forEach((input) => {
    input.classList.remove('field__input_default-error');
  });

  inputsError.forEach((inputError) => {
    inputError.classList.remove('field__error_visible');
  });
}
