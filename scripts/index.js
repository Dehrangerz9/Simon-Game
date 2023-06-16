var pressedSequence = [];
var expectedSequence = [];

$(document).on("keydown",function(event){
    startGame(event.key)
})

function startGame(key){
    if(key === "a"){
        $("#level-title").html("Simon Game")
        $(".btn").click(function(event){
            newPress($(this));
            animatePress($(this));
            compareSequence()
        })
        setTimeout(function(){
            newNumberToSequence()
            computerPress()
            $(document).off("keydown")
        },1000)
    }
}

function compareSequence(){
    for (let i = 0; i < pressedSequence.length; i++){
        const element1 = pressedSequence[i];
        const element2 = expectedSequence[i];

        if(element1 !== element2){
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            gameOver();
            break;
        }

        if(pressedSequence.length == expectedSequence.length){
            pressedSequence = [];
            newNumberToSequence();
            setTimeout(function() {
                computerPress();
            }, 1000);
        }
    }
}

function computerPress(){
    for (let i = 0; i < expectedSequence.length; i++){
        const buttonIndex = expectedSequence[i];
        const button = $(".btn").eq(buttonIndex);
        setTimeout(function(){
            animatePress(button);
        }, 1000 * i)
    }
}

function animatePress(btn){
    btn.addClass("pressed");
    playSound(btn);
    setTimeout(function(){
       btn.removeClass("pressed") 
    },500)
}

function playSound(btn){
    switch(btn.attr("id")){
        case "green":
            var audio = new Audio("sounds/green.mp3")
            audio.play()
        break;
        case "red":
            var audio = new Audio("sounds/red.mp3")
            audio.play()
        break;
        case "yellow":
            var audio = new Audio("sounds/yellow.mp3")
            audio.play()
        break;
        case "blue":
            var audio = new Audio("sounds/blue.mp3")
            audio.play()
        break;
    }
}

function newPress (btn){
    var newValue
    switch(btn.attr("id")){
        case "green":
             newValue = 0;
        break;
        case "red":
             newValue = 1;
        break;
        case "yellow":
             newValue = 2;
        break;
        case "blue":
             newValue = 3;
        break;
    }
    pressedSequence.push(newValue);
    

}

function newNumberToSequence() {
    const newValue = Math.floor(Math.random() * 4);
    expectedSequence.push(newValue);
    console.log(expectedSequence)
}

function gameOver(){
    $("body").addClass("game-over")
    $("#level-title").html("GAME-OVER press R to reset.")
    $(".btn").off("click")
    $(document).on("keydown",function(event){
        resetGame(event.key)
    })
}

function resetGame(key){
    if(key === "r"){
        expectedSequence = []
        pressedSequence = []
        $("body").removeClass("game-over")
        $("#level-title").html("Simon Game")
        startGame("a")
    }
}
