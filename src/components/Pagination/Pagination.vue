<template>
  <div class="pag">
    <Button
      v-on:click-btn="$emit('go-back')"
      v-bind:button="pagBackBtn"
      v-bind:class="[
        'button',
        'pag-button',
        { 'pag-button_disabled': !isBackBtnActive },
      ]"
    >
      <svg-icon
        v-bind:class="[
          'pag-button__icon',
          'pag-button__icon_type_back',
          { 'pag-button__icon_disabled': !isBackBtnActive },
        ]"
        name="pag-arrow"
      ></svg-icon>
    </Button>
    <div v-if="isFirstPageVisible">
      <PagItem
        v-bind:page="firstPage"
        v-on:click-btn="$emit('go-first', firstPage)"
      />
    </div>
    <div v-if="isLeftExtend">
      <Button
        v-bind:button="pagBackBtn"
        v-bind:class="['button', 'pag-button', 'pag-button_disabled']"
        >...
      </Button>
    </div>

    <PagItem
      v-for="page in pages"
      v-bind:page="page"
      v-bind:key="page.num"
      v-on:click-btn="$emit('go-page', page)"
    />
    <div v-if="isRightExtend">
      <Button
        v-bind:button="pagBackBtn"
        v-bind:class="['button', 'pag-button', 'pag-button_disabled']"
        >...
      </Button>
    </div>

    <div v-if="isLastPageVisible">
      <PagItem
        v-bind:page="lastPage"
        v-on:click-btn="$emit('go-last', lastPage)"
      />
    </div>

    <Button
      v-on:click-btn="$emit('go-forward')"
      v-bind:button="pagForwardBtn"
      v-bind:class="[
        'button',
        'pag-button',
        { 'pag-button_disabled': !isForwardBtnActive },
      ]"
    >
      <svg-icon
        v-bind:class="[
          'pag-button__icon',
          'pag-button__icon_type_forward',
          { 'pag-button__icon_disabled': !isForwardBtnActive },
        ]"
        name="pag-arrow"
      ></svg-icon>
    </Button>

    <label class="pag__label" for="pag-input"
      >Перейти к странице
      <input
        type="number"
        class="pag__input"
        id="pag-input"
        min="1"
        v-on:keydown.enter="$emit('on-enter')"
        v-on:input="onInput($event)"
        v-on:change="onInput($event)"
        v-bind:value="value"
      />
    </label>
  </div>
</template>

<script>
import PagItem from '@/components/PagItem/PagItem.vue';

export default {
  components: {
    PagItem,
  },
  props: {
    pages: {
      type: Array,
      default: [],
    },
    value: {
      type: [String, Number],
      default: '',
    },
    firstPage: {
      type: Object,
      default: {},
    },
    isFirstPageVisible: {
      type: Boolean,
      default: false,
    },
    lastPage: {
      type: Object,
      default: {},
    },
    isLastPageVisible: {
      type: Boolean,
      default: false,
    },
    isBackBtnActive: { type: Boolean, default: false },
    isForwardBtnActive: { type: Boolean, default: false },
    isLeftExtend: {
      type: Boolean,
      default: false,
    },
    isRightExtend: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pagBackBtn: {
        id: 'pagBack-btn',
      },
      pagForwardBtn: {
        id: 'pagForward-btn',
      },
    };
  },
  methods: {
    onInput($event) {
      this.$emit('input', $event.target.value);
    },
  },
};
</script>

<style lang="scss"></style>
