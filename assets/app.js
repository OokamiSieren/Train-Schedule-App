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
// create button for new trains

// store input to database
// dynamically create table rows for user input
// display user input to html from database
// use moment js to calculate minutes left until next train arrival?

$("#submit").on("click", function (event) {
    event.preventDefault();
    // getting user input and storing them as variables
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = $("#first-time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // Make a local "temp" object for new train 
    var newTrain = {
        name: trainName,
        stop: destination,
        time: firstTime,
        frequentness: frequency,
    };

    // uploading to the database
    database.ref().push(newTrain);

    // console log input
    console.log(newTrain.name);
    console.log(newTrain.stop);
    console.log(newTrain.time);
    console.log(newTrain.frequentness);

    alert("New train was added successfully!");

    // clearing the input boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");

}); // for on click

// firebase storage of user input so that we can add to table
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());// testing capture result?

    // database variables?
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().stop;
    var firstTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequentness;

    //logging result
    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    // need to calculate the next arrival and minutes away using moment js

    // variable to convert user's time 
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Making current time so that it can calculate users time to calculate next arrival and minutes away
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Getting the difference  between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // the remainder
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // minutes away

    
    var tMinutes = frequency - tRemainder;
    console.log("MINUTES AWAY: " + tMinutes);

    // Next Arrival
    var nextTrain = moment().add(tMinutes, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));



    // making new row with user input
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTime),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutes),
    );

    // adding new row to table
    $("#train-table").append(newRow);

});