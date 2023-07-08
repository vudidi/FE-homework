<template>
  <section class="profile">
    <Modal
      v-on:click-accept-btn="updateAvatar"
      v-on:click-cancel-btn="closeImageModal"
      v-bind:isOpen="isImageModalOpen"
      modalTitle="Редактирование фото"
      type="modal__container_type_create"
      cancelBtnTitle="Отмена"
      acceptBtnTitle="Сохранить изменения"
    >
      <Uploader
        v-bind:class="['profile__uploader']"
        v-on:upload-file="uploadFile"
        v-on:dragover="dragoverFile"
        v-on:dragleave="dragleaveFile"
        v-on:drop="dropFile"
        v-on:delete-photo="deletePhotoInModal"
        :isDragover="isDragover"
        :isLoaded="isPreviewImage"
        :isInvalidFile="isInvalidFile"
        :errorText="errorText"
        :file="currentImage"
      />

      <img
        v-if="isPreviewImage"
        ref="userImage"
        class="profile__image"
        :src="previewImage"
        alt="Фото пользователя"
      />
    </Modal>

    <div
      class="list-menu list-menu_visible profile__menu"
      v-click-outside="clickOutsideDropdown"
      v-if="currentUserRole"
    >
      <Button
        v-bind:button="dropdownBtn"
        v-bind:class="[
          'button',
          'icon-button',
          'list-button',
          { 'icon-button_active': isDropdownOpen },
        ]"
        v-on:click-btn="toggleDropdown"
      >
        <svg-icon
          v-bind:class="['icon-button__icon']"
          name="menu-dots"
        ></svg-icon>
      </Button>
      <ul class="dropdown-menu" v-if="isDropdownOpen">
        <li class="dropdown-menu__item">
          <Link
            v-bind:link="profileUpdateBtn"
            v-bind:class="['dropdown-menu__link']"
            to="#"
          ></Link>
        </li>

        <li class="dropdown-menu__item">
          <Button
            v-bind:button="updPasswordBtn"
            v-bind:class="['dropdown-menu__link']"
            >Изменить пароль</Button
          >
        </li>
        <li class="dropdown-menu__item">
          <Link
            v-bind:link="getUserTasksBtn"
            v-bind:class="['dropdown-menu__link']"
            to="#"
          ></Link>
        </li>

        <li class="dropdown-menu__item">
          <Button
            v-bind:button="profileDeleteBtn"
            v-bind:class="[
              'dropdown-menu__link',
              'dropdown-menu__link_type_delete',
            ]"
            >Удалить</Button
          >
        </li>
      </ul>
    </div>
    <div class="profile__imgContainer">
      <div v-if="!isFileLoaded" class="profile__defaultImg">
        <div class="profile__defaultImg-initials">
          {{ defaultImageInitials }}
        </div>
      </div>

      <img
        v-else
        ref="userImage"
        class="profile__image"
        :src="updatedUserProfile.picture"
        alt="Фото пользователя"
      />

      <div
        class="list-menu list-menu_visible profile__image-menu"
        v-click-outside="clickOutsideImageDropdown"
        v-if="currentUserRole"
      >
        <Button
          v-bind:button="imageDropdownBtn"
          v-bind:class="[
            'button',
            'icon-button',
            'list-button',
            { 'icon-button_active': isImageDropdownOpen },
          ]"
          v-on:click-btn="toggleImageDropdown"
        >
          <svg-icon
            v-bind:class="['icon-button__icon']"
            name="menu-dots"
          ></svg-icon>
        </Button>
        <ul class="dropdown-menu" v-if="isImageDropdownOpen">
          <li class="dropdown-menu__item">
            <Button
              v-on:click-btn="openImageModal"
              v-bind:button="imageUpdateBtn"
              v-bind:class="['dropdown-menu__link']"
              >Редактировать</Button
            >
          </li>
          <li class="dropdown-menu__item">
            <Button
              v-on:click-btn="deletePhotoInDropdown"
              v-bind:button="imageDeleteBtn"
              v-bind:class="[
                'dropdown-menu__link',
                'dropdown-menu__link_type_delete',
              ]"
              >Удалить</Button
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="profile__textContainer">
      <div class="profile__titleContainer">
        <h1 class="profile__title">{{ updatedUserProfile.name }}</h1>
        <div v-bind:class="['list-status', userStatusClass]">
          {{ userStatus }}
        </div>
      </div>
      <h2 class="profile__subtitle">О себе&#58;</h2>
      <p class="profile__about">
        {{
          updatedUserProfile.descripton ||
          'Пользователь пока ничего не рассказал о себе'
        }}
      </p>
    </div>
  </section>
</template>

<script>
import Modal from '@/components/UI/Modal/Modal.vue';
import { mapGetters, mapActions } from 'vuex';
import getUserInitials from '@/helpers/getUserInitials';
import formatFileSize from '@/helpers/formatFileSize';
import validateFile from '@/helpers/validateFile';

export default {
  components: {
    Modal,
  },
  data() {
    return {
      isPreviewImage: false,
      previewImage: '',
      isDragover: false,
      isImageModalOpen: false,
      isDropdownOpen: false,
      isLoadingNewImage: false,
      previewImage: '',
      currentImage: {
        name: '',
        type: '',
        size: '',
      },
      model: {
        avatar: null,
      },
      dropdownBtn: {
        id: 'profile-menu-btn',
        isActive: false,
      },
      isImageDropdownOpen: false,
      imageDropdownBtn: {
        id: 'img-menu-btn',
        isActive: false,
      },
      profileUpdateBtn: {
        id: 'update-profile-btn',
        title: 'Редактировать',
      },
      updPasswordBtn: {
        id: 'update-password-btn',
      },
      getUserTasksBtn: {
        id: 'get-tasks-btn',
        title: 'Просмотр задач пользователя',
      },
      profileDeleteBtn: {
        id: 'delete-profile-btn',
      },
      imageUpdateBtn: {
        id: 'update-image-btn',
      },
      imageDeleteBtn: {
        id: 'delete-image-btn',
      },
    };
  },
  computed: {
    ...mapGetters(['updatedUserProfile', 'currentUser']),
    currentUserRole() {
      if (
        this.currentUser.role === 'ADMIN' ||
        this.updatedUserProfile.id === this.currentUser.id
      ) {
        return true;
      } else {
        return false;
      }
    },
    userStatus() {
      return this.updatedUserProfile.status === 'ACTIVE'
        ? 'Активен'
        : 'Не активен';
    },
    defaultImageInitials() {
      return getUserInitials(this.updatedUserProfile.name);
    },
    userStatusClass() {
      return this.updatedUserProfile.status === 'ACTIVE'
        ? 'list-status_type_main'
        : 'list-status_type_off';
    },
    isFileLoaded() {
      if (this.updatedUserProfile.picture !== null) {
        return true;
      } else {
        return false;
      }
    },
    /////
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
  },
  watch: {
    $route(to, from) {
      this.fetchUserProfile(this.$route.params.id);
    },
  },
  methods: {
    ...mapActions([
      'fetchUserProfile',
      'updateUserAvatar',
      'updateCurrentUserAvatar',
    ]),
    updateAvatar() {
      if (this.model.avatar) {
        this.updateUserAvatar({
          id: this.updatedUserProfile.id,
          formData: this.model.avatar,
        });
        this.updateCurrentUserAvatar({
          id: this.updatedUserProfile.id,
          formData: this.model.avatar,
        });
      } else {
        this.updateUserAvatar({
          id: this.updatedUserProfile.id,
          formData: 'null',
        });
        this.updateCurrentUserAvatar({
          id: this.updatedUserProfile.id,
          formData: 'null',
        });
      }
      this.isImageModalOpen = false;
    },
    async openImageModal() {
      this.isImageModalOpen = true;
      this.isImageDropdownOpen = false;

      if (this.updatedUserProfile.picture !== null) {
        const URL_TO_IMG = this.$refs.userImage.currentSrc;
        const fileImg = await fetch(URL_TO_IMG).then((r) => r.blob());

        this.isPreviewImage = true;
        this.previewImage = URL_TO_IMG;
        this.currentImage.name = 'FileName';
        this.currentImage.type = fileImg.type;
        this.currentImage.size = formatFileSize(fileImg.size);
      }
    },
    closeImageModal() {
      this.isImageModalOpen = false;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    clickOutsideDropdown() {
      this.isDropdownOpen = false;
    },
    toggleImageDropdown() {
      this.isImageDropdownOpen = !this.isImageDropdownOpen;
    },
    clickOutsideImageDropdown() {
      this.isImageDropdownOpen = false;
    },
    //////
    deletePhotoInDropdown() {
      this.updateUserAvatar({
        id: this.updatedUserProfile.id,
        formData: 'null',
      });
      this.updateCurrentUserAvatar({
        id: this.updatedUserProfile.id,
        formData: 'null',
      });
      this.isImageDropdownOpen = false;
      this.model.avatar = null;
      this.isPreviewImage = false;
    },
    deletePhotoInModal() {
      this.model.avatar = null;
      this.isPreviewImage = false;
    },
    uploadFile(event) {
      this.model.avatar = event.target.files[0];

      this.currentImage.name = `${event.target.files[0].name}`;
      this.currentImage.type = `${event.target.files[0].type}`;
      this.currentImage.size = `${formatFileSize(event.target.files[0].size)}`;

      this.isPreviewImage = true;
      this.previewImage = URL.createObjectURL(event.target.files[0]);
    },
    dragoverFile() {
      this.isDragover = true;
    },
    dropFile(event) {
      this.model.avatar = event.dataTransfer.files[0];

      this.currentImage.name = `${event.dataTransfer.files[0].name}`;
      this.currentImage.type = `${event.dataTransfer.files[0].type}`;
      this.currentImage.size = `${formatFileSize(
        event.dataTransfer.files[0].size
      )}`;

      this.isPreviewImage = true;
      this.previewImage = URL.createObjectURL(event.dataTransfer.files[0]);
    },
    dragleaveFile() {
      this.isDragover = false;
    },
  },
  mounted() {
    this.fetchUserProfile(this.$route.params.id);
  },
};
</script>

<style lang="scss"></style>
