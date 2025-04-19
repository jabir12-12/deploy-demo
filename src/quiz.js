import React, { useState } from 'react';
import quizData from './QuizData';

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const correctAnswer = quizData[currentQuestion].answer;
        if (selectedAnswer === "") return;

        if (selectedAnswer === correctAnswer) {
            setScore(score + 1);
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < quizData.length) {
                setCurrentQuestion(nextQuestion);
                setIsCorrect(null);
                setSelectedAnswer("");
            } else {
                setShowScore(true);
            }
        }, 1000);
    };

    return (
        <div className='quiz' style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '12px', background: '#f9f9f9' }}>
            {showScore ? (
                <div className='score-section' style={{ fontSize: '1.5rem', textAlign: 'center' }}>
                    You scored {score} out of {quizData.length}
                </div>
            ) : (
                <>
                    <div className='question-section' style={{ marginBottom: '20px' }}>
                        <div className='question-count' style={{ marginBottom: '10px' }}>
                            <strong>Question {currentQuestion + 1}</strong> / {quizData.length}
                        </div>
                        <div className='question-text' style={{ fontSize: '1.2rem' }}>
                            {quizData[currentQuestion].question}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
                        {quizData[currentQuestion].options.map((option) => (
                            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option}
                                    checked={selectedAnswer === option}
                                    onChange={() => setSelectedAnswer(option)}
                                />
                                {option}
                            </label>
                        ))}

                        <button type="submit" style={{ marginTop: '15px', padding: '10px', borderRadius: '6px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>
                            Submit
                        </button>

                        {selectedAnswer && isCorrect !== null && (
                            <div style={{ marginTop: '10px', fontWeight: 'bold', color: isCorrect ? 'green' : 'red' }}>
                                {isCorrect ? 'Correct! 🎉' : 'Sorry, that’s not right. 😢'}
                            </div>
                        )}
                    </form>
                </>
            )}
        </div>
    );
}

export default Quiz;
