'use strict';

const eventHub = require('./events/hub');
const ioFactory = require('socket.io');
const io = ioFactory(3000);

io.on('connection', socket => {
  console.log('Connected', socket.id);

  socket.on('speak', payload => {
    console.log('speaking', payload);

    socket.broadcast.emit('spoken', payload);
  });

  socket.on('save', payload => {
    console.log('saving', payload);

    socket.broadcast.emit('save', payload);
  });

  socket.on('error', payload => {
    console.log('erring', payload);

    socket.broadcast.emit('error', payload);
  })

  setTimeout(() => {
    socket.broadcast.emit('spoken', `Welcome ${socket.id}`);
  }, 1000);
});
