#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const jsonFilePath = path.join(__dirname, 'task.json');

if (process.argv[2] == 'add') {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) {
      if (err.code == 'ENOENT') {
        let newtask = [
          {
            item: `${process.argv[3]}`,
            id: 1,
          },
        ];
        fs.writeFile('task.json', JSON.stringify(newtask), (err) => {
          if (err) throw err;
          console.log('File created and written successfully');
        });
      } else {
        throw err;
      }
    } else {
      let tasks = [];
      if (data.buffer.byteLength > 0) {
        tasks = JSON.parse(data);
      }

      let newtask = {
        item: `${process.argv[3]}`,
        id: tasks.length + 1,
        status: process.argv[4] || 'todo',
        createAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      };

      tasks.map((task) => {
        if (task.id == newtask.id) newtask.id + 1;
      });

      tasks.push(newtask);

      fs.writeFile('task.json', JSON.stringify(tasks), (err) => {
        if (err) throw err;
        console.log(`Task added successfully (ID: ${newtask.id})`);
      });
    }
  });
} else if (process.argv[2] == 'list') {
  fs.readFile(jsonFilePath, (err, data) => {
    if (err) throw err;
    let tasks = JSON.parse(data);
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
} else if (process.argv[2] == 'delete') {
  if (Number.isInteger(parseInt(process.argv[3]))) {
    fs.readFile(jsonFilePath, (err, data) => {
      if (err) throw err;
      let tasks = JSON.parse(data);
      let taskExist = tasks.find((task) => task.id == process.argv[3]);
      if (!taskExist) {
        console.log('No task with that id');
      } else {
        console.log(
          `(ID:${taskExist.id}) ${firstUpperCase(
            taskExist.item
          )} - ${firstUpperCase(taskExist.status)}`
        );
      }
    });
  } else {
    console.log('Has to be a id number');
  }
}

const firstUpperCase = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};
