class User {
  constructor(firstName, lastName, username, password){
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
      document.getElementById("fname").value,
      document.getElementById("lname").value,
      document.getElementById("username").value,
      document.getElementById("password").value
    );
    console.log(newUser);
  }
}

// Login Form 
let loginForm = document.getElementById("loginForm");
if (loginForm) { 
  loginForm.addEventListener('submit', login);

  function login(event) {
    event.preventDefault();
    let newUser = new User(
      "", "",
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