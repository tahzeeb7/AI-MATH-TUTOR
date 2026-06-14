let historyData = [];

function fillQuestion(text){
document.getElementById("question").value = text;
}

function toggleDarkMode(){
document.body.classList.toggle("dark");
}

async function askAI(){

const question =
document.getElementById("question").value;

const result =
document.getElementById("result");

if(!question.trim()){
alert("Please enter a question");
return;
}

result.innerHTML =
"⏳ Solving...";

try{

const response =
await fetch(
"https://tahzeeb1122-teachingai.hf.space/chat",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:question
})
}
);

const data =
await response.json();

result.innerHTML =
data.reply;

if(window.MathJax){
MathJax.typesetPromise();
}

historyData.unshift({
question:question,
answer:data.reply
});

renderHistory();

}catch(error){

console.error(error);

result.innerHTML =
"❌ Server Error";

}

}

function renderHistory(){

const history =
document.getElementById("history");

history.innerHTML="";

historyData.forEach(item=>{

history.innerHTML += `
<div class="history-item">

<b>Question:</b>
${item.question}

<br><br>

<b>Answer:</b>
${item.answer}

</div>
`;

});

}

function startVoice(){

if(!('webkitSpeechRecognition' in window)){

alert(
"Voice recognition not supported"
);

return;
}

const recognition =
new webkitSpeechRecognition();

recognition.lang="en-US";

recognition.start();

recognition.onresult =
function(event){

document.getElementById(
"question"
).value =
event.results[0][0].transcript;

};

}

document
.getElementById("question")
.addEventListener(
"keydown",
function(event){

if(event.key==="Enter" &&
!event.shiftKey){

event.preventDefault();

askAI();

}

}
);
