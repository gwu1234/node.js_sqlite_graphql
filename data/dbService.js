const db = require('./db');

async function create(product) {
  try {
    let timestamp = new Date().getTime();
    result = await db.insert("product", [...Object.keys(product), "created_at"], [...Object.values(product), timestamp])
    return result
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    return {message:"posting failed"};
  }
}

async function getEmployees() {
  try {
    let result = await db.query("employee")
    console.log("dbService")
    console.log(result)
    return result
  } catch (err) {
    console.error(`Error while getting employees `, err.message);
    return [];
  }
}

async function getCompanies() {
  try {
    let result = await db.query("company")
    //console.log(result)
    return result
  } catch (err) {
    console.error(`Error while getting companies `, err.message);
    return [];
  }
}

module.exports = {
  create, 
  getEmployees,
  getCompanies
}