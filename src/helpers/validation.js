function showInputError(
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  formError.classList.add(errorClass);
  formError.textContent = errorMessage;
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  formError.classList.remove(errorClass);
  formError.textContent = '';
}

function isValid(formElement, inputElement, rest) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  }
}

export default function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  ...rest
}) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    const buttonSubmit = form.querySelector(submitButtonSelector);

    const inputList = form.querySelectorAll(inputSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        hideInputError(form, inputElement, rest);
        buttonSubmit.removeAttribute('disabled');
      });
    });

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const inputList = form.querySelectorAll(inputSelector);

      inputList.forEach((inputElement) => {
        isValid(form, inputElement, rest);
      });
    });
  });
}
