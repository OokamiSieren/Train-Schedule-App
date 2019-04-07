// Initialize Firebase
var config = {
    apiKey: "AIzaSyCAqcqkWG8FvMptbMQTzFsbhxQeNJEByKY",
    authDomain: "trains-2881f.firebaseapp.com",
    databaseURL: "https://trains-2881f.firebaseio.com",
    projectId: "trains-2881f",
    storageBucket: "",
    messagingSenderId: "953909329147"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  // create button for user input
  // store input to database
  // dynamically create table rows for user input
  // display user input to html from database
  // use moment js to calculate minutes left until next train arrival?