const users = [
    {
        userId: 111,
        userName: "barney",
        password: "suitup"  
    },
    {
        userId: 122,
        userName: "sheldon",
        password: "bazzinga"  
    },
    {
        userId: 133,
        userName: "joey",
        password: "howyoudoing"  
    }
]

// functions to complete CRUD operations
function getAllUsers() {
    return users;
}

function login(user) {
    let cUser = users.filter(u => u.userName == user.userName);
    if(!cUser[0]) throw Error("Username does not exist!");

    if(cUser[0].password != user.password) throw Error("Password is incorrect!");

    return cUser[0];
}

module.exports = { getAllUsers, login }