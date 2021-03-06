$(document).ready(function(){
    
    //set variables
    var qNum = 0,
        qBank = new Array(),
        stage = '#game1',
        stage2 = new Object,
        qLock = false,
        num,
        score = 0;
    
    //loading the questions from json
    $.getJSON('data/db.json', function(data){

        //a for loop to load into the array
        for(var i=0; i<data.quizlist.length; i++){
            qBank[i] = new Array;
                qBank[i][0] = data.quizlist[i].question;
                qBank[i][1] = data.quizlist[i].option1;
                qBank[i][2] = data.quizlist[i].option2;
                qBank[i][3] = data.quizlist[i].option3;
        }
        
        //now store the number of questions
        num = qBank.length;
        
        //display it
        displayQuestion();
    });
    
    //function to display questions
    function displayQuestion(){

        //randomize the answer orders
        var rnd = Math.random()*3;
        rnd = Math.ceil(rnd);
        var q1,
            q2,
            q3;

        switch(rnd){

                case 1:
                    q1 = qBank[qNum][1];
                    q2 = qBank[qNum][2];
                    q3 = qBank[qNum][3];
                    break;

                case 2:
                    q1 = qBank[qNum][3];
                    q2 = qBank[qNum][1];
                    q3 = qBank[qNum][2];
                    break;

                case 3:
                    q1 = qBank[qNum][2];
                    q2 = qBank[qNum][3];
                    q3 = qBank[qNum][1];
                    break;
        }

        //add the questions now
        $(stage).append(
            '<div class = "questionText">' + qBank[qNum][0] + '</div>'
            + '<button id="1" class="option">' + q1 + '</div>'
            + '<button id="2" class="option">' + q2 + '</div>'
            + '<button id="3" class="option">' + q3 + '</div>'
        );
        
        $('.option').click(function(){
            //lock the qlock so it cannot be reanswer
           if(qLock==false){
               qLock=true;
               
               //correct answer
               if(this.id==rnd){
                   $(stage).append(
                     '<div class="feedback1">CORRECT</div>'  
                   );
                   score++;
               }
               
               //wrong answer
               if(this.id!=rnd){
                   $(stage).append(
                       '<div class="feedback2">WRONG</div>'
                   );
               }
               
               setTimeout(changeQuestion, 1000);
           }
        });
    }   //end of display question
    
    //function to transit the questions
    function changeQuestion(){
        //increases the question number
        qNum++;
        
        if(stage=='#game1'){
            stage2 = '#game1';
            stage = '#game2';
        }else{
            stage = '#game1';
            stage2 = '#game2';
        }
        
        //check if still more questions
        if(qNum < num){
            displayQuestion();
        }else{
            endQuiz();
        }
        
        //clear the current screen
        $(stage2).empty();
    
        //animate
        $(stage2).animate(
            {'right': '+= 800px'},
            'slow', function(){
                $(stage2).css(
                    'right',
                    '-800px'
                );
            });
        
        $(stage).animate(
            {'right': '+=800px'},
            'slow', function(){
                qLock = false;
            });
    }   //end of change question
    
    
    //function for final result
    function endQuiz(){
        $(stage).append(
            '<div class="questionText">You have finished the quiz!<br><br>Total questions:'
            +num+'<br>Correct answers: '+score+'</div>'
        );
    }
    
});