import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'jcwd3302_library',
  password: 'abc12345',
});

export default pool;
