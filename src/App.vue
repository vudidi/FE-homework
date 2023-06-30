<template>
  <div id="app" class="page">
    <Navigation />
    <main class="content">
      <Tasks v-bind:tasks="tasks" />
      <Users v-bind:users="users" />
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation/Navigation.vue';
import Tasks from '@/views/Tasks.vue';
import Users from '@/views/Users.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Tasks,
    Users,
  },
  methods: {},

  data() {
    return {
      tasks: [
        {
          id: '2c601a2757c0e1cca23f3057c0895479',
          title: 'Задача №1',
        },
        {
          id: '1da26764fab2fd93cafd2fa1fe21466c',
          title: 'Задача №2',
        },
        {
          id: '46fd49b97edb55718efcc126de04502a',
          title: 'Задача №3',
        },
        {
          id: '165cc06ef378007a42fefe70751e6c8c',
          title: 'Задача №4',
        },
        {
          id: '056294048f0de24681ee3dbb2b0020dc',
          title: 'Задача №5',
        },
      ],
      users: [
        {
          id: '1',
          name: 'Акунин Иван Иванович',
        },
        {
          id: '2',
          name: 'Котов Семен Васильевич',
        },
        {
          id: '3',
          name: 'Львов Петр Ибрагимович',
        },
        {
          id: '4',
          name: 'Сазонова Вера Владимировна',
        },
        {
          id: '5',
          name: 'Баранов Виктор Витальевич',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
