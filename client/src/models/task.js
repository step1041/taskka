class Task {
  static validate(task) {
    let errors = {};

    if (!task.name) {
      errors.name = "Name is required";
    }

    return errors;
  }
}

export default Task;
