'use strict';

// const eventHub = require('./events/hub');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');
const fs = require('fs');
const { promisify } = require('util');
const fsReadFile = promisify(fs.readFile);
const fsWriteFile = promisify(fs.writeFile);

const alterFile = async file => {
  try {
    let data = await fsReadFile(file);
    let text = data.toString().toUpperCase();
    await fsWriteFile(file, Buffer.from(text));
    socket.emit('save', `${file} saved!`);
  } catch {
    socket.emit('error', 'Error in altering file.');
  }
};

let file = process.argv.slice(2).shift();
alterFile(file);
