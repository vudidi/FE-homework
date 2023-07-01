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
  data() {
    return {
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
