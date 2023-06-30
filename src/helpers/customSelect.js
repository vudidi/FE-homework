export default function customSelect(select) {
  let optionChecked = '';
  let optionHoveredIndex = -1;

  const elSelectNative = select.getElementsByClassName('select__native')[0];
  const elSelectCustom = select.getElementsByClassName('select__custom')[0];
  const elSelectIcon = select.querySelector('.select__icon');
  const elTrigger = select.querySelector('.select__custom-trigger');
  const elSelectCustomInput = elSelectCustom.children[0];
  const elSelectCustomOpts = elSelectCustom.children[1];
  const customOptsList = Array.from(elSelectCustomOpts.children);
  const optionsCount = customOptsList.length;

  elSelectCustomInput.addEventListener('click', () => {
    const isClosed = !elSelectCustom.classList.contains('isActive');
    if (isClosed) {
      openSelectCustom();
    } else {
      closeSelectCustom();
    }
  });

  function openSelectCustom() {
    elSelectCustom.classList.add('isActive');
    elSelectCustom.setAttribute('aria-hidden', false);
    elSelectIcon.classList.add('select__icon_active');
    elTrigger.classList.add('isFocused');

    if (optionChecked) {
      const optionCheckedIndex = customOptsList.findIndex(
        (el) => el.getAttribute('data-value') === optionChecked
      );
      updateCustomSelectHovered(optionCheckedIndex);
    }
    document.addEventListener('click', watchClickOutside);
    document.addEventListener('keydown', supportKeyboardNavigation);
  }

  function closeSelectCustom() {
    elSelectCustom.classList.remove('isActive');
    elSelectCustom.setAttribute('aria-hidden', true);
    elSelectIcon.classList.remove('select__icon_active');
    updateCustomSelectHovered(-1);

    document.removeEventListener('click', watchClickOutside);
    document.removeEventListener('keydown', supportKeyboardNavigation);
  }

  function updateCustomSelectHovered(newIndex) {
    const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
    const option = elSelectCustomOpts.children[newIndex];

    if (prevOption) {
      prevOption.classList.remove('isHover');
    }
    if (option) {
      option.classList.add('isHover');
    }

    optionHoveredIndex = newIndex;
  }

  function updateCustomSelectChecked(value, text) {
    const prevValue = optionChecked;
    const elPrevOption = elSelectCustomOpts.querySelector(
      `[data-value="${prevValue}"`
    );
    const elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

    if (elPrevOption) {
      elPrevOption.classList.remove('isActive');
    }

    if (elOption) {
      elOption.classList.add('isActive');
    }

    elSelectCustomInput.value = text;
    optionChecked = value;
  }

  function watchClickOutside(event) {
    const didClickedOutside = !elSelectCustom.contains(event.target);
    if (didClickedOutside) {
      closeSelectCustom();
      elTrigger.classList.remove('isFocused');
    }
  }

  document.addEventListener('click', (event) => {
    const didClickedOutside = !elSelectCustom.contains(event.target);
    if (didClickedOutside) {
      elTrigger.classList.remove('isFocused');
    }
  });

  function supportKeyboardNavigation(event) {
    if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
      event.preventDefault();
      updateCustomSelectHovered(optionHoveredIndex + 1);
    }

    if (event.keyCode === 38 && optionHoveredIndex > 0) {
      event.preventDefault();
      updateCustomSelectHovered(optionHoveredIndex - 1);
    }

    if (event.keyCode === 13 || event.keyCode === 32) {
      event.preventDefault();

      const option = elSelectCustomOpts.children[optionHoveredIndex];
      const value = option && option.getAttribute('data-value');

      if (value) {
        // elSelectNative.value = value;
        updateCustomSelectChecked(value, option.value);
      }
      closeSelectCustom();
    }

    if (event.keyCode === 27) {
      closeSelectCustom();
    }
  }

  // elSelectNative.addEventListener('change', (e) => {
  //   const value = e.target.value;
  //   const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(
  //     `[data-value="${value}"]`
  //   )[0];

  //   updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
  // });

  customOptsList.forEach(function (elOption, index) {
    elOption.addEventListener('click', (e) => {
      const value = e.target.getAttribute('data-value');

      // elSelectNative.value = value;
      updateCustomSelectChecked(value, e.target.value);
      closeSelectCustom();
    });

    elOption.addEventListener('mouseenter', () => {
      updateCustomSelectHovered(index);
    });
  });
}
