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
var database = firebase.database(); //root

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

var connectedRef = firebase.database().ref('.info/connected'); //default area that tests for connections
//my firebase paths
var playersParent = database.ref('players');
var player1Database = database.ref('players/player1');
var player2Database = database.ref('players/player2');

var player1Toggle = false;
var player2Toggle = false;

var player1Stats;
var player2Stats;

//CONTROL TEST
console.log('player1Database - before', player1Database.child)

//below checks for disconnections (connections are assumed)
connectedRef.on('value', function(snapshot) {
    if (snapshot.val() != true) {
        console.log('not connected');
        sessionStorage.clear();
        
        //Below only works for player 1: NEED TO MAKE IT SO IT KNOWS PLAYER 1 VS. PLAYER 2 LEAVING
        player1Database.onDisconnect().remove(); //only removes Player1 --> tested it out and it works
        //remove the player as a child of root
    }
});


// FUNCTIONS -------------
function addPlayer1(player1Name) {
    function player1Data(name, wins, losses, ties) {
        var player1 = $("#player-name-input").val().trim();
        var player1WinCount = 0;
        var player1LossCount = 0;
        var player1TieCount = 0;

        player1Database.set({
            name: player1,
            wins: player1WinCount,
            losses: player1LossCount,
            ties: player1TieCount
        });

        // ADD SESSION STORAGE BELOW
        // sessionStorage.setItem('player1Name', player1Database.)
    }

    player1Data();
    console.log(player1Info.name);
    
    sessionStorage.setItem('player1Name',player1Database.name)

}

function addPlayer2(player2Name) {
    function player2Data(name, wins, losses, ties) {
        var player2 = $("#player-name-input").val().trim();
        var player2WinCount = 0;
        var player2LossCount = 0;
        var player2TieCount = 0;

        player2Database.set({
            name: player2,
            wins: player2WinCount,
            losses: player2LossCount,
            ties: player2TieCount
        });
    }

    player2Data();
}

$('#add-player').on('click', function(event) {
    event.preventDefault();
    console.log('adding player button clicked');

    // add user 1 if snapashot.val() === null
    if (player1Toggle === false) {
        addPlayer1();
    }

    else if (player1Toggle != false) {
        addPlayer2();
    }
});

//watches for any change at all
database.ref().on('value', function(snapshot) {
    // Log everything that's coming out of snapshot
    console.log(snapshot.val()); //starts as null
    console.log('is snapshot.val() equal to null', snapshot.val() === null);
    console.log('snapshot not false', snapshot.val() != null);
    console.log('snapshot of player', Object.keys(snapshot.val())[0]);
    console.log('snapshot of player1', (Object.values(snapshot.val())[0]).player1);
    console.log('snapshot of player1', (Object.keys(Object.values(snapshot.val())[0]))[0] === 'player1');
    console.log('snapshot of player2', (Object.keys(Object.values(snapshot.val())[0]))[1] === 'player2');
    console.log('snapshot of player1', (Object.values(snapshot.val())[0]).player1.name);
    
    var player1Presence = (Object.keys(Object.values(snapshot.val())[0]))[0];
    var player2Presence = (Object.keys(Object.values(snapshot.val())[0]))[1];

    if (player1Presence === 'player1') {
        player1Toggle = true;
        player1Info = (Object.values(snapshot.val())[0]).player1;

        if (player2Presence === 'player2') {
            player2Toggle = true;
            player2Info = (Object.values(snapshot.val())[0]).player2;
            console.log('snapshot of player1', (Object.values(snapshot.val())[0]).player2);
            console.log(player2Info);

        }
        console.log(player1Toggle);
        console.log(player2Toggle);
    }

    // else if (snapshat.val() === null) {
    //     player1Presence = false;
    //     player2Presence = false;
    // }
    // Handle the errors
    }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    }
);








// // Capture Button Click
// $('#add-player').on('click', function(event) {
//     event.preventDefault();
//     // console.log('clicked');
//     // Grabbed values from text-boxes
    
//     if (playersDatabase.child != 'player1') {
        
//     }

//     else if (player1Database.key === 'player1' && player2Database.key != 'player2') {
//         var player2 = $("#player-name-input").val().trim();
//         var player2WinCount = 0;
//         var player2LossCount = 0;
//         var player2TieCount = 0;

//         function player2data(name, wins, losses, ties) {
//             player2database.set({
//                 name: player2,
//                 wins: player2WinCount,
//                 losses: player2LossCount,
//                 ties: player2TieCount
//             });

//             // sessionStorage.setItem('name', player2);
//             // sessionStorage.setItem('wins', player2WinCount);
//             // sessionStorage.setItem('losses', player2LossCount);
//             // sessionStorage.setItem('ties', player2TieCount);
//             console.log('player2 conditional');
//         }

//         player2data();
//         console.log('playersdatabase.child - after', player2database.child)
//     }
// });






//FIREBASE SNAPSHOTS
//below checks for disconnections
// connectedRef.on("value", function(snapshot) {
//     if (snapshot.val() != true) {
//         console.log('not connected');
//         sessionStorage.clear();
//         //remove the player as a child of root
//     }
// });

// database.ref().on('child_added', function(snapshot) {
//     if snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
//     var firstName = snapshot.child("name/first").val(); // "Ada"
//     var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
//     var age = snapshot.child("age").val(); // null
//     });













//     if ((player1 === undefined && player2 === undefined) || (player1 === undefined && player2 != undefined)) {
//         player1 = $("#player-name-input").val().trim();
//         //console.log('player1', player1);
//         // comment = $("#comment-input").val().trim();

//         // Code for "Setting values in the database" --- MAYBE SET IN SESSION STORAGE SO IT STAYS ON?
//         player1data.set({
//             playerName: player1,
//             //comment: 
//         });

//         $('#player1-name-display').text('Player 1: ' + player1);
//         $('#player1-box').append('<p class="player1choices">Rock</p>');
//         $('#player1-box').append('<p class="player1choices">Paper</p>');
//         $('#player1-box').append('<p class="player1choices">Scissors</p>');
//     }

//     //MIGHT HAVE AN ISSUE WITH LINE BELOW---RELOAD OF PAGE ALWAYS MAKES THIS UNDEFINED
//     else if (player1 != undefined && player2 === undefined) {
//         player2 = $("#player-name-input").val().trim();
//         //console.log('player2', player2);

//         // Code for "Setting values in the database"
//         player2data.set({
//             playerName: player2,
//             //comment: 
//         });

//         $('#player2-name-display').text('Player 2: ' + player2);
//         $('#player2-box').append('<p class="player2choices">Rock</p>');
//         $('#player2-box').append('<p class="player2choices">Paper</p>');
//         $('#player2-box').append('<p class="player2choices">Scissors</p>');
//     }

//     console.log('player1data - after click', player1data.key.playerName);

// });

// $(document).on('click', '.player1choices', function(event) {
//     // console.log('clicked');
//     player1choice = $(this).text();
//     // console.log(player1choice);
//     results();

// });

// $(document).on('click', '.player2choices', function(event) {
//     // console.log('clicked');
//     player2choice = $(this).text();
//     // console.log(player2choice);
//     results();
// });


// database.ref().on('child_added', function(snapshot) {
//   // if () {

//       // Log everything that's coming out of snapshot
//       console.log(snapshot.val());
//       console.log(snapshot.val().playerName);
//       // console.log(snapshot.val(player1Name));

//       // Change the HTML to reflect player leaving (Store playername in sessions)
//       // $("#name-display").html(snapshot.val().name);
//   // }





//     // Handle the errors
//     }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
// });

// database.ref().on('child_removed', function(snapshot) {

//       // Log everything that's coming out of snapshot
//       console.log(snapshot.val());
//       console.log(snapshot.val().playerName);

//       // Change the HTML to reflect player leaving (Store playername in sessions)
//       // $("#name-display").html(snapshot.val().name);

//       // Handle the errors
//     }, function(errorObject) {
//       console.log("Errors handled: " + errorObject.code);
// });

// function results() {

//     if ((player1choice != undefined) && (player2choice != undefined)) {
//         var player1win = $('#results-box').html('<p>' + player1 + ' wins with ' + player1choice + '</p>');
//         var player2win = $('#results-box').html('<p>' + player2 + ' wins with ' + player2choice + '</p>');
//         var playerTie = $('#results-box').html('<p>You tied with ' + player2choice + '</p>');

//         console.log('player1choice - before', player1choice);
//         console.log('player2choice - before', player2choice);
//         // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
//         if ((player1choice === "Rock") && (player2choice === "Scissors")) {
//             // player 1 wins
//             player1win;
//         }
//         else if ((player1choice === "Rock") && (player2choice === "Paper")) {
//             // player 2 wins
//             player2win;
//         }
//         else if ((player1choice === "Scissors") && (player2choice === "Rock")) {
//             // player 2 wins;
//             player2win;
//         }
//         else if ((player1choice === "Scissors") && (player2choice === "Paper")) {
//             // player 1 wins;
//             player1win;
//         }
//         else if ((player1choice === "Paper") && (player2choice === "Rock")) {
//             // player 1 wins;
//             player1win;
//         }
//         else if ((player1choice === "Paper") && (player2choice === "Scissors")) {
//             // player 2 wins;
//             player2win;
//         }
//         else if (player1choice === player2choice) {
//             // 'tie!';
//             playerTie;
//         }

//         playerChoiceClear();
//         console.log('player1choice - after', player1choice);
//         console.log('player2choice - after', player2choice);
//     }

//     else if((player1choice != undefined) && (player2choice === undefined)){
//         $('#results-box').html('<p>Waiting for ' + player2 + ' to choose.</p>');
//     }

//     else if((player1choice === undefined) && (player2choice != undefined)){
//         $('#results-box').html('<p>Waiting for ' + player1 + ' to choose.</p>');
//     }
// }

// function playerChoiceClear() {
//     player1choice = undefined;
//     player2choice = undefined;
// }