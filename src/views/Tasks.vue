<template>
  <ul class="list">
    <TaskItem v-for="task in tasks" :key="task.id" v-bind:task="task" />
  </ul>
</template>

<script>
import TaskItem from '@/components/TaskItem.vue';

export default {
  components: {
    TaskItem,
  },
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
    };
  },
};
</script>

<style lang="scss"></style>
