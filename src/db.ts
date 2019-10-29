import { Pool } from 'pg';
import { getEnv } from './utils/getEnv';
import * as knex from 'knex';

const prefix = process.env.DB_PREFIX ? `${process.env.DB_PREFIX}_` : '';

export const knexCxn = () => knex({
    client: 'pg',
    connection: {
        user: getEnv('DB_USER'),
        host: getEnv('DB_HOST'),
        database: `${prefix}${getEnv('DB_NAME')}`,
        password: getEnv('DB_PASSWORD'),
        port: getEnv('DB_PORT')
    },
    pool: {
        min: 2,
        max: getEnv('DB_POOL_MAX_CONNECTIONS'),  // default - 10,
    },
    asyncStackTraces: true,
});

export const pgCxn = () => new Pool({
    user: getEnv('DB_USER'),
    host: getEnv('DB_HOST'),
    database: `${prefix}${getEnv('DB_NAME')}`,
    password: getEnv('DB_PASSWORD'),
    port: getEnv('DB_PORT'),
    connectionTimeoutMillis: getEnv('DB_POOL_CONNECTION_TIMEOUT'), // default - 0 (no timeout)
    idleTimeoutMillis: getEnv('DB_POOL_IDLE_TIMEOUT'),  // default - 10000
    max: getEnv('DB_POOL_MAX_CONNECTIONS'),  // default - 10
});
