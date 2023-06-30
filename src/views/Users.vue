<template>
  <ul class="list">
    <UserItem v-for="user in users" :key="user.id" v-bind:user="user" />
  </ul>
</template>

<script>
import UserItem from '@/components/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>
