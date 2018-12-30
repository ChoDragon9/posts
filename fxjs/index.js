const {
  go
} = require('./fxjs');

const log = console.log;

go(
  1,
  x => x + 1,
  log
);