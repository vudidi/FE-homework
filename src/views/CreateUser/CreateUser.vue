<template>
  <div class="action-page">
    <h1 class="action-page__title">Создание профиля сотрудника</h1>
    <form
      autocomplete="off"
      v-on:submit.prevent="addNewUser"
      ref="addUserForm"
      id="add-user-form"
      class="form action-page__form"
      novalidate
    >
      <span
        :class="[
          'action-page__formError',
          { 'action-page__formError_visible': isFormError },
        ]"
        >Заполните форму корректными значениями</span
      >
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
              id="userName"
              inputErrorClass="userName-error"
              placeholder="Введите ФИО"
              type="text"
              :defaultInput="true"
              v-bind:class="['action-page__input', 'profile-input']"
              :maxlength="256"
              :minlength="3"
              required
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
              pattern="^[A-Za-z0-9 @_\-\.]+$"
              id="userLogin"
              inputErrorClass="userLogin-error"
              placeholder="Введите логин"
              type="text"
              :defaultInput="true"
              v-bind:class="['action-page__input', 'profile-input']"
              :maxlength="15"
              :minlength="3"
              required
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
              id="userPassword"
              inputErrorClass="userPassword-error"
              placeholder="Введите пароль"
              :type="passwordInputType"
              :defaultInput="true"
              v-bind:class="['action-page__input', 'profile-input']"
              :maxlength="15"
              :minlength="6"
              required
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
              :maxlength="2048"
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
        <Button
          v-bind:button="cancelBtn"
          v-bind:class="['button', 'secondary-button', 'action-page__button']"
          v-on:click-btn="goBack"
        />
        <SubmitButton
          type="submit"
          :id="createBtn.id"
          :title="createBtn.title"
          v-bind:class="[
            'button',
            'form__button',
            'primary-button',
            'action-page__button',
          ]"
        />
      </div>
    </form>
  </div>
</template>

<script>
import formatFileSize from '@/helpers/formatFileSize';
import validateFile from '@/helpers/validateFile';
import enableValidation from '@/helpers/validation';
import { validationSet } from '@/helpers/constants';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {},
  data() {
    return {
      isFormError: false,
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
      },
    };
  },
  computed: {
    ...mapGetters(['usersSort']),
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
  methods: {
    ...mapActions(['addUser', 'fetchUsers']),
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
    addNewUser() {
      const userStatus = this.model.isActive === true ? 'ACTIVE' : 'BLOCKED';
      console.log({
        picture: this.model.avatar,
      });

      const formValidity = this.$refs.addUserForm.checkValidity();

      if (
        this.model.fullname.trim().length < 3 ||
        this.model.login.trim().length < 3 ||
        this.model.password.trim().length < 6
      ) {
        this.isFormError = true;
      } else if (formValidity) {
        this.addUser({
          name: this.model.fullname,
          login: this.model.login,
          password: this.model.password,
          description: this.model.about.trim(),
          role: this.model.role,
          status: userStatus,
          formData: this.model.avatar,
          page: 1,
          limit: 10,
          sort: 'asc',
          filter: null,
        });

        this.$router.push({
          name: 'users',
          query: {
            page: 1,
            sort: 'asc',
          },
        });

        this.isFormError = false;
      } else {
        enableValidation(validationSet);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    enableValidation(validationSet);
  },
};
</script>

<style lang="scss"></style>
