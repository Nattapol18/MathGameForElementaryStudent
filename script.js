document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const scoreElement = document.getElementById('score');
    const operand1Input = document.getElementById('operand1');
    const operand2Input = document.getElementById('operand2');
    const userAnswerInput = document.getElementById('userAnswer');
    const answerButton = document.getElementById('answerButton');
    const resultText = document.getElementById('resultText');
    
    const operatorRadios = document.getElementsByName('operator'); 
    const radioText = document.getElementById('radioText');

    let score = 0;
    let totalQuestions = 0;
    let selectedOperator = "+"; 

    function generateQuestion() {
        operand1Input.value = Math.floor(Math.random() * 100);
        operand2Input.value = Math.floor(Math.random() * 100);
    }

    function checkAnswer() {
        const num1 = parseFloat(operand1Input.value);
        const num2 = parseFloat(operand2Input.value);
        const userAnswer = parseFloat(userAnswerInput.value);
        let correctAnswer;

        switch (selectedOperator) {
            case 'add':
                correctAnswer = num1 + num2;
                break;
            case 'subtract':
                correctAnswer = num1 - num2;
                break;
            case 'multiply':
                correctAnswer = num1 * num2;
                break;
            case 'divide':
                correctAnswer = num1 / num2;
                break;
            default:
                console.error('Invalid operator');
                return;
        }

        if (isNaN(userAnswer)) {
            resultText.textContent = 'กรุณากรอกคำตอบ';
        } else if (Math.abs(userAnswer - correctAnswer) < 0.01) {
            resultText.textContent = 'ถูกต้อง';
            score++;
        } else {
            resultText.textContent = 'ไม่ถูก';
        }

        totalQuestions++;
        scoreElement.textContent = `${score}/${totalQuestions}`;
        generateQuestion();
        userAnswerInput.value = '';
    }

    startButton.addEventListener('click', function () {
        score = 0;
        totalQuestions = 0;
        scoreElement.textContent = '0/0';
        generateQuestion();
        resultText.textContent = '';
        setDefaultOperator();
    });

    function setDefaultOperator() {
        operatorRadios[0].checked = true;
        selectedOperator = operatorRadios[0].value;
        radioText.textContent = '+';
    }

    for (let i = 0; i < operatorRadios.length; i++) {
        operatorRadios[i].addEventListener('change', function () {
            selectedOperator = operatorRadios[i].value;
            radioText.textContent = operatorRadios[i].nextSibling.textContent.trim();
            generateQuestion();
            resultText.textContent = '';
        });
    }

    answerButton.addEventListener('click', checkAnswer);

    setDefaultOperator();
    generateQuestion();
});