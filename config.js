'use strict';
import npcp from 'npcp';

const config = {
  app: {
    port: process.env.PORT || npcp.port
  },
  mongo: {
    connString: 'mongodb://localhost/local'
  }
};

export default config;
