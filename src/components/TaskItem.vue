<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <div class="task-main">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="toggleCompleted"
        class="task-checkbox"
      />
      <span class="task-title">{{ task.title }}</span>
    </div>
    <div class="task-actions">
      <button class="edit-btn" @click="$emit('edit-task', task)">Edit</button>
      <button class="delete-btn" @click="$emit('delete-task', task.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { updateTask } from "../api/api";

export default {
  props: {
    task: Object,
  },
  emits: ["edit-task", "delete-task"],
  methods: {
    async toggleCompleted() {
      try {
        await updateTask(this.task.id, {
          ...this.task,
          completed: !this.task.completed,
        });
        this.$emit("task-updated");
      } catch (err) {
        alert("Error updating task: " + err.message);
      }
    },
  },
};
</script>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  transition: box-shadow 0.2s, background 0.2s;
  margin: 4px 8px;
}
.task-item:last-child {
  border-bottom: none;
}
.task-item:hover {
  background: #f1f5f9;
  box-shadow: 0 2px 8px 0 rgba(60, 72, 100, 0.08);
}
.task-main {
  display: flex;
  align-items: center;
  gap: 12px;
}
.task-checkbox {
  width: 20px;
  height: 20px;
  accent-color: #6366f1;
}
.task-title {
  font-size: 1.05rem;
  font-family: "Inter", "Segoe UI", Arial, sans-serif;
  transition: color 0.2s, text-decoration 0.2s;
}
.completed .task-title {
  text-decoration: line-through;
  color: #9ca3af;
}
.task-actions {
  display: flex;
  gap: 8px;
}
.edit-btn,
.delete-btn {
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 0.98rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.edit-btn {
  background: #e0e7ff;
  color: #3730a3;
}
.edit-btn:hover {
  background: #6366f1;
  color: #fff;
}
.delete-btn {
  background: #fee2e2;
  color: #b91c1c;
}
.delete-btn:hover {
  background: #ef4444;
  color: #fff;
}
</style>
