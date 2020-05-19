// $("#train-form-submit").on("click", function(){
//     event.preventDefault()
//     alert("clicked")
// })


//firebase
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCdjP7RtHQZdCEa7enXUGYo4fePqz3qVRE",
    authDomain: "ucb-test-0108.firebaseapp.com",
    databaseURL: "https://ucb-test-0108.firebaseio.com",
    projectId: "ucb-test-0108",
    storageBucket: "ucb-test-0108.appspot.com",
    messagingSenderId: "701153986774",
    appId: "1:701153986774:web:0cf9dcf806202f5a7c2177",
    measurementId: "G-2N1TNKELQ0"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase ref as var
var database = firebase.database();

//Run Time  
setInterval(function(startTime) {
  $("#timer").html(moment().format('hh:mm a'))
}, 1000);

// Capture Button Click
$("#add-train").on("click", function() {
  // Don't refresh the page!
  event.preventDefault();

  // Code in the logic for storing and retrieving the most recent train information
  var train = $("#trainname-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var firstTime = $("#firsttime-input").val().trim();
  
  
  var trainInfo = { 
    formtrain: train,
    formdestination: destination,
    formfrequency: frequency,
    formfirsttime: firstTime,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  };
    //this is added so we can get most resent user so we can get most recent user to brower and to do this we need to change the listener  
  database.ref().push(trainInfo);

  console.log(trainInfo.formtrain);
  console.log(trainInfo.formdestination);
  console.log(trainInfo.formfrequency);
  console.log(trainInfo.formfirsttime);
  console.log(trainInfo.dateAdded);

 

  // Clears all of the text-boxes
  $("#trainname-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#firsttime-input").val("");

});


// Firebase watcher + initial loader 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {  
  var train = childSnapshot.val().formtrain;
  var destination = childSnapshot.val().formdestination;
  var frequency = childSnapshot.val().formfrequency;
  var firstTime = childSnapshot.val().formfirsttime;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  //determine Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));

  //get timer functioning
  $("#timer").text(currentTime.format("hh:mm a"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log("Remainder: " + tRemainder);

  //determine Minutes Away
  var minutesAway = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesAway);

  //determine Next Train Arrival
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
  console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm a"));

  
 
  $("#train-table > tbody").append("<tr><td>" + '<button class="btn btn-primary deleteSch">Delete</button>' + "</td><td>" + train + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

  // var t = setTimeout(startTime, 500);

// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});


//on click for deleting row 
$("#train-table").on("click", ".deleteSch", function (event) {
  event.preventDefault();

  var trainNum = $(this)[0].parentNode.parentNode.cells[1].innerHTML
  removeTrainSchedule(trainNum)
  $(this)[0].parentNode.parentNode.remove()
alert("clcil")

  //update databse and remove train

})

// Update minutes away by triggering change in firebase children
function timeUpdater() {
  //empty tbody before appending new information
  $("#train-table > tbody").empty();
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {  
  var train = childSnapshot.val().formtrain;
  var destination = childSnapshot.val().formdestination;
  var frequency = childSnapshot.val().formfrequency;
  var firstTime = childSnapshot.val().formfirsttime;

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));
  $("#timer").text(currentTime.format("hh:mm a"));
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log("Remainder: " + tRemainder);

  //determine Minutes Away
  var minutesAway = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesAway);

  //determine Next Train Arrival
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
  console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm a"));


  //add new table row
  //add new train information into row
  // Add each train's data into the table row
  $("#train-table > tbody").append("<tr><td>" + '<i class="fa fa-trash" aria-hidden="true"></i>' + "</td><td>" + train + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

  })
};

setInterval(timeUpdater, 6000);

// Create Error Handling

// function(errorObject) {
// console.log("The read failed: " + errorObject.code);
// }

/////////////////////////////////////////////////////////////////////////////
// //Initial variables
// var trainName = ""
// var dest = ""
// var firstTrain = ""
// var freq = ""

// //event listener on submit
// $("#train-form-submit").on("click", function (){
    
//     //Store input val into var
//     var trainName = $("#train-name").val().trim()
//     var dest = $("#dest").val().trim()
//     var firstTrain = $("#first-train").val().trim()
//     var freq = $("#freq").val().trim()

//     console.log(trainName, dest, firstTrain, freq)

//     database.ref("/trainData").push({
//         trainName: trainName,
//         dest: dest,
//         firstTrain: firstTrain,
//         freq: freq

//       });
// })

// database.ref("/trains").on("child_added", function(snapshot) {
//     snap = snapshot.val();


//     $("#train-table").find('tbody')
//     .append($('<tr>')
//         .append($('<td>')
            
//                 .text(trainName)
//             )
//         )
    
// })