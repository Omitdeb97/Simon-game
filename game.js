var buttonColors = ["red", "blue", "green", "yellow"];


var gamePattern = [];

var userClickpattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");

    userClickpattern.push(userChosenColor);
    playSound(userChosenColor);

    animatePressed(userChosenColor);
    checkAnswer(userClickpattern.length -1);
    
});

function checkAnswer(currentLevel1){

    if (gamePattern[currentLevel1] === userClickpattern[currentLevel1]){
        console.log("Success");

        if(userClickpattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");

        playSound("wrong")

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function nextSequence(){

    userClickpattern = [];

    level++; 
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChossenColor = buttonColors[randomNumber];

    gamePattern.push(randomChossenColor);

    $("#" + randomChossenColor).fadeIn(100).fadeOut(100).fadeIn(100);


  playSound(randomChossenColor);

}  

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePressed(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);

    
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
