<template>
  <div class="search-panel">
    <Input
      placeholder="Поиск..."
      type="search"
      :defaultInput="true"
      v-bind:class="['search-panel__input']"
    >
      <svg-icon
        v-bind:class="['field__icon']"
        name="search"
        :defaultInput="true"
      ></svg-icon
    ></Input>
    <Button
      v-if="filterBtn.isVisible"
      v-bind:button="filterBtn"
      v-bind:class="['button', 'filter-button', 'search-panel__filtertBtn']"
    >
      <svg-icon v-bind:class="['search-panel__icon']" name="filter"></svg-icon>
    </Button>
    <Select
      v-bind:items="items"
      :selectID="selectID"
      v-on:click-select="onSelectClick"
      :defaultValue="defaultValue"
      :activeOption="activeOption"
      iconClass="search-panel__select-icon"
      inputClass="search-panel__select"
    >
      <Button
        v-on:click-btn="$emit('toggle-sort')"
        v-bind:button="sortBtn"
        v-bind:class="['button', 'sort-button', 'search-panel__sortBtn']"
      >
        <svg-icon
          v-bind:class="[
            'search-panel__icon',
            { 'search-panel__icon_asc': isAscSort },
          ]"
          name="sort-arrow"
        ></svg-icon> </Button
    ></Select>
    <Link
      v-on:click-link="$emit('click-link')"
      v-bind:link="addBtn"
      v-bind:class="['button', 'secondary-button', 'search-panel__addBtn']"
      :to="addBtn.to"
    />
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
    defaultValue: { type: String },
    selectID: { type: String },
    sortBtn: { type: Object },
    addBtn: { type: Object },
    filterBtn: { type: Object },
    isAscSort: { type: Boolean, default: false },
    activeOption: { type: String },
  },
  methods: {
    onSelectClick(event) {
      this.$emit('click-select', event);
    },
  },
};
</script>
