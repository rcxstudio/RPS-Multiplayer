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

var player1Info;
var player1Choice = '';
var player2Info;
var player2Choice = '';

//CONTROL TEST
console.log('player1Database - before', player1Database.child)

//below checks for disconnections (connections are assumed)
connectedRef.on('value', function(snapshot) {
    if (snapshot.val() != true) {
        console.log('not connected');
        sessionStorage.clear();
        
        //Below only works for player 1: NEED TO MAKE IT SO IT KNOWS PLAYER 1 VS. PLAYER 2 LEAVING
        player1Database.onDisconnect().remove(); //only removes Player1 --> tested it out and it works
        // player2Database.onDisconnect().remove();
        //remove the player as a child of root?
    }
});

// playersParent.on('value', function(snapshot) {
//     console.log(snapshot.val()); //starts as null
//     var mainDB = snapshot.val();


//     }, function(errorObject) {
//         console.log("Errors handled: " + errorObject.code);
//     }
// );

// player1Database.on('value', function(snapshot) {
//     console.log(snapshot.val()); //starts as null
//     var mainDB = snapshot.val();


//     }, function(errorObject) {
//         console.log("Errors handled: " + errorObject.code);
//     }
// );

// player2Database.on('value', function(snapshot) {
//     console.log(snapshot.val()); //starts as null
//     var mainDB = snapshot.val();


//     }, function(errorObject) {
//         console.log("Errors handled: " + errorObject.code);
//     }
// );


//WORK ON HOW TO TURN ON LISTENING FOR A LIST/DIRECTORY!!!!!!!!!!
player1Database.on('value', function(snapshot) {
    var mainDB = snapshot.val();
    sessionStorage.setItem('player1Choice', player1Info.choice);
    sessionStorage.setItem('player2Choice', player2Info.choice);

    console.log('VALUE LISTENER')

    results();

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }
);

player2Database.on('value', function(snapshot) {
    var mainDB = snapshot.val();
    sessionStorage.setItem('player1Choice', player1Info.choice);
    sessionStorage.setItem('player2Choice', player2Info.choice);

    console.log('VALUE LISTENER')

    results();

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }
);

//WORK ON HOW TO TURN ON LISTENING FOR A LIST/DIRECTORY!!!!!!!!!!



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
            ties: player1TieCount,
            choice: player1Choice
        });
    }

    player1Data();
    storingInfo();

    console.log(player1Info);
    console.log(player2Info);
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
            ties: player2TieCount,
            choice: player2Choice
        });
    }

    player2Data();
    storingInfo();

    console.log(player1Info);
    console.log(player2Info);
}

function storingInfo() {
    //player2 information from firebase
    if (player1Toggle === true && player2Toggle === true) {
        sessionStorage.setItem('player1Name', player1Info.name);
        sessionStorage.setItem('player1Wins', player1Info.wins);
        sessionStorage.setItem('player1Losses', player1Info.losses);
        sessionStorage.setItem('player1Ties', player1Info.ties);

        sessionStorage.setItem('player2Name', player2Info.name);
        sessionStorage.setItem('player2Wins', player2Info.wins);
        sessionStorage.setItem('player2Losses', player2Info.losses);
        sessionStorage.setItem('player2Ties', player2Info.ties);
    }

    //player1 information from firebase
    else if (player1Toggle === true) {
        sessionStorage.setItem('player1Name', player1Info.name);
        sessionStorage.setItem('player1Wins', player1Info.wins);
        sessionStorage.setItem('player1Losses', player1Info.losses);
        sessionStorage.setItem('player1Ties', player1Info.ties);
    }
}

function player1DisplayInfo() {
    //player1 name and selection choices displayed
    $('#player1-name-display').text('Player 1: ' + player1Info.name);
    $('#player1-box').append('<p class="player1Choices" data-value="rock">Rock</p>');
    $('#player1-box').append('<p class="player1Choices data-value="paper">Paper</p>');
    $('#player1-box').append('<p class="player1Choices data-value="scissors">Scissors</p>');
}

function player2DisplayInfo() {
    //player2 name and selection choices displayed
    $('#player2-name-display').text('Player 2: ' + player2Info.name);
    $('#player2-box').append('<p class="player2Choices" data-value="rock">Rock</p>');
    $('#player2-box').append('<p class="player2Choices" data-value="paper">Paper</p>');
    $('#player2-box').append('<p class="player2Choices" data-value="scissors">Scissors</p>');
}

$('#add-player').on('click', function(event) {
    event.preventDefault();
    console.log('adding player button clicked');
    $('#player-name-input-wrapper').hide();

    if (player1Toggle === false) {
        addPlayer1();
        player1DisplayInfo();

        $('#player').text(player1Info.name);
        $('#status-line').text('Waiting for Player 2...');

    }

    else if (player1Toggle != false) {
        addPlayer2();
        $('#player1-name-display').text('Player 1: ' + player1Info.name);
        player2DisplayInfo();

        $('#player').text(player2Info.name);
        $('#status-line').text('Ready');
        $('#player-number-statement').text('2');
    }
});

// WORKING ON BELOW CODE NEED TO COORDINATE AND WORK ON VARIABLES AND WIN/LOSS/TIE COUNTS
function results() {
    var player1ChoiceCompare = sessionStorage.getItem('player1Choice');
    var player2ChoiceCompare = sessionStorage.getItem('player2Choice');

    console.log('player1ChoiceCompare', player1ChoiceCompare);
    console.log('player2ChoiceCompare', player2ChoiceCompare);

    if ((player1ChoiceCompare != '') && (player2ChoiceCompare != '')) {
        var player1Win = $('#results-box').html('<p>' + player1Info.name + ' wins with ' + player1Choice + '</p>');
        var player2Win = $('#results-box').html('<p>' + player2Info.name + ' wins with ' + player2Choice + '</p>');
        var playerTie = $('#results-box').html('<p>You tied with ' + player2Choice + '</p>');

        // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
        if ((player1ChoiceCompare === "Rock") && (player2ChoiceCompare === "Scissors")) {
            // player 1 wins
            player1Win;
        }
        else if ((player1ChoiceCompare === "Rock") && (player2ChoiceCompare === "Paper")) {
            // player 2 wins
            player2Win;
        }
        else if ((player1ChoiceCompare === "Scissors") && (player2ChoiceCompare === "Rock")) {
            // player 2 wins;
            player2Win;
        }
        else if ((player1ChoiceCompare === "Scissors") && (player2ChoiceCompare === "Paper")) {
            // player 1 wins;
            player1Win;
        }
        else if ((player1ChoiceCompare === "Paper") && (player2ChoiceCompare === "Rock")) {
            // player 1 wins;
            player1Win;
        }
        else if ((player1ChoiceCompare === "Paper") && (player2ChoiceCompare === "Scissors")) {
            // player 2 wins;
            player2Win;
        }
        // else if (player1ChoiceCompare === player2ChoiceCompare) {
        //     // 'tie!';
        //     playerTie;
        // }

        // player1Choice = '';
        // player2Choice = '';

        // sessionStorage.setItem('player1Choice', player1Choice);
        // sessionStorage.setItem('player2Choice', player2Choice);

    }

    else if((player1Choice != '') && (player2Choice === '')){
        $('#results-box').html('<p>Waiting for ' + player2Info.name + ' to choose.</p>');
    }

    else if((player1Choice === '') && (player2Choice != '')){
        $('#results-box').html('<p>Waiting for ' + player1Info.name + ' to choose.</p>');
    }
}

//WORKING ON ABOVE CODE






// FIX CLICK SELECTIONS-----------------
$(document).on('click', '.player1Choices', function(event) {
    console.log('clicked');
    player1Choice = $(this).text();
    console.log(player1Choice);

    player1Database.update({
        choice: player1Choice
    });
    
    sessionStorage.setItem('player1Choice', player1Info.choice);
    sessionStorage.setItem('player2Choice', player2Info.choice);
});

$(document).on('click', '.player2Choices', function(event) {
    console.log('clicked');
    player2Choice = $(this).text();
    console.log(player2Choice);

    player2Database.update({
        choice: player2Choice
    });
    
    sessionStorage.setItem('player2Choice', player2Info.choice);
    sessionStorage.setItem('player2Choice', player2Info.choice);
});
// FIX CLICK SELECTIONS-----------------




//watches for any change at all. If time allows, go back to be more selective on what to watch.
database.ref().on('value', function(snapshot) {
    // Log everything that's coming out of snapshot

    //WAYS TO REFER TO FIREBASE DATA ---KEEPING FOR REFERENCE IN FUTURE
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

    // WORK IN PROGRESS SAVING - START
    // else if (player2Presence === 'player2') {
    //     player1Toggle = true;
    //     player1Info = (Object.values(snapshot.val())[0]).player1;
    //     console.log('snapshot of player1', (Object.values(snapshot.val())[0]).player2);
    //     console.log(player2Info);
    // }
    // WORK IN PROGRESS SAVING - END

    // else if (snapshat.val() === null) {
    //     player1Presence = false;
    //     player2Presence = false;
    // }
    // Handle the errors

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    }
);






//BELOW USED FOR REFERENCE AND AS A CATCHALL FOR THOUGHTS

// database.ref().on('child_added', function(snapshot) {
//   // if () {

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