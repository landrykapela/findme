// const btnGood = document.getElementById('btn-good');
// const question= document.getElementById('question');
const questions = [{qn:"Let's start with your name",req:true,dependent:false,type:"text",ph:"Type your name"},
{qn:"You got an e-mail address?",req:true,dependent:false,type:"email",ph:"Type your e-mail address"},
{qn:"What is your highest level of education?",req:true,dependent:false,type:"select",options:["PHD","Master/Post-Graduate","Bachelor","Diploma","Other"]},
{qn:"What school/college/university did you go to?",req:true,dependent:false,type:"text",ph:"Type name of institution"},
{qn:"What best describes your profession",req:true,dependent:false,type:"select",options:["Accountant","Software Engineer","Civil Engineer","Medical Doctor","System Administrator"]}];

let answers =  new Array(questions.length);
const showNextQuestion = (id) =>{
	if(id + 1 == questions.length){
		alert("Thanks your for your time");
		return;
	}
	showQuestion(id+1);
}

const showPrevQuestion = (id) =>{
	if(id == 0){
		showQuestion(0)
		return;
	}
	showQuestion(id-1);
}


const showQuestion = (id) =>{
	const container = document.getElementById('questions');
	const question = document.createElement('div');
	question.classList.add('question');
	question.id = 'question-'+id;
	const intro = document.createElement('h1');
	intro.textContent = "Hello there! I'm Melanie.";
	const para = document.createElement('p');
	const data = questions[id];
	para.textContent = data.qn;
	let input = null;
	switch(data.type){
		case "text":
input = document.createElement('input');
			input.type = "text";
			input.id = 'qn-'+id;
			input.placeholder = data.ph;
			break;
		case "email":
input = document.createElement('input');
			input.type = "email";
			input.id = 'qn-'+id;
			input.placeholder = data.ph;
			break;
		case "select":
input = document.createElement('select');
input.id = 'qn-'+id;
for(let i=0; i<data.options.length;i++){
	const option = document.createElement('option');
	option.textContent = data.options[i];
	input.appendChild(option);
	}
break;

}

const btnNext = document.createElement('button');
btnNext.id = 'next-button-'+id;
btnNext.innerHTML = 'Next &nbsp;&nbsp;<i class="material-icons">arrow_forward</i>';
const btnPrev = document.createElement('button');
btnPrev.id = 'prev-button-'+id;
btnPrev.innerHTML = '<i class="material-icons">arrow_backward</i>&nbsp;Back';
if(id == 0){
	question.appendChild(intro);
}
question.appendChild(para);
question.appendChild(input);
const btnHolder = document.createElement('div');
btnHolder.classList.add("horizontal");

if(id >0){
	btnHolder.appendChild(btnPrev);
}
if(id < questions.length){
	if(id == questions.length -1) btnNext.innerHTML = "Finish";
	btnHolder.appendChild(btnNext);
}
question.appendChild(btnHolder);
container.appendChild(question);


if(btnPrev){
	btnPrev.addEventListener('click',()=>{

		question.classList.add('fade-out');
		setTimeout(()=>{
			question.classList.add('hidden');
		question.classList.remove('question');
		showPrevQuestion(id);
	},500);
	});
}
if(btnNext){
	btnNext.addEventListener('click',()=>{
		answers[id] = input.value;
		console.log("current: ",answers[id]);
		question.classList.add('fade-out');
		setTimeout(()=>{
			question.classList.add('hidden');
		question.classList.remove('question');
		showNextQuestion(id);
	},500);
	});
}
}


window.onload = showQuestion(0);