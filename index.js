#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const jsonFilePath = path.join(__dirname, 'task.json');

if (process.argv[2] == 'add') {
  fs.readFile(jsonFilePath, (err, data) => {
    let tasks = [];
    if (err) {
      if (err.code == 'ENOENT') {
        let newtask = [
          {
            item: `${process.argv[3]}`,
            id: freeId(tasks),
            status: process.argv[4] || 'todo',
            createAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
          },
        ];
        fs.writeFile(jsonFilePath, JSON.stringify(newtask), (err) => {
          if (err) throw err;
          console.log('File created and written successfully');
        });
      } else {
        throw err;
      }
    } else {
      if (data.buffer.byteLength > 0) {
        tasks = JSON.parse(data);
      }
      let newtask = {
        item: `${process.argv[3]}`,
        id: freeId(tasks),
        status: process.argv[4] || 'todo',
        createAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      };

      tasks.push(newtask);

      fs.writeFile(jsonFilePath, JSON.stringify(tasks), (err) => {
        if (err) throw err;
        console.log(`Task added successfully (ID: ${newtask.id})`);
      });
    }
  });
} else if (process.argv[2] == 'list') {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) throw err;
    let parsedJson = JSON.parse(data);
    let tasks = parsedJson.sort((a, b) => a.id - b.id);
    if (data.buffer.byteLength > 0) {
      if (process.argv[3] == undefined) {
        console.log('List of all tasks');
        tasks.map((task) => {
          console.log(
            `(ID:${task.id}) ${firstUpperCase(task.item)} - ${firstUpperCase(
              task.status
            )}`
          );
        });
      } else if (process.argv[3] == 'done') {
        let listNum = tasks.filter((task) => task.status == 'done').length;
        if (listNum > 0) {
          console.log('List of all done tasks');
          tasks.map((task) => {
            if (task.status == 'done') {
              console.log(
                `(ID:${task.id}) ${firstUpperCase(
                  task.item
                )} - ${firstUpperCase(task.status)}`
              );
            }
          });
        } else {
          console.log('No tasks with status done');
        }
      } else if (process.argv[3] == 'todo') {
        let listNum = tasks.filter((task) => task.status == 'todo').length;
        if (listNum > 0) {
          console.log('List of all todo tasks');
          tasks.map((task) => {
            if (task.status == 'todo') {
              console.log(
                `(ID:${task.id}) ${firstUpperCase(
                  task.item
                )} - ${firstUpperCase(task.status)}`
              );
            }
          });
        } else {
          console.log('No tasks with status todo');
        }
      } else if (process.argv[3] == 'in-progress') {
        let listNum = tasks.filter(
          (task) => task.status == 'in-progress'
        ).length;
        if (listNum > 0) {
          tasks.map((task) => {
            if (task.status == 'in-progress') {
              console.log('List of all in-progress tasks');
              console.log(
                `(ID:${task.id}) ${firstUpperCase(
                  task.item
                )} - ${firstUpperCase(task.status)}`
              );
            }
          });
        } else {
          console.log('No tasks with status in-progress');
        }
      }
    } else {
      console.log('No tasks exist yet');
    }
  });
} else if (process.argv[2] == 'update') {
  if (Number.isInteger(parseInt(process.argv[3]))) {
    if (process.argv[4]) {
      fs.readFile(jsonFilePath, (err, data) => {
        if (err) throw err;
        let tasks = JSON.parse(data);
        let taskExist = tasks.find((task) => task.id == process.argv[3]);
        if (!taskExist) {
          console.log('No task with that id');
        } else {
          tasks.map((task) => {
            if (task.id == taskExist.id) {
              return (task.item = process.argv[4]);
            }
          });
          fs.writeFile(jsonFilePath, JSON.stringify(tasks), (err) => {
            if (err) throw err;
            console.log(
              `Task with id ${taskExist.id} has been updated succesfully`
            );
          });
        }
      });
    } else {
      console.log('Need to add what to update to');
    }
  } else {
    console.log('Need to specify which to update');
  }
} else if (process.argv[2] == 'del') {
  if (Number.isInteger(parseInt(process.argv[3]))) {
    fs.readFile(jsonFilePath, (err, data) => {
      if (err) throw err;
      let tasks = JSON.parse(data);
      let taskExist = tasks.find((task) => task.id == process.argv[3]);
      if (!taskExist) {
        console.log('No task with that id');
      } else {
        tasks.splice(tasks.indexOf(taskExist), 1);
        fs.writeFile(jsonFilePath, JSON.stringify(tasks), (err) => {
          if (err) throw err;
          console.log(
            `Task with id ${taskExist.id} has been succesfully removed`
          );
        });
      }
    });
  } else {
    console.log('Has to be a id number');
  }
} else if (process.argv[2] == 'mark-in-progress') {
  if (Number.isInteger(parseInt(process.argv[3]))) {
    fs.readFile(jsonFilePath, (err, data) => {
      if (err) throw err;
      let tasks = JSON.parse(data);
      let taskExist = tasks.find((task) => task.id == process.argv[3]);
      if (!taskExist) {
        console.log('No task with that id');
      } else {
        tasks.map((task) => {
          if (task.id == taskExist.id) {
            return (task.status = 'in-progress');
          }
        });
        fs.writeFile(jsonFilePath, JSON.stringify(tasks), (err) => {
          if (err) throw err;
          console.log(
            `Task with id ${taskExist.id} has been updated succesfully`
          );
        });
      }
    });
  } else {
    console.log('Need to specify which to update');
  }
} else if (process.argv[2] == 'mark-done') {
  if (Number.isInteger(parseInt(process.argv[3]))) {
    fs.readFile(jsonFilePath, (err, data) => {
      if (err) throw err;
      let tasks = JSON.parse(data);
      let taskExist = tasks.find((task) => task.id == process.argv[3]);
      if (!taskExist) {
        console.log('No task with that id');
      } else {
        tasks.map((task) => {
          if (task.id == taskExist.id) {
            return (task.status = 'done');
          }
        });
        fs.writeFile(jsonFilePath, JSON.stringify(tasks), (err) => {
          if (err) throw err;
          console.log(
            `Task with id ${taskExist.id} has been updated succesfully`
          );
        });
      }
    });
  } else {
    console.log('Need to specify which to update');
  }
} else if (process.argv[2] == 'mark-todo') {
  if (Number.isInteger(parseInt(process.argv[3]))) {
    fs.readFile(jsonFilePath, (err, data) => {
      if (err) throw err;
      let tasks = JSON.parse(data);
      let taskExist = tasks.find((task) => task.id == process.argv[3]);
      if (!taskExist) {
        console.log('No task with that id');
      } else {
        tasks.map((task) => {
          if (task.id == taskExist.id) {
            return (task.status = 'todo');
          }
        });
        fs.writeFile(jsonFilePath, JSON.stringify(tasks), (err) => {
          if (err) throw err;
          console.log(
            `Task with id ${taskExist.id} has been updated succesfully`
          );
        });
      }
    });
  } else {
    console.log('Need to specify which to update');
  }
} else if (process.argv[2] == undefined) {
  console.log('Here are all the commands you can do:');
  console.log();
  console.log('add "Write what you need to do here"');
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

const firstUpperCase = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

function compareIds(a, b) {
  return a - b;
}

const freeId = (tasks) => {
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
};
