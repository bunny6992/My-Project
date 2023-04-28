// User Class
class User {
  constructor(username, password, firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.username= username;
    this.password = password;
  }

  getFirstName(){
    return this.firstName;
  }

  getLastName(){
    return this.lastName;
  }

  getUsername(){
    return this.username;
  }

  getPassword(){
    return this.password;
  }

  setFirstName(firstName){
    this.firstName = firstName;
  }

  setLastName(lastname){
    this.lastName = lastname;
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
    console.log(newUser);
  }

  // Just for Testing
  let apiTesting = document.getElementById("apiTesting");
  apiTesting.addEventListener('click', testMyApi);

  let postApiTesting = document.getElementById("postApiTesting");
  postApiTesting.addEventListener('click', postApi);

  function testMyApi() {
    fetch("http://localhost:3000/users/")
    .then(response => response.json())
    .then(data => console.log(data))
  }

  function postApi() {
    fetch("http://localhost:3000/posts/")
    .then(response => response.json())
    .then(data => console.log(data))
  }
}

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
    console.log(newUser);
  }
}

// Post Form
let postForm = document.getElementById("postForm");
if (postForm) { 
  postForm.addEventListener('submit', post);

  function post(event) {
    event.preventDefault();
    let newPost = document.getElementById("newPost").value
    console.log(newPost);
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