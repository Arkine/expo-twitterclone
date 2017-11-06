/* eslint-disable no-console */

import express from 'express';

import { createServer } from 'http';

import './config/db';
import middlewares from './config/middlewares';
import constants from './config/constants';
import mocks from './mocks';

const app = express();

middlewares(app);

const graphQlServer = createServer(app);

// mocks().then(() => {
	app.listen(constants.PORT, err => {
		if (err) {
			console.log(err);
		} else {
			console.log(`App listening on port: ${constants.PORT}`);
		}
	});
// })

