// const posts = [
//     {
//         postId: 222,
//         userId: 111,
//         post: "Life in Vegas is not that great!"
//     },
//     {
//         postId: 333,
//         userId: 122,
//         post: "If nothing is working out, just wait and ride it out."
//     },
//     {
//         postId: 444,
//         userId: 133,
//         post: "A creepy guy is just a guy who is not attractive."
//     }
// ]

const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS posts (
    post_id INT NOT NULL AUTO_INCREMENT,
    post LONGTEXT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT postPK PRIMARY KEY(post_id),
    CONSTRAINT userFK FOREIGN KEY(user_id) REFERENCES users(user_id)
  );`

  await con.query(sql);  
}

createTable();

// functions to complete CRUD operations
async function getAllPosts() {
    let sql = `SELECT * FROM posts;`
    return await con.query(sql);
}

async function getAllUserPosts(user) {
    let sql = `SELECT * FROM posts WHERE user_id = "${user.user_id}";`
    return await con.query(sql);
}

async function getPost(postId) {
    let sql = `SELECT * FROM posts WHERE post_id = "${postId}";`
    return await con.query(sql);
}

async function createPost(post) {
    // create new post
    let sql = `
        INSERT INTO posts(post, user_id)
        VALUES ("${post.post}", "${post.user_id}");
    `
    await con.query(sql)

    // get all user's posts to send over
    return await getAllUserPosts(post);
}

async function editPost(post) {
    sql = `
        UPDATE posts 
        SET post = "${post.post}"
        WHERE post_id = ${post.post_id};
    `
    await con.query(sql)    
}

async function deletePost(post) {
    let sql = `
        DELETE FROM posts
        WHERE post_id = ${post.post_id}
    `
    await con.query(sql);
}

module.exports = { getAllPosts, createPost, getAllUserPosts, editPost, deletePost }