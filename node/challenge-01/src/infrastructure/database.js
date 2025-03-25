import knex from 'knex';
import path from 'node:path';
import { env } from './environment';

export const database = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(process.cwd(), env.DATABASE_NAME),
  },
  useNullAsDefault: true,
});
