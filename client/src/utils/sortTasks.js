export const sortTasks = (tasks) => {
    /**
     * Sort tasks in a project by their due date.
     * @param {Array} tasks Array of tasks
     * @return {Array}      Sorted array of tasks by their "due_date" field
     */ 
    const key = "due_date"
    return tasks.slice().sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  };
  