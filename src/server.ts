import './honeycomb';
import { getEnv } from './utils/getEnv';
import application from './application';
import logger from './utils/logger';
import { pgCxn, knexCxn } from './db';
import * as process from 'process';

const port = getEnv('PORT');
const pgInstance = pgCxn();
const knexInstance = knexCxn();
const app = application(pgInstance, knexInstance);
app.listen(port, () => logger.info(`Server running at port ${port} on PID: ${process.pid}`));
