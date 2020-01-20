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




//Initial variables
var trainName = ""
var dest = ""
var firstTrain = ""
var freq = ""

//event listener on submit
$("#train-form-submit").on("click", function (){
    
    //Store input val into var
    var trainName = $("#train-name").val().trim()
    var dest = $("#dest").val().trim()
    var firstTrain = $("#first-train").val().trim()
    var freq = $("#freq").val().trim()

    console.log(trainName, dest, firstTrain, freq)

    database.ref("/trainData").push({
        trainName: trainName,
        dest: dest,
        firstTrain: firstTrain,
        freq: freq

      });
})

database.ref("/trains").on("child_added", function(snapshot) {
    snap = snapshot.val();


    $("#train-table").find('tbody')
    .append($('<tr>')
        .append($('<td>')
            
                .text(trainName)
            )
        )
    
})