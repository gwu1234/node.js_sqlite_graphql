const sqlite3 = require("sqlite3").verbose();

let database = null

exports.conn = () => {
  database = new sqlite3.Database("./data/data.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to a SQLITE database.");
  });
};

exports.close = () => {
  if (database === null) return
  database.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

exports.create_table = (table_name,...Args) => {
  if (!database) return 
  database.run("CREATE TABLE IF NOT EXISTS "+table_name+"("+Args+")");
}

exports.insert_row = async (table_name, [...cols], [...vals] ) => {
  //console.log("db: insert_row")
  if (!database) return
  return new Promise((resolve, reject) => {
    let placeholders = vals.map((v) => "?").join(",");
    let sql = "INSERT INTO "+table_name+"("+cols.toString()+") VALUES " + "("+placeholders+")";
    database.run(sql, vals, (err) => {
      if (err) {
        console.error(`err: ${err.message}`);
        reject(new Error("posting failed"))
      }
      resolve({message: "posting successfully"})
    });
  })
}


exports.query =  async (table_name="") => {
  console.log("at query_rows")
  return new Promise((resolve, reject) => {
    if (!database) reject (new Error('null database'))
    let sql = `SELECT * from ${table_name}`
    console.log(`sql = ${sql}`)
    database.all(sql, [], (err, rows) => {
      if (err) {
        console.log (err.message)
        reject(err)
      }
      return resolve(rows)
    });
  });
}
