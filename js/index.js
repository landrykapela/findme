// const btnGood = document.getElementById('btn-good');
// const question= document.getElementById('question');
let answers = new Array();
const questions = [
  {
    qn: "Let's start with your name",
    req: true,
    dependent: false,
    type: "text",
    ph: "Type your name"
  },
  {
    qn: "You got an e-mail address, ",
    req: true,
    dependent: true,
    type: "email",
    ph: "Type your e-mail address"
  },
  {
    qn: "I'm sure you've got a birth date!",
    req: true,
    dependent: false,
    type: "date",
    ph: "Pick a date"
  },
  {
    qn: "What is your highest level of education?",
    req: true,
    dependent: false,
    type: "select",
    options: ["PHD", "Master/Post-Graduate", "Bachelor", "Diploma", "Other"]
  },
  {
    qn: "At which school/college/university did you do your ",
    req: true,
    dependent: true,
    type: "text",
    ph: "Type name of institution"
  },
  {
    qn: "What best describes your profession?",
    req: true,
    dependent: false,
    type: "select",
    options: [
      "Accountant",
      "Software Engineer",
      "Civil Engineer",
      "Medical Doctor",
      "System Administrator"
    ]
  },
  {
    qn: "How many years you've worked as ",
    req: true,
    dependent: true,
    type: "number",
    ph: "Type number of years"
  },
  {
    qn:
      "What company/organisation have you worked at before? (separate with a coma(,))",
    req: true,
    dependent: false,
    type: "text",
    ph: "Type name of organisations"
  },
  {
    qn: "Any particular skills? (separate with a coma(,))",
    req: true,
    dependent: false,
    type: "text",
    ph: "List your skills"
  },
  {
    qn: "Almost there! A nice picture of you would be great!",
    req: true,
    dependent: false,
    type: "file",
    ph: "upload"
  }
];

//render personal details
const renderPersonalDetails = () => {
  const personalDetails = document.createElement("div");
  personalDetails.classList.add("horizontal");

  const name = document.createElement("p");
  name.innerHTML =
    '<i class="material-icons">person</i>&nbsp;&nbsp;' + answers[0];
  personalDetails.appendChild(name);

  const profession = document.createElement("p");
  profession.innerHTML =
    '<i class="material-icons">school</i>&nbsp;&nbsp;' + answers[5];
  personalDetails.appendChild(profession);

  const experience = document.createElement("p");
  experience.innerHTML =
    '<i class="material-icons">hourglass_full</i>&nbsp;&nbsp;' +
    answers[6] +
    " year(s)";
  personalDetails.appendChild(experience);

  const email = document.createElement("p");
  email.innerHTML =
    '<i class="material-icons">email</i>&nbsp;&nbsp;' + answers[1];
  personalDetails.appendChild(email);
  return personalDetails;
};
//create summary
const createSummary = () => {
  const summary = document.getElementById("summary");
  const details = document.createElement("div");
  details.id = "details";
  const personalDetails = renderPersonalDetails();

  details.appendChild(personalDetails);
  summary.appendChild(details);
  summary.classList.remove("hidden");
  //   summary.classList.add("slide-up");
};
const showNextQuestion = id => {
  if (id + 1 == questions.length) {
    createSummary();
  } else {
    showQuestion(id + 1);
  }
};

const showPrevQuestion = id => {
  if (id == 0) {
    showQuestion(0);
    return;
  }
  showQuestion(id - 1);
};
//create input
const createInput = data => {
  let id = questions.indexOf(data);
  let input = {};
  switch (data.type) {
    case "text":
      input = document.createElement("input");
      input.type = "text";
      input.id = "qn-" + id;
      input.placeholder = data.ph;
      break;
    case "email":
      input = document.createElement("input");
      input.type = "email";
      input.id = "qn-" + id;
      input.placeholder = data.ph;
      break;
    case "select":
      input = document.createElement("select");
      input.id = "qn-" + id;
      for (let i = 0; i < data.options.length; i++) {
        const option = document.createElement("option");
        option.textContent = data.options[i];
        input.appendChild(option);
      }
      break;
    case "date":
      let x = new Date().getFullYear() - 18;
      input = document.createElement("input");
      input.type = "date";
      input.min = "1940-01-01";
      input.max = x + "-01-01";
      input.id = "qn-" + id;
      input.placeholder = data.ph;
    default:
      input = document.createElement("input");
      input.type = data.type;
      input.id = "qn-" + id;
      input.placeholder = data.ph;
      break;
  }
  return input;
};
const showQuestion = id => {
  const container = document.getElementById("questions");
  const question = document.createElement("div");
  question.classList.add("question");
  question.id = "question-" + id;
  const intro = document.createElement("h1");
  intro.textContent = "Hello there! I'm Melanie.";
  const para = document.createElement("p");
  const data = questions[id];

  para.textContent = data.dependent ? data.qn + answers[id - 1] : data.qn;
  let input = createInput(data);

  if (answers[id] != undefined || answers[id] != null) {
    input.value = answers[id];
  }
  const btnNext = document.createElement("button");
  btnNext.id = "next-button-" + id;
  btnNext.innerHTML =
    'Next &nbsp;&nbsp;<i class="material-icons">arrow_forward</i>';
  const btnPrev = document.createElement("button");
  btnPrev.id = "prev-button-" + id;
  btnPrev.innerHTML = '<i class="material-icons">arrow_backward</i>&nbsp;Back';
  if (id == 0) {
    question.appendChild(intro);
  }
  question.appendChild(para);
  question.appendChild(input);
  const btnHolder = document.createElement("div");
  btnHolder.classList.add("horizontal");

  if (id > 0) {
    btnHolder.appendChild(btnPrev);
  }
  if (id < questions.length) {
    if (id == questions.length - 1) btnNext.innerHTML = "Finish";
    btnHolder.appendChild(btnNext);
  }
  question.appendChild(btnHolder);
  container.appendChild(question);

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      question.classList.add("fade-out");
      setTimeout(() => {
        question.classList.add("hidden");
        question.classList.remove("question");
        showPrevQuestion(id);
      }, 500);
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      answers[id] = input.value;
      question.classList.add("fade-out");
      setTimeout(() => {
        question.classList.add("hidden");
        question.classList.remove("question");
        showNextQuestion(id);
      }, 500);
    });
  }
};

window.onload = showQuestion(0);
