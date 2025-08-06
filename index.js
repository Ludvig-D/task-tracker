#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const jsonFilePath = path.join(__dirname, 'task.json');

function readTasks() {
  if (fs.existsSync(jsonFilePath)) {
    try {
      const data = fs.readFileSync(jsonFilePath);
      if (data.length > 0) {
        const tasks = JSON.parse(data).sort((a, b) => a.id - b.id);
        return tasks;
function readTasks() {
  if (fs.existsSync(jsonFilePath)) {
    try {
      const data = fs.readFileSync(jsonFilePath);
      if (data.length > 0) {
        const tasks = JSON.parse(data).sort((a, b) => a.id - b.id);
        return tasks;
      } else {
        return [];
      }
    } catch (err) {
      throw err;
    }
  } else {
    return [];
  }
}

function writeFile(tasks) {
  fs.writeFileSync(jsonFilePath, JSON.stringify(tasks));
}

function listTasks(type) {
  let tasks = readTasks();
  if ([undefined, 'done', 'todo', 'in-progress'].includes(type)) {
    const verifyTasks =
      type != undefined ? tasks.filter((task) => task.status == type) : tasks;
    if (verifyTasks.length > 0) {
      console.log(`List of all ${type == undefined ? '' : type + ' '}tasks`);
    }
    verifyTasks.map((task) => {
      console.log(
        `(ID:${task.id}) ${firstUpperCase(task.item)} - ${firstUpperCase(
          task.status
        )}`
      );
    });
    if (verifyTasks.length == 0) {
      console.log(
        `${
          type == undefined
            ? 'No tasks made yet'
            : `No tasks with status ${type}`
        }`
      );
        return [];
      }
    } catch (err) {
      throw err;
    }
  } else {
    return [];
  }
}

function writeFile(tasks) {
  fs.writeFileSync(jsonFilePath, JSON.stringify(tasks));
}

function listTasks(type) {
  let tasks = readTasks();
  if ([undefined, 'done', 'todo', 'in-progress'].includes(type)) {
    const verifyTasks =
      type != undefined ? tasks.filter((task) => task.status == type) : tasks;
    if (verifyTasks.length > 0) {
      console.log(`List of all ${type == undefined ? '' : type + ' '}tasks`);
    }
    verifyTasks.map((task) => {
      console.log(
        `(ID:${task.id}) ${firstUpperCase(task.item)} - ${firstUpperCase(
          task.status
        )}`
      );
    });
    if (verifyTasks.length == 0) {
      console.log(
        `${
          type == undefined
            ? 'No tasks made yet'
            : `No tasks with status ${type}`
        }`
      );
    }
  } else {
    console.log('Type is not vaild');
    console.log('Type is not vaild');
  }
}

function updateTask(id, newText) {
  if (Number.isInteger(parseInt(id))) {
    let tasks = readTasks();
    if (newText) {
      let taskExist = tasks.find((task) => task.id == input[3]);
}

function updateTask(id, newText) {
  if (Number.isInteger(parseInt(id))) {
    let tasks = readTasks();
    if (newText) {
      let taskExist = tasks.find((task) => task.id == input[3]);
      if (!taskExist) {
        console.log('No task with that id');
      } else {
        tasks.map((task) => {
          if (task.id == taskExist.id) {
            task.item = input[4];
            task.item = input[4];
            task.updatedAt = new Date().getTime();
          }
        });
        writeFile(tasks);
        console.log(
          `Task with id ${taskExist.id} has been updated succesfully`
        );
        writeFile(tasks);
        console.log(
          `Task with id ${taskExist.id} has been updated succesfully`
        );
      }
    } else {
      console.log('You need to specify what you want to update it to');
    }
    } else {
      console.log('You need to specify what you want to update it to');
    }
  } else {
    console.log('You need to specify which item to update using its ID');
    console.log('You need to specify which item to update using its ID');
  }
}

function deleteTask(id) {
  if (Number.isInteger(parseInt(id))) {
    let tasks = readTasks();
    let taskExist = tasks.find((task) => task.id == id);
    if (!taskExist) {
      console.log('No task with that id');
    } else {
      tasks.splice(tasks.indexOf(taskExist), 1);
      writeFile(tasks);
      console.log(`Deleted task succesfully ID: ${id}`);
    }
}

function deleteTask(id) {
  if (Number.isInteger(parseInt(id))) {
    let tasks = readTasks();
    let taskExist = tasks.find((task) => task.id == id);
    if (!taskExist) {
      console.log('No task with that id');
    } else {
      tasks.splice(tasks.indexOf(taskExist), 1);
      writeFile(tasks);
      console.log(`Deleted task succesfully ID: ${id}`);
    }
  } else {
    console.log('Has to be a id number');
    console.log('Has to be a id number');
  }
}

function markTask(id, type) {
  if (Number.isInteger(parseInt(id))) {
    let tasks = readTasks();
    let taskExist = tasks.find((task) => task.id == id);
    if (!taskExist) {
      console.log('No task with that id');
    } else {
      tasks.map((task) => {
        if (task.id == taskExist.id) {
          task.status = type;
          task.updatedAt = new Date().getTime();
        }
      });
      writeFile(tasks);
      console.log(`Task with id ${taskExist.id} has been updated succesfully`);
    }
}

function markTask(id, type) {
  if (Number.isInteger(parseInt(id))) {
    let tasks = readTasks();
    let taskExist = tasks.find((task) => task.id == id);
    if (!taskExist) {
      console.log('No task with that id');
    } else {
      tasks.map((task) => {
        if (task.id == taskExist.id) {
          task.status = type;
          task.updatedAt = new Date().getTime();
        }
      });
      writeFile(tasks);
      console.log(`Task with id ${taskExist.id} has been updated succesfully`);
    }
  } else {
    console.log('Need to specify which to update');
  }
}

function help() {
}

function help() {
  console.log('Here are all the commands you can do:');
  console.log();
  console.log(
    'add "Write what you need to do here" (If you want you can put status here)'
  );
  console.log(
    'add "Write what you need to do here" (If you want you can put status here)'
  );
  console.log('update (ID) "Write what you want to change the task to"');
  console.log('del (ID)');
  console.log();
  console.log('mark-todo (ID)');
  console.log('mark-done (ID)');
  console.log('mark-in-progress (ID)');
  console.log();
  console.log('list');
  console.log('list todo');
  console.log('list done');
  console.log('list in-progress');
}

let input = process.argv;
if (input[2] == 'add') {
  let tasks = readTasks();
  try {
    if ([undefined, 'done', 'todo', 'in-progress'].includes(input[4])) {
      let newTask = {
        item: `${input[3]}`,
        id: freeId(tasks),
        status: input[4] || 'todo',
        createAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      };
      tasks.push(newTask);
      writeFile(tasks);
      console.log(`Task added successfully (ID: ${newTask.id})`);
    } else {
      console.log('Type is not valid');
    }
  } catch (err) {
    throw err;
  }
} else if (input[2] == 'list') {
  listTasks(input[3]);
} else if (input[2] == 'update') {
  updateTask(input[3], input[4]);
} else if (input[2] == 'del') {
  deleteTask(input[3]);
} else if (input[2] == 'mark-in-progress') {
  markTask(input[3], 'in-progress');
} else if (input[2] == 'mark-done') {
  markTask(input[3], 'done');
} else if (input[2] == 'mark-todo') {
  markTask(input[3], 'todo');
} else if (input[2] == undefined) {
  help();
}

function firstUpperCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
}

function compareIds(a, b) {
  return a - b;
}

function freeId(tasks) {
function freeId(tasks) {
  let sortedIds = tasks
    .map((task) => {
      return task.id;
    })
    .sort(compareIds);

  let idList = sortedIds[sortedIds.length - 1] || 1;

  for (let i = 1; i <= idList; i++) {
    let idDosentExitYet = sortedIds.find((id) => id == i);
    if (idDosentExitYet == undefined) {
      return i;
    } else if (idDosentExitYet != undefined && i == idList) {
      return i + 1;
    }
  }
}
}
