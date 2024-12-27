var buttonColors = ["red", "blue", "green", "yellow"]

var level = 0;

var started = false;

var gamePattern = [];

var userClickedPattern = [];

var timeLeft = 10; // Adjust as needed

$(document).keypress (function(){
    if (!started){
        $("#level-title").text("level " + level);
        nextSequence();
        startTimer();
        started = true;
    }
});

function nextSequence(){
    timeLeft = 10
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * buttonColors.length);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

$(".btn").click(function(){
    
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentKey) {
    
    var activeButton = $("#" + currentKey)
    
    activeButton.addClass("pressed");
    setTimeout(function(){
        activeButton.removeClass("pressed");
    }, 100);
}

function playSound(name) {

    var chosenColorSound = new Audio("sounds/" + name + ".mp3");
    chosenColorSound.play();
    }


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] && timeLeft > 0) {

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }


    }
    else {
        youLose(startOver());
}
}

function youLose(){
    
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    if(timeLeft===-1){
        $("#level-title").text("Game Over, Press Any Key to Restart");

    }

    else{
        timeLeft = 0
        $("#level-title").text("Game Over, Press any Key to Restart ");

        
    }
}

function startOver(){
    started = false
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    timeLeft = 10
    
}
function startTimer(timer) {
    
    timer = setInterval(function() {
        $("#timer").text(timeLeft);
        timeLeft--;
        if(timeLeft === -1) {
            youLose();
            clearInterval(timer);
            startOver();
        }
    }, 1000);
    
  }


// function levelFive(){
//     if (level === 5){
//     gamePattern = [];
//     userClickedPattern = [];
//     timeLeft = 7
//     }
//     else{
//     timeLeft = 7
//     }
// }

// function levelTen(){
//     if (level === 10){
//     gamePattern = [];
//     userClickedPattern = [];
//     timeLeft = 5
// }
// else{
//     timeLeft = 5
// }
// }

// function levelTwenty(){
//     if (level === 20){
//         gamePattern = [];
//         userClickedPattern = [];
//         timeLeft = 3
//     }
//     else{
//         timeLeft = 3
//     }
// }
