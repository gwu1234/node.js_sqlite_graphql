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

async function getProducts() {
  try {
    let result = await db.query("product")
    return result
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    return {message:"Getting failed"};
  }
}

module.exports = {
  //getMultiple,
  create, 
  getProducts
}