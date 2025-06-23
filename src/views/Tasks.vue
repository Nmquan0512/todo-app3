<template>
  <div>
    <TaskForm
      :task-to-edit="taskToEdit"
      @task-added="onTaskAdded"
      @task-updated="onTaskUpdated"
    />
    <TaskList
      :tasks="tasks"
      @edit-task="onEditTask"
      @task-updated="onTaskUpdated"
      @task-deleted="onTaskDeleted"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { ref, onMounted } from "vue";
import TaskForm from "../components/TaskForm.vue";
import TaskList from "../components/TaskList.vue";
import { getTasks, createTask, updateTask, deleteTask } from "../api/api.js";

export default {
  name: "TasksView",
  components: { TaskForm, TaskList },
  props: {
    id: { type: [String, Number], default: null },
    onNavigate: { type: Function, default: null },
  },
  setup(props) {
    const tasks = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const taskToEdit = ref(null);

    const fetchTasks = async () => {
      loading.value = true;
      error.value = null;
      try {
        tasks.value = await getTasks();
      } catch (err) {
        error.value = err.message || "Failed to load tasks";
      } finally {
        loading.value = false;
      }
    };

    const onEditTask = (task) => {
      console.log("onEditTask nhận:", task);
      taskToEdit.value = task;
    };

    const onTaskAdded = async (taskData) => {
      console.log("onTaskAdded nhận:", taskData);
      await fetchTasks();
    };

    const onTaskUpdated = async (taskData) => {
      console.log("onTaskUpdated nhận:", taskData);
      await fetchTasks();
      taskToEdit.value = null;
    };

    const onTaskDeleted = async (id) => {
      console.log("onTaskDeleted nhận:", id);
      await fetchTasks();
    };

    onMounted(fetchTasks);

    return {
      tasks,
      loading,
      error,
      fetchTasks,
      taskToEdit,
      onEditTask,
      onTaskAdded,
      onTaskUpdated,
      onTaskDeleted,
    };
  },
};
</script>
