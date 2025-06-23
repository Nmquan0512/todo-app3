<template>
  <div id="app" class="app-container">
    <ErrorBoundary>
      <component :is="currentView" :id="currentTaskId" @navigate="navigate" />
    </ErrorBoundary>
  </div>
</template>

<script>
/* eslint-disable */
import { ref, defineAsyncComponent, h } from "vue";
import HomeView from "./views/Home.vue";
import TasksView from "./views/Tasks.vue";
const TaskDetail = defineAsyncComponent(() => import("./views/TaskDetail.vue"));
import ErrorBoundary from "./components/ErrorBoundary.vue";

export default {
  components: {
    ErrorBoundary,
  },
  setup() {
    const currentView = ref("HomeView");
    const currentTaskId = ref(null);

    const navigate = (view, id = null) => {
      currentView.value = view;
      currentTaskId.value = id;
    };

    const components = {
      HomeView,
      TasksView,
      TaskDetail,
    };

    return () =>
      h(
        ErrorBoundary,
        {},
        {
          default: () =>
            h(components[currentView.value], {
              id: currentTaskId.value,
              onNavigate: navigate,
            }),
        }
      );
  },
};
</script>

<style>
body {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
  font-family: "Inter", "Segoe UI", Arial, sans-serif;
  margin: 0;
  min-height: 100vh;
}

.app-container {
  max-width: 800px;
  margin: 32px auto;
  padding: 32px 16px 24px 16px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 6px 32px 0 rgba(60, 72, 100, 0.12), 0 1.5px 6px 0 rgba(60, 72, 100, 0.08);
  min-height: 80vh;
  transition: box-shadow 0.2s;
}

@media (max-width: 900px) {
  .app-container {
    margin: 0;
    border-radius: 0;
    min-height: 100vh;
    box-shadow: none;
  }
}
</style>
