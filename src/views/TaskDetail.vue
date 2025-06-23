<template>
  <div v-if="task">
    <h2>{{ task.title }}</h2>
    <p>Status: {{ task.completed ? "Completed" : "Incomplete" }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getTask } from "../api/api";

export default {
  props: {
    id: Number,
  },
  setup(props) {
    const task = ref(null);

    onMounted(async () => {
      try {
        task.value = await getTask(props.id);
      } catch {
        task.value = null;
      }
    });

    return { task };
  },
};
</script>
