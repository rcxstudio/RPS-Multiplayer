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
var player1choice;

var player2;
var player2choice;

// Capture Button Click
$('#add-player').on('click', function(event) {
    event.preventDefault();
    // console.log('clicked');
    // Grabbed values from text-boxes

    //is the below line of code possible? NEED TO FIND HOW TO GET VALUE FROM FIRBASE TO PUT INTO THE VARIABLES
    if ((player1 === undefined && player2 === undefined) || (player1 === undefined && player2 != undefined)) {
        player1 = $("#player-name-input").val().trim();
        console.log('player1', player1);
        // comment = $("#comment-input").val().trim();

        // Code for "Setting values in the database" --- MAYBE SET IN SESSION STORAGE SO IT STAYS ON?
        player1data.set({
            playerName: player1,
            //comment: 
        });

        $('#player1-name-display').text('Player 1: ' + player1);
        $('#player1-box').append('<p class="player1choices">Rock</p>');
        $('#player1-box').append('<p class="player1choices">Paper</p>');
        $('#player1-box').append('<p class="player1choices">Scissors</p>');
    }

    //MIGHT HAVE AN ISSUE WITH LINE BELOW---RELOAD OF PAGE ALWAYS MAKES THIS UNDEFINED
    else if (player1 != undefined && player2 === undefined) {
        player2 = $("#player-name-input").val().trim();
        console.log('player2', player2);

        // Code for "Setting values in the database"
        player2data.set({
            playerName: player2,
            //comment: 
        });

        $('#player2-name-display').text('Player 2: ' + player2);
        $('#player2-box').append('<p class="player2choices">Rock</p>');
        $('#player2-box').append('<p class="player2choices">Paper</p>');
        $('#player2-box').append('<p class="player2choices">Scissors</p>');
    }

});

$(document).on('click', '.player1choices', function(event) {
    // console.log('clicked');
    player1choice = $(this).text();
    // console.log(player1choice);
    results();

});

$(document).on('click', '.player2choices', function(event) {
    // console.log('clicked');
    player2choice = $(this).text();
    // console.log(player2choice);
    results();
});



database.ref().on('child_added', function(snapshot) {
  // if () {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().playerName);
      // console.log(snapshot.val(player1Name));

      // Change the HTML to reflect player leaving (Store playername in sessions)
      // $("#name-display").html(snapshot.val().name);
  // }
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});

database.ref().on('child_removed', function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().playerName);

      // Change the HTML to reflect player leaving (Store playername in sessions)
      // $("#name-display").html(snapshot.val().name);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});

function results() {

    if ((player1choice != undefined) && (player2choice != undefined)) {
        var player1win = $('#results-box').html('<p>' + player1 + ' wins with ' + player1choice + '</p>');
        var player2win = $('#results-box').html('<p>' + player2 + ' wins with ' + player2choice + '</p>');
        var playerTie = $('#results-box').html('<p>You tied with ' + player2choice + '</p>');

        console.log('player1choice - before', player1choice);
        console.log('player2choice - before', player2choice);
        // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
        if ((player1choice === "Rock") && (player2choice === "Scissors")) {
            // player 1 wins
            player1win;
        }
        else if ((player1choice === "Rock") && (player2choice === "Paper")) {
            // player 2 wins
            player2win;
        }
        else if ((player1choice === "Scissors") && (player2choice === "Rock")) {
            // player 2 wins;
            player2win;
        }
        else if ((player1choice === "Scissors") && (player2choice === "Paper")) {
            // player 1 wins;
            player1win;
        }
        else if ((player1choice === "Paper") && (player2choice === "Rock")) {
            // player 1 wins;
            player1win;
        }
        else if ((player1choice === "Paper") && (player2choice === "Scissors")) {
            // player 2 wins;
            player2win;
        }
        else if (player1choice === player2choice) {
            // 'tie!';
            playerTie;
        }

        playerChoiceClear();
        console.log('player1choice - after', player1choice);
        console.log('player2choice - after', player2choice);
    }

    else if((player1choice != undefined) && (player2choice === undefined)){
        $('#results-box').html('<p>Waiting for ' + player2 + ' to choose.</p>');
    }

    else if((player1choice === undefined) && (player2choice != undefined)){
        $('#results-box').html('<p>Waiting for ' + player1 + ' to choose.</p>');
    }
}

function playerChoiceClear() {
    player1choice = undefined;
    player2choice = undefined;
}

  // // Here we create the HTML that will be injected into our div and displayed on the page.
  // var html = "<p>Press r, p or s to start playing!</p>" +
  // "<p>wins: " + wins + "</p>" +
  // "<p>losses: " + losses + "</p>" +
  // "<p>ties: " + ties + "</p>";

  // // Injecting the HTML we just created into our div and updating the game information on our page.
  // document.querySelector("#game").innerHTML = html;




// //FIX THE CODE BELOW

// // Our array of possible computer choices.
// var computerChoices = ["r", "p", "s"];

// // Variables for tracking our wins, losses and ties. They begin at 0.
// var wins = 0;
// var losses = 0;
// var ties = 0;


