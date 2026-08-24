// ==========================================
// MENU MOBILE
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});


// ==========================================
// COMPETÊNCIAS
// ==========================================

const competencyButtons = document.querySelectorAll(".competency");
const competencyContent = document.getElementById("competencyContent");

const competencyData = {
    1: {
        title: "Domínio da modalidade escrita formal",
        text: "Avalia o domínio da norma-padrão da língua portuguesa, considerando aspectos como ortografia, concordância, regência, pontuação e construção sintática.",
        tip: "💡 Dica: reserve alguns minutos para revisar o texto antes de passar a limpo."
    },

    2: {
        title: "Compreensão da proposta de redação",
        text: "Avalia a capacidade de compreender o tema e desenvolver o texto dentro do recorte proposto, utilizando conhecimentos de diferentes áreas para construir a argumentação.",
        tip: "💡 Dica: destaque as palavras-chave do tema antes de começar a escrever."
    },

    3: {
        title: "Seleção e organização dos argumentos",
        text: "Avalia a capacidade de selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.",
        tip: "💡 Dica: cada parágrafo de desenvolvimento deve contribuir diretamente para defender sua tese."
    },

    4: {
        title: "Mecanismos linguísticos de argumentação",
        text: "Avalia o uso dos recursos linguísticos necessários para construir a coesão do texto, estabelecendo relações adequadas entre palavras, frases e parágrafos.",
        tip: "💡 Dica: varie os conectivos e evite repetir sempre as mesmas expressões."
    },

    5: {
        title: "Proposta de intervenção",
        text: "Avalia a elaboração de uma proposta de intervenção para o problema abordado, respeitando os direitos humanos e mantendo relação com a discussão apresentada.",
        tip: "💡 Dica: pense em agente, ação, meio, finalidade e detalhamento."
    }
};

competencyButtons.forEach(button => {

    button.addEventListener("click", () => {

        competencyButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const id = button.dataset.competency;
        const data = competencyData[id];

        competencyContent.innerHTML = `
            <span class="big-number">C${id}</span>

            <div>
                <h3>${data.title}</h3>
                <p>${data.text}</p>

                <div class="highlight">
                    ${data.tip}
                </div>
            </div>
        `;
    });

});


// ==========================================
// CHECKLIST + PROGRESSO
// ==========================================

const checkboxes = document.querySelectorAll(
    '.checklist input[type="checkbox"]'
);

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function updateProgress() {

    const total = checkboxes.length;

    const checked = document.querySelectorAll(
        '.checklist input[type="checkbox"]:checked'
    ).length;

    const percentage = Math.round((checked / total) * 100);

    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateProgress);
});


// ==========================================
// QUIZ
// ==========================================

const questions = [
    {
        question: "Qual é a principal função da tese na redação?",
        answers: [
            "Apresentar apenas uma citação famosa.",
            "Defender o ponto de vista que será desenvolvido no texto.",
            "Encerrar a redação.",
            "Apresentar somente dados estatísticos."
        ],
        correct: 1
    },

    {
        question: "Qual alternativa apresenta um conectivo de conclusão?",
        answers: [
            "Entretanto",
            "Além disso",
            "Portanto",
            "Embora"
        ],
        correct: 2
    },

    {
        question: "Qual elemento é essencial em uma proposta de intervenção?",
        answers: [
            "Uma nova introdução.",
            "Um agente responsável pela ação.",
            "Uma citação literária obrigatória.",
            "Uma pergunta retórica."
        ],
        correct: 1
    },

    {
        question: "O que caracteriza um repertório sociocultural produtivo?",
        answers: [
            "Uma referência decorada e desconectada do argumento.",
            "Uma citação obrigatoriamente de um filósofo.",
            "Uma referência relacionada e utilizada para sustentar a argumentação.",
            "Uma frase em outro idioma."
        ],
        correct: 2
    },

    {
        question: "Qual é a estrutura mais comum de uma redação ENEM?",
        answers: [
            "Introdução + desenvolvimento + conclusão.",
            "Título + resumo + conclusão.",
            "Pergunta + resposta + bibliografia.",
            "Contexto + poema + opinião."
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("nextButton");
const quizResult = document.getElementById("quizResult");

function loadQuestion() {

    const question = questions[currentQuestion];

    answered = false;

    questionNumber.textContent =
        `Questão ${currentQuestion + 1} de ${questions.length}`;

    questionElement.textContent = question.question;

    answersElement.innerHTML = "";

    nextButton.disabled = true;
    quizResult.textContent = "";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer");
        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}

function selectAnswer(index, selectedButton) {

    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];

    const allAnswers =
        document.querySelectorAll(".answer");

    allAnswers.forEach(button => {
        button.disabled = true;
    });

    if (index === question.correct) {

        selectedButton.classList.add("correct");

        score++;

        scoreElement.textContent =
            `Pontuação: ${score}`;

        quizResult.textContent =
            "✓ Muito bem! Você acertou.";

    } else {

        selectedButton.classList.add("wrong");

        allAnswers[question.correct]
            .classList.add("correct");

        quizResult.textContent =
            "✗ Não foi dessa vez. A alternativa correta está destacada.";
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();
    }
});

function showResult() {

    questionNumber.textContent = "Quiz concluído";

    questionElement.textContent =
        `Você acertou ${score} de ${questions.length} questões.`;

    answersElement.innerHTML = "";

    nextButton.style.display = "none";

    let message;

    if (score === questions.length) {
        message = "🏆 Excelente! Você dominou a revisão.";
    } else if (score >= 3) {
        message = "👏 Muito bom! Revise os pontos em que teve dificuldade.";
    } else {
        message = "📚 Continue estudando. A revisão é parte do processo!";
    }

    quizResult.textContent = message;
}


// Inicializa o quiz
loadQuestion();
