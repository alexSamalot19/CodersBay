// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)


var config = {
  apiKey: "AIzaSyBuh3bn1X9StgphhVQ898QfRi8XHnqSW30",
  authDomain: "alexfsf-7b2e5.firebaseapp.com",
  databaseURL: "https://alexfsf-7b2e5.firebaseio.com",
  projectId: "alexfsf-7b2e5",
  storageBucket: "",
  messagingSenderId: "173416667834",
  appId: "1:173416667834:web:6d81140d15670304844083"
};

firebase.initializeApp(config);



// Make sure that your configuration matches your firebase script version
// (Ex. 3.0 != 3.7.1)

// Create a variable to reference the database
// var database = ...
var database = firebase.database();
var path = "CodeBay/"

// Assign the reference to the database to a variable named 'database'
// var database = ...


// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref(path).on("value", function (snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    // Set the variables for highBidder/highPrice equal to the stored values in firebase.
    console.log(snapshot);
    // highPrice = ...
    highPrice = snapshot.val().highPrice;
    // highBidder = ...
    highBidder = snapshot.val().highBidder;


    // Change the HTML to reflect the stored values
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);

    // Print the data to the console.
    console.log(highPrice);
    console.log(highBidder);

  }

  // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
  else {

    // Change the HTML to reflect the initial values
    $("#highest-bidder").text(initialBidder);
    $("#highest-price").text(initialBidder);

    // Print the data to the console.
    console.log(initialBid);
    console.log(initialBidder);

  }


  // If any errors are experienced, log them to console.
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// // --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit-bid").on("click", function (event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var bidderName = $("#bidder-name").val();
  var bidderPrice = $("#bidder-price").val();
  // var bidderPrice = $("#bidder-price").val();

  // Log the Bidder and Price (Even if not the highest)
 
  console.log("new bet:" + bidderPrice);

  console.log("old:"+initialBid);
  console.log(initialBidder);

  //Set condition of a higher bid
  if (bidderPrice > initialBid) {

    // Alert
    alert("You are now the highest bidder.");

    // Save the new price in Firebase
    database.ref().set({
      CodeBay: bidderPrice
    });

    // Log the new High Price
    console.log(highPrice);

    // Store the new high price and bidder name as a local variable
    initialBidder = bidderName;
    initialBid = bidderPrice;


    // Change the HTML to reflect the new high price and bidder
    $("#highest-bidder").text(initialBidder);
    $("#highest-price").text(initialBid);

  } else {
    // Alert
    alert("Sorry that bid is too low. Try again.");
  }

});


//https://console.firebase.google.com/u/0/project/alexfsf-7b2e5/database/alexfsf-7b2e5/data/
// need to use the gui to make previous exercise dbase

//could figure out how many people are connected and deploy fire base project
//same as github publish, could have sa