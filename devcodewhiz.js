// online_quiz_app.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let quizzes = [];

// Create a new quiz
app.post('/createQuiz', (req, res) => {
    const { title, questions } = req.body;
    const quiz = { title, questions };
    quizzes.push(quiz);
    res.status(200).json({ message: 'Quiz created successfully' });
});

// Take a quiz
app.post('/takeQuiz/:quizId', (req, res) => {
    const { quizId } = req.params;
    const { answers } = req.body;
    const quiz = quizzes.find(quiz => quiz.id === quizId);
    if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
        return;
    }
    // Calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
        if (question.correctAnswer === answers[index]) {
            score++;
        }
    });
    res.status(200).json({ message: 'Quiz completed', score });
});

// Listen on port
const port = 3000;
app.listen(port, () => {
    console.log(`Online quiz application running on http://localhost:${port}`);
});
