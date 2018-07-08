'use strict'
import {createServer} from 'http';
import {app} from './app';
import './sequelize';

const port = process.env.PORT || 5000;

(async () => {
  createServer(app)
    .listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})();