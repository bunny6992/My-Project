const posts = [
    {
        postId: 222,
        userId: 111,
        post: "Life in Vegas is not that great!"
    },
    {
        postId: 333,
        userId: 122,
        post: "If nothing is working out, just wait and ride it out."
    },
    {
        postId: 444,
        userId: 133,
        post: "A creepy guy is just a guy who is not attractive."
    }
]

// functions to complete CRUD operations
function getAllPosts() {
    return posts;
}

module.exports = { getAllPosts }