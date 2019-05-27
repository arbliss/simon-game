//colors to be chosen randomly
var buttonColours = ["red", "yellow", "blue", "green"];

var gamePattern = [];

var userClickedPattern = [];

//variable to toggle when the game has started
var started = false;

//variable that tells what level game is on
var level = 0;

//run function above when any key is pressed
$(document).keypress(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//determine which button clicked and push to an array
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //animate button that was userClickedPattern
  animatePress(userChosenColour);
  //play sound for color that was clicked
  playSound(userChosenColour);
  //call function to check answer with level-1 for array index
  checkAnswer(userClickedPattern.length-1);
});

//function to check canswer, currentLevel is level-1
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");
    //check if sequence finished
    if (userClickedPattern.length === gamePattern.length){
      //start next sequence after a delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {

      console.log("wrong");

      //game over actions to take with wrong answer
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      playSound("wrong");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //call function to start over
      startOver();
    }
}

//function to move to the next sequence
function nextSequence() {
  //reset userClickedPattern array
  userClickedPattern = [];
  //increment Level
  level++;
  //update h1 with change in level
  $("#level-title").text("Level " + level);
  //generate random number into a variable
  var randomNumber = Math.floor(Math.random() * 4);
  //use the random number to determine a color
  var randomChosenColour = buttonColours[randomNumber];
  //push that random color into the gamePattern array
  gamePattern.push(randomChosenColour);
  //use the random color to cause the corresponding colored button to flash
  $("#" + randomChosenColour).animate({opacity: 0.25}, 100);
  $("#" + randomChosenColour).animate({opacity: 1.00}, 100);
  //play the mp3 corresponding to the random color
  playSound(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//play corresponding sound mp3 file
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to reset level, gamePattern, and toggle started to false
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
