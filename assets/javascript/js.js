// $("#train-form-submit").on("click", function(){
//     event.preventDefault()
//     alert("clicked")
// })

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
})

