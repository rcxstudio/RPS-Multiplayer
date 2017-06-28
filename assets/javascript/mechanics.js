// Initialize Firebase
var config = {
	apiKey: "AIzaSyCO0APye8L4Bce2-PiG9aCUu2FRt2ikS1w",
	authDomain: "rps-homework.firebaseapp.com",
	databaseURL: "https://rps-homework.firebaseio.com",
	projectId: "rps-homework",
	storageBucket: "rps-homework.appspot.com",
	messagingSenderId: "151540006241"
};

firebase.initializeApp(config);

// WORKING CODE BELOW

var database = firebase.database();
var player1data = database.ref('/player1');
var player2data = database.ref('/player2');
// var results = database.ref('results');
var player1;
var player2;

// Capture Button Click
$('#add-player').on('click', function(event) {
    event.preventDefault();
    // console.log('clicked');
    // Grabbed values from text-boxes

    if (player1 === undefined) {
        player1 = $("#player-name-input").val().trim();
        console.log('player1', player1);
        // comment = $("#comment-input").val().trim();

        // Code for "Setting values in the database"
        player1data.set({
            playerName: player1,
            //comment: 
        });

        $('#player1-name-display').text('Player 1: ' + player1);
    }

    else if (player1 != undefined) {
        player2 = $("#player-name-input").val().trim();
        console.log('player2', player2);

        // Code for "Setting values in the database"
        player2data.set({
            playerName: player2,
            //comment: 
        });

        $('#player2-name-display').text('Player 2: ' + player2);
    }
});

database.ref().on('child_added', function(snapshot) {
  // if () {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      // console.log(snapshot.val(player1Name));

      // Change the HTML to reflect
      // $("#name-display").html(snapshot.val().name);
      // $("#email-display").html(snapshot.val().email);
      // $("#age-display").html(snapshot.val().age);
      // $("#comment-display").html(snapshot.val().comment);
  // }
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});

database.ref('/players').on('child_removed', function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().email);
      console.log(snapshot.val().age);
      console.log(snapshot.val().comment);

      // Change the HTML to reflect
      $("#name-display").html(snapshot.val().name);
      $("#email-display").html(snapshot.val().email);
      $("#age-display").html(snapshot.val().age);
      $("#comment-display").html(snapshot.val().comment);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});













// function writeUserData(userId, choice) {
//   database.ref('players/' + userId).set({
//     username: userId,
//     choice:
//   });
// }


















// WORKING CODE ABOVE


// //FIX THE CODE BELOW

// // Our array of possible computer choices.
// var computerChoices = ["r", "p", "s"];

// // Variables for tracking our wins, losses and ties. They begin at 0.
// var wins = 0;
// var losses = 0;
// var ties = 0;

// // When the user presses a key, it will run the following function...
// document.onkeyup = function(event) {

// // Determine which key was pressed
// var userGuess = event.key;

// // Sets the computerGuess variable equal to a random choice from the computerChoice array.
// var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length )];

// // If the user presses "r" or "p" or "s", run the game logic.
// if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

//   // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
//   if ((userGuess === "r") && (computerGuess === "s")) {
//     wins++;
//   }
//   else if ((userGuess === "r") && (computerGuess === "p")) {
//     losses++;
//   }
//   else if ((userGuess === "s") && (computerGuess === "r")) {
//     losses++;
//   }
//   else if ((userGuess === "s") && (computerGuess === "p")) {
//     wins++;
//   }
//   else if ((userGuess === "p") && (computerGuess === "r")) {
//     wins++;
//   }
//   else if ((userGuess === "p") && (computerGuess === "s")) {
//     losses++;
//   }
//   else if (userGuess === computerGuess) {
//     ties++;
//   }

//   // Here we create the HTML that will be injected into our div and displayed on the page.
//   var html = "<p>Press r, p or s to start playing!</p>" +
//   "<p>wins: " + wins + "</p>" +
//   "<p>losses: " + losses + "</p>" +
//   "<p>ties: " + ties + "</p>";

//   // Injecting the HTML we just created into our div and updating the game information on our page.
//   document.querySelector("#game").innerHTML = html;

// }
// };

