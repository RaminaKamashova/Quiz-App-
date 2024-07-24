
fetch('data.json')
  .then(response => response.json())  
  .then(data => {
    startQuiz(data);
  })
  .catch(error => console.error('Error fetching the quiz data:', error));




function startQuiz(data) {
  const questions = data;
  let currentQuestionIndex = 0;
  let score = 0;


  function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').textContent = question.question;
    const options = document.querySelectorAll('.quiz-options li');
    options.forEach((option, index) => {
      option.textContent = question.options[index];
      option.onclick = () => selectAnswer(option, question.correct_answer);
    });
  }


  function selectAnswer(option, correctAnswer) {
    const resultDiv = document.getElementById('result');
    if (option.textContent === correctAnswer) {
      score++;
      resultDiv.textContent = 'Doğru ☺!';
    } else {
      resultDiv.textContent = 'Yanlış!';
    }
    document.getElementById('correct-score').textContent = score;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      showFinalResult();
    }
  }

 
  function showFinalResult() {
    document.querySelector('.quiz-body').innerHTML = `<h2>Scorunuz: ${score}/${questions.length}</h2>`;
  }
  

  
  displayQuestion();
}




function playAgain() {
  location.reload(); //перезагрузка на начало 
}
