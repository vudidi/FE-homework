<template>
  <div class="action-page">
    <h1 class="action-page__title">Создание профиля сотрудника</h1>
    <form ref="createUserForm" class="action-page__form">
      <fieldset class="action-page__fieldset">
        <div class="action-page__container">
          <div class="action-page__line">
            <label class="action-page__label profile-label">
              ФИО
              <svg-icon
                v-bind:class="['action-page__icon']"
                name="require"
              ></svg-icon>
            </label>

            <Input
              placeholder="Введите ФИО"
              type="text"
              :defaultInput="true"
              v-bind:class="['action-page__input', 'profile-input']"
              :maxlength="256"
              :minlength="3"
              v-model="model.fullname"
            />
          </div>

          <div class="action-page__line">
            <label class="action-page__label profile-label">
              Логин
              <svg-icon
                v-bind:class="['action-page__icon']"
                name="require"
              ></svg-icon>
            </label>

            <Input
              placeholder="Введите логин"
              type="text"
              :defaultInput="true"
              v-bind:class="['action-page__input', 'profile-input']"
              :maxlength="256"
              :minlength="3"
              v-model="model.login"
            />
          </div>

          <div class="action-page__line">
            <label class="action-page__label profile-label">
              Пароль
              <svg-icon
                v-bind:class="['action-page__icon']"
                name="require"
              ></svg-icon>
            </label>

            <Input
              placeholder="Введите пароль"
              :type="passwordInputType"
              :defaultInput="true"
              v-bind:class="['action-page__input', 'profile-input']"
              :maxlength="256"
              :minlength="3"
              v-model="model.password"
              ><svg-icon
                v-on:click-svg="changePasswordVisability"
                v-if="isPasswordHidden"
                v-bind:class="['action-page__input-icon']"
                name="eye-close"
              ></svg-icon>
              <svg-icon
                v-on:click-svg="changePasswordVisability"
                v-else-if="!isPasswordHidden"
                v-bind:class="['action-page__input-icon']"
                name="eye-open"
              ></svg-icon
            ></Input>
          </div>

          <div class="action-page__line">
            <label class="action-page__label profile-label">О себе</label>
            <textarea
              class="action-page__textarea profile-input"
              v-model="model.about"
            ></textarea>
          </div>

          <div class="action-page__line">
            <label class="action-page__label profile-label">Фото</label>
            <Uploader
              v-on:upload-file="uploadFile"
              v-on:dragover="dragoverFile"
              v-on:dragleave="dragleaveFile"
              v-on:drop="dropFile"
              v-on:delete-photo="deletePhoto"
              :isDragover="isDragover"
              :isLoaded="isLoaded"
              :isInvalidFile="isInvalidFile"
              :errorText="errorText"
              :file="uploadedFile"
            />
          </div>
        </div>

        <div class="action-page__container">
          <div class="action-page__sidebar">
            <div class="profile-line">
              <label v-if="model.isActive" class="action-page__label"
                >Активен</label
              >
              <label v-else-if="!model.isActive" class="action-page__label"
                >Не активен</label
              >

              <Toggler v-model="model.isActive" />
            </div>

            <div class="profile-line">
              <label class="action-page__label">Пользователь</label>
              <RadioButton
                value="USER"
                checked="checked"
                v-on:checked="checkRadioBtn"
              />
            </div>
            <div class="profile-line">
              <label class="action-page__label">Администратор</label>
              <RadioButton value="ADMIN" v-on:checked="checkRadioBtn" />
            </div>
          </div>
        </div>
      </fieldset>

      <div class="action-page__buttons">
        <Link
          v-bind:link="cancelBtn"
          v-bind:class="['button', 'secondary-button', 'action-page__button']"
        />
        <Button
          v-bind:button="createBtn"
          v-bind:class="['button', 'primary-button', 'action-page__button']"
          v-on:click-btn="getFormData"
        />
      </div>
    </form>
  </div>
</template>

<script>
import login from '@/api/login';
import { uploadAvatar } from '@/api/admin/user';
import formatFileSize from '@/helpers/formatFileSize';
import validateFile from '@/helpers/validateFile';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGFmMGQ1MDNjOGZmNGE0MDYwNzE3NyIsInJvbGVzIjpbIkFETUlOIl0sImlhdCI6MTY4ODQ3ODI2NSwiZXhwIjoxNjg4NTY0NjY1fQ.1kVX7309goWN40zYu6gZzHrrs78t-dEyHTD07MXvyl4';
const ID = '648af1a17287972ce8676ee6';

export default {
  components: {},
  data() {
    return {
      isPasswordHidden: true,
      isDragover: false,
      model: {
        role: 'USER',
        isActive: false,
        fullname: '',
        login: '',
        password: '',
        about: '',
        avatar: null,
      },
      createBtn: {
        id: 'create-user',
        title: 'Создать профиль',
      },
      cancelBtn: {
        id: 'cancel-user',
        title: 'Отмена',
        to: '/users',
      },
    };
  },
  methods: {
    changePasswordVisability() {
      this.isPasswordHidden = !this.isPasswordHidden;
    },
    checkRadioBtn(value) {
      this.model.role = value;
    },
    deletePhoto() {
      this.model.avatar = null;
    },
    uploadFile(event) {
      this.model.avatar = event.target.files[0];
    },
    dragoverFile() {
      this.isDragover = true;
    },
    dropFile(event) {
      this.model.avatar = event.dataTransfer.files[0];
    },
    dragleaveFile() {
      this.isDragover = false;
    },
    getFormData() {
      console.log({
        role: this.model.role,
        isActive: this.model.isActive,
        fullname: this.model.fullname,
        login: this.model.login,
        password: this.model.password,
        about: this.model.about,
      });
      // uploadAvatar(TOKEN, ID, this.model.avatar);

      this.$refs.createUserForm.reset();
    },
  },
  computed: {
    passwordInputType() {
      if (this.isPasswordHidden) {
        return 'password';
      } else {
        return 'text';
      }
    },
    isLoaded() {
      return this.model.avatar;
    },
    errorText() {
      if (this.model.avatar) {
        return validateFile(this.model.avatar.size, this.model.avatar.type);
      }
    },
    isInvalidFile() {
      if (this.model.avatar) {
        return !!validateFile(this.model.avatar.size, this.model.avatar.type);
      }
    },
    uploadedFile() {
      const file = {
        name: '',
        type: '',
        size: '',
      };
      if (this.model.avatar) {
        file.name = `${this.model.avatar.name}`;
        file.type = `${this.model.avatar.type}`;
        file.size = `${formatFileSize(this.model.avatar.size)}`;
      }
      return file;
    },
  },
  mounted() {},
};
</script>

<style lang="scss"></style>
