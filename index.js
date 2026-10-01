const allQuestions={

    question1: {
        text: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    },
    question2: {    
    text: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        correctAnswer: 0
    },
    question3: {
        text: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"], 
        correctAnswer: 1
    },
    question4: {
        text: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    } 

}
let start=document.querySelector(".start");
let que=document.querySelector(".question");
let ans=document.querySelector(".answer");

let buttons = document.querySelectorAll(".ans");

let current=1;
let score=0;


function create(){
  
    let ansOptions="";

    let outerDiv=document.createElement("div");
outerDiv.classList.add("outer");
document.body.append(outerDiv);

let question=allQuestions["question"+current];

for(let i=0;i<question.options.length;i++){
ansOptions+=`<button class="ans">${question.options[i]}</button>`;
}



outerDiv.innerHTML=`
<h3>${question.text}</h3>
<div class= info>
<p>Question${current}out of ${Object.keys(allQuestions).length}</p>
<p class="mark">Score:${score}</p>
</div>
<hr>
${ansOptions}


<div class="subButton">
<button class="next nextQuestion ">Next</button>
</div>

`;  

let btn=outerDiv.querySelectorAll(".ans");
btn.forEach(function(button){
button.addEventListener("click",function(){
  if(button.innerText==  allQuestions["question"+current].options[
        allQuestions["question"+current].correctAnswer
    ]){
    score++;
    outerDiv.querySelector(".mark").innerText=`Score:${score}`;
  }
});
});


let nextQuestion=outerDiv.querySelector(".nextQuestion");
nextQuestion.addEventListener("click",function(){
   current++;
   if(current<=Object.keys(allQuestions).length){
    outerDiv.style.display="none";
create();
   }
   else{
    
    outerDiv.innerHTML = `
        <div class="End">
            <p>You got  marks</p>
            <h1>The End</h1>
        </div>
    `;
   }
   

});


}
start.addEventListener("click", function () {
    start.style.display="none";
    create();
    
});





