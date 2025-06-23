/* eslint-env vitest */
import { mount } from "@vue/test-utils";
import TaskItem from "../src/components/TaskItem.vue";

describe("TaskItem.vue", () => {
  it("renders title and checkbox", () => {
    const task = { id: 1, title: "Test task", completed: false };
    const wrapper = mount(TaskItem, { props: { task } });
    expect(wrapper.text()).toContain("Test task");
    expect(wrapper.find("input[type='checkbox']").element.checked).toBe(false);
  });
});
