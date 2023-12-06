<template>
  <form
    v-if="!isLoaded"
    :class="['form-upload', { 'form-upload_dragover': isDragover }]"
    id="uploadForm"
    method="post"
    enctype="multipart/form-data"
  >
    <label class="form-upload__label" for="uploadForm_File">
      <input
        class="form-upload__input"
        id="uploadForm_File"
        type="file"
        name="file_name"
        accept="image/*"
        v-on:change="$emit('upload-file', $event)"
      />
      <p class="form-upload__label-text">
        Перетащите файл в область или нажмите для загрузки
      </p>
    </label>

    <div
      v-on:dragover.prevent="$emit('dragover', $event)"
      v-on:dragleave="$emit('dragleave', $event)"
      v-on:drop.prevent="$emit('drop', $event)"
      id="dropFile_Zone"
      class="form-upload__zone"
    >
      Расширение: bmp, gif, jpg, jpeg, png<br />
      Максимально допустимый размер: 10 Мб<br />
      Максимальное количество файлов: 1
    </div>
  </form>
  <div
    v-else
    :class="['uploaded-photo', { 'uploaded-photo_error': isInvalidFile }]"
  >
    <span class="uploaded-photo__errorText"> {{ errorText }} </span>
    <div class="uploaded-photo__text">
      <p class="uploaded-photo__title">{{ file.name }}</p>
      <p class="uploaded-photo__info">{{ file.type }}, {{ file.size }} Мб</p>
    </div>
    <Button
      v-bind:button="deletePhotoBtn"
      v-on:click-btn="$emit('delete-photo')"
      v-bind:class="['button', 'filter-button', 'uploaded-photo__button']"
    >
      <svg-icon
        v-bind:class="['uploaded-photo__icon']"
        name="delete"
      ></svg-icon>
    </Button>
  </div>
</template>

<script>
export default {
  props: {
    isInvalidFile: { type: Boolean, default: false },
    isDragover: {
      type: Boolean,
      default: false,
    },
    isLoaded: {
      type: [File, Boolean],
      default: false,
    },
    file: { type: Object },
    errorText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      deletePhotoBtn: {
        id: 'delete-photo',
      },
    };
  },
};
</script>

<style lang="scss"></style>
