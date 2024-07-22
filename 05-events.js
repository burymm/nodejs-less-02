
const EventEmitter = require('events');

const customEmitter = new EventEmitter();

customEmitter.on('resp', (data) => {
    console.log('event emitted', data);
});

customEmitter.emit('resp', { test : 'test'});