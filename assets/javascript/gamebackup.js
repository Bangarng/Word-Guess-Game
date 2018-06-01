//the game will automatically choose a character from a character word bank
//the user will type letters to try and guess the word
//letter pressed will show, and if it's a correct letter it will appear on the _ _ _ _ blanks
//if they get it right, they will get a Win + 1

//characters for the computer to pick
'use strict';

var xmenCharacters = ["cyclops", "wolverine", "cable", "juggernaut", "nightcrawler", "magneto", "professor-x", "beast", "deadpool", "gambit"];
var maxTries = 10;
var guessesLeft = 0;
var computerPick;     //What the computer picks
var computerPickLength;
var hangmanWord = []; //this is the hidden word.
var wins = 0;
var userGuess = [];
var finishedGame = false;        // Flag for 'press any key to try again'     

// Game sounds
var keySound = new Audio('./assets/sounds/typewriter-key.wav');

// Reset the game
function resetGame() {
    guessesLeft = maxTries;

    //the computer pick an character picks a character
    var computerPick = xmenCharacters[Math.floor(Math.random() * xmenCharacters.length)];
    var computerPickLength = computerPick.length;
    //alert(computerPick);
    //alert(computerPick.length);

    // Clear out arrays
    userGuess = [];
    hangmanWord = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < computerPickLength; i++) {
        hangmanWord.push("_");
    }   

    //make blanks for the answer
    /*for (var i = 0; i < computerPick.length; i++) {
        for (var i = 0; i < computerPick.length; i++) {
            var answer = [];
            answer = "_ ";   
        }
    }  
    //print the word blanks
    for (var i = 0; i < computerPick.length; i++) {
        var grabAnswerDiv = $("#currentWord");
        var printAnswertoDiv = document.createTextNode(answer);
        grabAnswerDiv.append(printAnswertoDiv);    
    }    */

    if(computerPick == xmenCharacters[0]) {
        $('.clue').html("<img src='assets/images/cyclops.jpg' width='300'/>");
    }else if(computerPick == xmenCharacters[1]) {
        $('.clue').html("<img src='assets/images/wolverine.jpg' width='300'/>");
    }else if(computerPick == xmenCharacters[2]) {
        $('.clue').html("<img src='assets/images/cable.jpg' width='300'/>");
    }else if(computerPick == xmenCharacters[3]) {
        $('.clue').html("<img src='assets/images/juggernaut.jpg' width='300'/>");
    }else if(computerPick == xmenCharacters[4]) {
        $('.clue').html("<img src='assets/images/nightcrawler.jpg' width='300'/>");  
    }else if(computerPick == xmenCharacters[5]) {
        $('.clue').html("<img src='assets/images/magneto.jpg' width='300'/>");  
    }else if(computerPick == xmenCharacters[6]) {
        $('.clue').html("<img src='assets/images/professorx.jpg' width='300'/>");  
    }else if(computerPick == xmenCharacters[7]) {
        $('.clue').html("<img src='assets/images/beast.jpg' width='300'/>");  
    }else if(computerPick == xmenCharacters[8]) {
        $('.clue').html("<img src='assets/images/deadpool.jpg' width='300'/>");       
    }else if(computerPick == xmenCharacters[9]) {
        $('.clue').html("<img src='assets/images/gambit.jpg' width='300'/>");                                
    }else($('.clue').text('neither of these')); 

    // Hide game over and win images/text
    $("#pressKeyTryAgain").css("display", "none");
    $("#gameover-image").css("display", "none");
    $("#youwin-image").css("display", "none");

    //Update the Interface
    updateDisplay();
}

//  Updates the display on the HTML Page
function updateDisplay() {

    $("#gameWins").text(wins);
    // Display the letters guessed so far
    var hangmanWordText = "";
    for (var i = 0; i < hangmanWord.length; i++) {
        hangmanWordText += hangmanWord[i];
    }
    //update hangman words, guesses left, and guessed letters
    $("#currentWord").text(hangmanWordText);
    $("#guessesLeft").text(guessesLeft);
    $("#myGuesses").text(userGuess);
}

// This function takes a letter and finds all instances of 
// it in the string replaces them with the blanks.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var charPositions = [];
    // Loop through word finding all instances of guessed letter and save it to the array.
    for (var i = 0; i < computerPickLength; i++) {
        if(computerPick[i] === letter) {
            charPositions.push(i);
        }
    }
    // if you picked the wrong letter, update guesses left
    if (charPositions.length <= 0) {
        guessesLeft--;
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var j = 0; j < charPositions.length; j++) {
            hangmanWord[charPositions[j]] = letter;
        }
    }
}

// Checks for a win by seeing if there are any remaining underscores in the hangman word we are building.
function checkWin() {
    if(hangmanWord.indexOf("_") === -1) {
        $(".hangTitle").css("display", "none");        
        $("#youwin-image").css("display", "block");
        $("#pressKeyTryAgain").css("display", "block");
        wins++;
        finishedGame = true;
    }
};

// Checks for a loss
function checkLoss()
{
    if(guessesLeft <= 0) {
        $(".hangTitle").css("display", "none");        
        $("#gameover-image").css("display", "block");
        $("#pressKeyTryAgain").css("display", "block");
        finishedGame = true;
    }
}
// Makes a guess
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure we didn't use this letter yet
        if (userGuess.indexOf(letter) === -1) {
            userGuess.push(letter);
            evaluateGuess(letter);
        }
    }
}
// Event listener
document.onkeydown = function(event) {
    // If we finished a game, dump one keystroke and reset.
    if(finishedGame) {
        resetGame();
        finishedGame = false;
    } else {
        // Check to make sure a-z was pressed.
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};
