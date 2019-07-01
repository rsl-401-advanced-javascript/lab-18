'use strict';

const ioClient = require('socket.io-client');

const socket = ioClient.connect('http://localhost:3000');

socket.on('spoken', payload => {
  console.log('LOGGER spoken', payload);
});

socket.on('save', payload => {
  console.log('LOGGER save', payload);
});

socket.on('error', payload => {
  console.log('LOGGER error', payload);
});