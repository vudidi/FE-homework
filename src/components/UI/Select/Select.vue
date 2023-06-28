<template>
  <div class="select">
    <div class="select__wrapper">
      <svg-icon v-bind:class="['select__icon']" name="arrow"></svg-icon>
      <select class="select__native">
        <option value="sel">Выберите значение...</option>
        <option value="ds">UI/UX Designer</option>
        <option value="fe">Frontend Engineer</option>
        <option value="be">Backend Engineer</option>
        <option value="qa">QA Engineer</option>
        <option value="un">Unicorn</option>
      </select>

      <div class="select__custom" aria-hidden="true">
        <div class="select__custom-trigger">Выберите значение...</div>
        <div class="select__custom-options">
          <div class="select__custom-option" data-value="ds">
            UI/UX Designer
          </div>
          <div class="select__custom-option" data-value="fe">
            Frontend Engineer
          </div>
          <div class="select__custom-option" data-value="be">
            Backend Engineer
          </div>
          <div class="select__custom-option" data-value="qa">QA Engineer</div>
          <div class="select__custom-option" data-value="un">Unicorn</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customSelect from '@/helpers/customSelect';

export default {
  mounted() {
    const elSelectNative = document.getElementsByClassName('select__native')[0];
    const elSelectCustom = document.getElementsByClassName('select__custom')[0];
    const elSelectIcon = document.querySelector('.select__icon');
    const elTrigger = document.querySelector('.select__custom-trigger');
    const elSelectCustomBox = elSelectCustom.children[0];
    const elSelectCustomOpts = elSelectCustom.children[1];
    const customOptsList = Array.from(elSelectCustomOpts.children);
    const optionsCount = customOptsList.length;

    customSelect(
      elSelectNative,
      elSelectCustom,
      elSelectIcon,
      elTrigger,
      elSelectCustomBox,
      elSelectCustomOpts,
      customOptsList,
      optionsCount
    );
  },
};
</script>

<style lang="scss"></style>
