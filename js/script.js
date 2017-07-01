$(document).ready(function () {
    "use strict";
    
    var audio1 = document.createElement('audio'),
        audio2 = document.createElement('audio'),
        audio3 = document.createElement('audio'),
        audio4 = document.createElement('audio'),
        series = [],
        pointer = 0,
        status = "defualt";
    
    audio1.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    audio2.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    audio3.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    audio4.setAttribute('src', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    
     // generate & return random index from 1 to 4
    function generatRandomNumber() {
        return Math.floor( Math.random() * 4 ) + 1;
    }
    
    // increase the counter
    function increaseCounter () {
        var counter = parseInt($(".container .control-section .counter").html()) + 1;
        if(counter < 10) {
            $(".container .control-section .counter").html("0" + counter);
        }
        else {
            $(".container .control-section .counter").html(counter);
        }
    }
    
    // run series
    function runSeries() {
        var i = -1;
        status = "playing";
        function loopfunc() {
            setTimeout(function(){
                $(".container .section").removeClass("green-1");
                $(".container .section").removeClass("blue-1");
                $(".container .section").removeClass("yellow-1");
                $(".container .section").removeClass("red-1");
                i++;
                setTimeout(function() {
                    if(i < series.length) {
                        if(series[i] == 1) {
                            audio1.play();
                            $(".container .section-1").addClass("green-1");
                        }
                        else if(series[i] == 2) {
                            audio2.play();
                            $(".container .section-2").addClass("blue-1");
                        }
                        else if(series[i] == 3) {
                            audio3.play();
                            $(".container .section-3").addClass("yellow-1");
                        }
                        else if(series[i] == 4) {
                            audio4.play();
                            $(".container .section-4").addClass("red-1");
                        }
                        loopfunc();
                    }
                    else if(i == series.length) {
                        pointer = 0;
                        status = "wait";
                        setTimeout(checkTime, 3000, pointer, series.length);
                    }
                }, 500);
            }, 500);
        }
        loopfunc();
    }
    
    // increase series and go up one step
    function increaseSeries() {
        increaseCounter();
        var randNumber = generatRandomNumber();
        console.log(randNumber);
        series.push(randNumber);
        runSeries();
    }
    
    // check delay time
    function checkTime(p ,l) {
        if((p == pointer) && (l == series.length) && (status != "finish")) {
            audio1.play();
            if($(".container .control-section .btn-strict").hasClass("active")) {
                series = [];
                pointer = 0;
                $(".container .control-section .counter").html("01");
                var randNumber = generatRandomNumber();
                series.push(randNumber);
            }
            runSeries();
        }
    }
    
    // check game if it is finished.
    function checkGame (bnumber) {
        if(bnumber == series[pointer]) {
            if(pointer == (series.length - 1)) {
                if(series.length == 20) {
                    status = "finish";
                    series = [];
                    pointer = 0;
                    $(".container .control-section .counter").html("--");
                    $(".container .control-section .btn-start").removeClass("green-1");
                    $(".container .control-section .btn-start").addClass("green");
                }
                else {
                    pointer = 0;
                    increaseSeries();
                }
            }
            else {
                pointer++;
                setTimeout(checkTime ,3000 ,pointer ,series.length);
            }
        }
        else {
            audio1.play();
            if($(".container .control-section .btn-strict").hasClass("active")) {
                series = [];
                $(".container .control-section .counter").html("00");
                pointer = 0;
                setTimeout(increaseSeries, 200);
            }
            else {
                pointer = 22;
                runSeries();
            }
        }
    }
    
    // the 4 sections of game and what happen when click on any one.
    $(".container .section-1").on("click", function () {
        if(status == "wait") {
            audio1.play();
            checkGame(1);
        }
    });
    $(".container .section-2").on("click", function () {
        if(status == "wait") {
            audio2.play();
            checkGame(2);
        }
    });
    $(".container .section-3").on("click", function () {
        if(status == "wait") {
            audio3.play();
            checkGame(3);
        }
    });
    $(".container .section-4").on("click", function () {
        if(status == "wait") {
            audio4.play();
            checkGame(4);
        }
    });
    
    // start the game when click on start button
    $(".container .control-section .btn-start").on("click", function () {
        if($(this).hasClass("green")) {
            $(this).removeClass("green");
            $(this).addClass("green-1");
            $(".container .control-section .counter").html("00");
            setTimeout(increaseSeries, 200);
        }
    });
    
    // strict mode when click on strict pointer
    $(".container .control-section .btn-strict").on("click", function () {
        if(!$(this).hasClass("active")){
            $(this).removeClass("yellow");
            $(this).addClass("red");
            $(this).addClass("active");
        }
        else {
            $(this).removeClass("red");
            $(this).removeClass("active");
            $(this).addClass("yellow");
        }
    });
    
});