#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const folderPath = path.join('/home/ludde/projekts/task-tracker');
const jsonFilePath = path.join(folderPath, 'task.json');

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
        status: 'todo',
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
    if (data.buffer.byteLength > 0) {
      let tasks = JSON.parse(data);
      tasks.map((task) => {
        console.log(
          `(ID:${task.id}) ${
            task.item.charAt(0).toUpperCase() + task.item.slice(1)
          }`
        );
      });
    } else {
      console.log('No tasks exist yet');
    }
  });
}
