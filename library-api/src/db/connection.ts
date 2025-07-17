import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'titanic',
  password: 'abc12345',
});

export default pool;
