const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT userPK PRIMARY KEY(user_id)
  );`

  await con.query(sql);  
}

createTable();

// functions to complete CRUD operations
async function getAllUsers() {
    let sql = `SELECT * FROM users;`
    return await con.query(sql);
}

async function userExists(username) {
    let sql = `
        SELECT * FROM users
        WHERE username = "${username}"
    `
    return await con.query(sql);
}

async function login(user) {
    let cUser = await userExists(user.username);
    if(!cUser[0]) throw Error("Username does not exist!");
    if(cUser[0].password != user.password) throw Error("Password is incorrect!");

    return cUser[0];
}

async function register(user) {
    // check to see if username is already in use
    let cUser = await userExists(user.username);
    if(cUser.length>0) throw Error("Username already exists");

    // create new user
    let sql = `
        INSERT INTO users(username, password, first_name, last_name)
        VALUES ("${user.username}", "${user.password}", "${user.first_name}", "${user.last_name}");
    `
    await con.query(sql)

    // get user to send over
    cUser = await getUser(user)
    console.log(cUser)
    return cUser[0];
}

async function getUser(user) {
    let sql;
    if(user.userID) {
        sql = `
        SELECT * FROM users
        WHERE user_id = ${user.userID};
        `
    } else {
        sql = `
        SELECT * FROM users
        WHERE username = "${user.username}";
        `
    }

    return await con.query(sql);
}

// edit a username function
async function editUser(user) {
    let sql = `
        UPDATE users 
        SET first_name = "${user.first_name}", last_name = "${user.last_name}"
    `;
    
    if (user.username) {
        let cUser = await userExists(user.username);
        if(cUser.length > 0) throw Error("Username in use!!");

        sql += `, username = "${user.username}"`
    }

    if (user.password) sql += `, password = "${user.password}"`
    sql += ` WHERE user_id = ${user.userID};`

    await con.query(sql)
    cUser = await getUser(user)
    return cUser[0]
}

async function deleteUser(user) {
    // return user
    let sql = `DELETE FROM posts
        WHERE user_id = ${user.user_id};
    `
    await con.query(sql);
    sql = `
        DELETE FROM users
        WHERE user_id = ${user.user_id};
    `
    await con.query(sql);
    
}

module.exports = { getAllUsers, login, register, editUser, deleteUser }