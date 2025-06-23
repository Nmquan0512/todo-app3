<template>
  <div>
    <h1 v-once>Welcome to Todo App</h1>
    <button @click="goToTasks">Go to Tasks</button>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  emits: ["navigate"],
  setup(_, { emit }) {
    const goToTasks = () => {
      emit("navigate", "TasksView");
    };
    return { goToTasks };
  },
};
</script>
