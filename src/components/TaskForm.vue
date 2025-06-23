<template>
  <form @submit.prevent="onSubmit" class="task-form">
    <input
      v-model="title"
      placeholder="Task title"
      required
      class="task-input"
    />
    <label class="checkbox-label">
      <input type="checkbox" v-model="completed" />
      Completed
    </label>
    <button type="submit" class="submit-btn">
      {{ isEditing ? "Update Task" : "Add Task" }}
    </button>
  </form>
</template>

<script>
/* eslint-disable */
import { ref, watch } from "vue";
import { createTask, updateTask } from "../api/api";

export default {
  props: {
    taskToEdit: Object,
  },
  emits: ["task-added", "task-updated"],
  setup(props, { emit }) {
    const title = ref("");
    const completed = ref(false);
    const isEditing = ref(false);
    const taskId = ref(null);

    watch(
      () => props.taskToEdit,
      (newVal) => {
        if (newVal) {
          title.value = newVal.title;
          completed.value = newVal.completed;
          isEditing.value = true;
          taskId.value = newVal.id;
        } else {
          resetForm();
        }
      }
    );

    const resetForm = () => {
      title.value = "";
      completed.value = false;
      isEditing.value = false;
      taskId.value = null;
    };

    const onSubmit = async () => {
      const taskData = {
        title: title.value,
        completed: completed.value,
        userId: 1,
        id: taskId.value,
      };
      try {
        if (isEditing.value) {
          await updateTask(taskId.value, taskData);
          emit("task-updated", taskData);
        } else {
          await createTask(taskData);
          emit("task-added", taskData);
        }
        resetForm();
      } catch (err) {
        alert("Error saving task: " + err.message);
      }
    };

    return {
      title,
      completed,
      isEditing,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  background: #f6f8fa;
  border-radius: 12px;
  padding: 20px 18px 16px 18px;
  box-shadow: 0 2px 8px 0 rgba(60, 72, 100, 0.06);
}
.task-input {
  padding: 10px 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.2s;
}
.task-input:focus {
  border: 1.5px solid #6366f1;
  outline: none;
  background: #fff;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
}
.submit-btn {
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(60, 72, 100, 0.08);
  transition: background 0.2s, box-shadow 0.2s;
}
.submit-btn:hover {
  background: linear-gradient(90deg, #4f46e5 0%, #2563eb 100%);
  box-shadow: 0 4px 16px 0 rgba(60, 72, 100, 0.12);
}
</style>
