const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

const taskChest = [];
function Task (title, description, dueDate, priority, carpet) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.carpet = carpet;
}

Task.prototype.addCheckItem = function (item) {
  this.checklist.push(item);
};
Task.prototype.checklist = [];

function createTask (title, description, dueDate, priority, carpet = 'default') {
  const newTask = new Task(title, description, dueDate, priority, carpet);
  if (checkTask(newTask)) {
    taskChest.push(newTask);
  }
}

function checkTask (taskToCheck) {
  // if (taskToCheck.title !== '' && taskToCheck.dueDate !== '') {
  //   return true
  // } else {
  //   return false;
  // }
  return true;
}

createTask('Chemestry Homework', 'Comple the questions of the book, page 215.', dayjs().format('DD/MM/YYYY'), 'Important', 'School');
createTask('Proyect #2', 'Work in the proyect', dayjs().add(9, 'day').format('DD/MM/YYYY'), 'Urgent', 'Work');

const filterTask = (function () {
  const today = () => taskChest.filter(task => task.dueDate === dayjs().format('DD/MM/YYYY'));
  // First, use the "customParseFormat" plugin to get the date of the task. Then, use the "isBetween", or "isSameOrAfter",, plugin to check if the task belongs to this week or this month carpet.
  const nextWeek = () => taskChest.filter(task => dayjs(task.dueDate, 'DD/MM/YYYY').isBetween(dayjs().subtract(1, 'day'), dayjs().add(7, 'day')));

  const nextMonth = taskChest.filter(task => dayjs(task.dueDate, 'DD/MM/YYYY').isBetween(dayjs().subtract(1, 'day'), dayjs().add(1, 'month')));

  const upComing = () => taskChest.filter(task => dayjs(task.dueDate, 'DD/MM/YYYY').isSameOrAfter(dayjs().subtract(1, 'day')));

  const byPriority = (priority) => taskChest.filter(task => task.priority === priority);

  const byCarpet = (carpet) => taskChest.filter(task => task.carpet === carpet);

  return { today, nextWeek, nextMonth, upComing, byPriority, byCarpet };
})();

console.log(taskChest);
console.log(filterTask.nextWeek());
