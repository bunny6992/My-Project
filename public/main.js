// User Class
class User {
  constructor(username, password, firstName, lastName){
    this.first_name = firstName;
    this.last_name = lastName;
    this.username= username;
    this.password = password;
  }

  getFirstName(){
    return this.first_name;
  }

  getLastName(){
    return this.last_name;
  }

  getUsername(){
    return this.username;
  }

  getPassword(){
    return this.password;
  }

  setFirstName(firstName){
    this.first_name = firstName;
  }

  setLastName(lastname){
    this.last_name = lastname;
  }

  setUsername(username){
    this.username= username;
  }

  setPassword(password){
    this.password = password;
  }
}

// Registration Form 
let registerForm = document.getElementById("registerForm");
if (registerForm) { 
  registerForm.addEventListener('submit', register);

  function register(event) {
    event.preventDefault();
    let newUser = new User(
      document.getElementById("username").value,
      document.getElementById("password").value,
      document.getElementById("fname").value,
      document.getElementById("lname").value
    );
    fetchData('/users/register', newUser, "POST")
    .then(data => {
      setCurrentUser(data);
      window.location.href = "post.html"
    })
    .catch(err => {
      document.querySelector("#registerForm p.error").innerHTML = err.message;
      document.getElementById("username").value = ""
      document.getElementById("password").value = ""
    })
  }
}
// Profile Form 
let profileForm = document.getElementById("profileForm");
if (profileForm) { 
  profileForm.addEventListener('submit', updateUser);

  function updateUser(event) {
    event.preventDefault();
    let cUser = new User(
      document.getElementById("username").value,
      document.getElementById("password").value,
      document.getElementById("fname").value,
      document.getElementById("lname").value
    );

    let sUser = getCurrentUser()
    cUser.userID = sUser.user_id

    if (document.getElementById("username").value == sUser.username) {
      cUser.setUsername("");
    }

    fetchData('/users/edit', cUser, "PUT")
    .then(data => {
      setCurrentUser(data);
      window.location.href = "profile.html"
    })
    .catch(err => {
      document.querySelector("#profileForm p.error").innerHTML = err.message;
      // document.getElementById("username").value = ""
      // document.getElementById("password").value = ""
    })
  }
}

  // Just for Testing
  // let apiTesting = document.getElementById("apiTesting");
  // apiTesting.addEventListener('click', testMyApi);

  // let postApiTesting = document.getElementById("postApiTesting");
  // postApiTesting.addEventListener('click', postApi);

  // function testMyApi() {
  //   fetch("http://localhost:3000/users/")
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }

  // function postApi() {
  //   fetch("http://localhost:3000/posts/")
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }

// Login Form 
let loginForm = document.getElementById("loginForm");
if (loginForm) { 
  loginForm.addEventListener('submit', login);

  function login(event) {
    event.preventDefault();
    let newUser = new User(
      document.getElementById("username").value,
      document.getElementById("password").value
    );
    fetchData('/users/login', newUser, "POST")
    .then(data => {
      setCurrentUser(data);
      window.location.href = "post.html"
    })
    .catch(err => {
      document.querySelector("#loginForm p.error").innerHTML = err.message;
      document.getElementById("username").value = ""
      document.getElementById("password").value = ""
    })
  }
}

// Post Form
let postForm = document.getElementById("postForm");
if (postForm) { 
  postForm.addEventListener('submit', post);

  function post(event) {
    event.preventDefault();
    let newPost = document.getElementById("newPost").value
    let cUser = getCurrentUser()

    fetchData('/posts/create', {"user_id": cUser.user_id, "post": newPost}, "POST")
    .then(data => {
      window.location.href = "post.html"
    })
    .catch(err => {
      document.querySelector("#postForm p.error").innerHTML = err.message;
    })
  }
}


// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if(response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
} 

// local storage for user
function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

function logoutUser() {
  localStorage.removeItem('user')
  window.location.href = "login.html"
}


if (getCurrentUser()) {
  document.getElementById("signUpLink").style.display = "none";
  document.getElementById("logoutLink").style.display = "inline";
  document.getElementById("profileLink").style.display = "inline";
  document.getElementById("logoutLink").style.display = "inline";
  document.getElementById("postLink").style.display = "inline";
  if (document.getElementById("profileForm")) {
    let cUser = getCurrentUser()
    document.getElementById("username").value = cUser.username
    document.getElementById("fname").value = cUser.first_name
    document.getElementById("lname").value = cUser.last_name
  }
} else {
  document.getElementById("signUpLink").style.display = "inline";
  document.getElementById("loginLink").style.display = "inline";
  document.getElementById("profileLink").style.display = "none";
  document.getElementById("logoutLink").style.display = "none";
  document.getElementById("postLink").style.display = "none";
}

function deleteMyAccount() {
  let cUser = getCurrentUser()
  fetchData('/users/delete', cUser, "DELETE")
  .then(data => {
    logoutUser()
    window.location.href = "register.html"
  })
  .catch(err => {
    document.querySelector("#profileForm p.error").innerHTML = err.message;
  })
}

let myPostsElement = document.getElementById("myPosts")

if (myPostsElement) {
  fetchData('/posts/user-posts', getCurrentUser(), "POST")
  .then(data => {
    let postsHTML = `<div class="mt-10">`
      data.forEach(element => {
        postsHTML += `<p class="posts">${element.post}</p>`
      });
      postsHTML += `</div>`
      myPostsElement.innerHTML = postsHTML
  })
  .catch(err => {
    consolelog(err.message)
  })
}