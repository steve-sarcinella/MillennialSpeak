import http from 'http';
import assert from 'assert';

import { closeServer } from '../src/app.js';

before(() => {
  closeServer(() => console.log('Closed server on port for continuous testing'));
});
