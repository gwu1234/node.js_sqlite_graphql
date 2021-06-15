const db = require('./db');

async function createCompany(company) {
  try {
    result = await db.insert("company", Object.keys(company), Object.values(company))
    return result
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    return {status:"failure"};
  }
}

async function getEmployees() {
  try {
    let result = await db.query("employee")
    //console.log("dbService")
    //console.log(result)
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
  createCompany, 
  getEmployees,
  getCompanies
}