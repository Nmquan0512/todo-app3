<template>
  <div class="task-list" v-memo="[tasks.length]">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @edit-task="onEditTask"
      @delete-task="onDeleteTask"
    />
  </div>
</template>

<script>
import TaskItem from "./TaskItem.vue";
import { deleteTask } from "../api/api";

export default {
  components: { TaskItem },
  props: {
    tasks: Array,
  },
  emits: ["task-updated", "task-deleted"],
  methods: {
    onEditTask(task) {
      this.$emit("edit-task", task);
    },
    async onDeleteTask(id) {
      try {
        await deleteTask(id);
        this.$emit("task-deleted", id);
      } catch (err) {
        alert("Error deleting task: " + err.message);
      }
    },
  },
};
</script>

<style scoped>
.task-list {
  margin-top: 16px;
  background: #f6f8fa;
  border-radius: 12px;
  padding: 8px 0 4px 0;
  box-shadow: 0 2px 8px 0 rgba(60, 72, 100, 0.06);
}
</style>
