
let pool = null; // Type annotations removed for JavaScript

// Connect to SQL only once and reuse the pool
async function connect() {
  if (pool) return pool;
  try {
    pool = await sql.connect(dbConfig);
    return pool;
  } catch (err) {
    pool = null;
    throw err;
  }
}


// Optional: disconnect when your app shuts down
async function disconnect() {
  if (pool) {
    await pool.close();
    pool = null;
  }
}


// Execute a query (returns recordset)
async function execQuery(query, params = {}) {
  const conn = await connect();
  const request = conn.request();
  for (const key in params) {
    request.input(key, params[key]);
  }
  const result = await request.query(query);
  return result.recordset;
}

// Query with custom handler (returns full result)
async function query(query, params = {}) {
  const conn = await connect();
  const request = conn.request();
  for (const key in params) {
    request.input(key, params[key]);
  }
  return request.query(query);
}

module.exports = {
  connect,
  disconnect,
  execQuery,
  query
};


