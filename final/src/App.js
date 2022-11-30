import React, { useState } from 'react';

export default function App() {
	const questions = [
		{
			questionText: 'Combien de litres d\'eau as tu à la maison batard ?',
			answerOptions: [
				{ answerText: 'un litre (+1pt)', answerScore: 1 },
				{ answerText: 'six litres (+6pt)', answerScore: 6 },
				{ answerText: 'dix litres (+10pt)', answerScore: 10 },
				{ answerText: 'vingt litres (+20pt)', answerScore: 20 },
			],
		},
		{
			questionText: 'Et combien de panneaux solaires enculé ?',
			answerOptions: [
				{ answerText: '1 (+1pt)', answerScore: 1 },
				{ answerText: '2 (+2pt)', answerScore: 2 },
				{ answerText: '3 (+3pt)', answerScore: 3 },
				{ answerText: '4 (+4pt)', answerScore: 4 },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [ecoScore, setEcoScore] = useState(0);
	
	const handleAnswerOptionClick = (answerScore, starString) => {
		//ajoute le nombre d'eco points au total
		setEcoScore(ecoScore + answerScore);
	
		//passe à la question suivante et verifie si on est à la derniere question 
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

	return (
		
		// ECRAN d'AFFICHAGE 
		<div className='app'>
			Votre score actuel {ecoScore}
		
			{showScore ? (
				//SI showScore is TRUE, on affiche le score final 
				<div className='score-section'>
					Vous avez marqué {ecoScore} eco points 🦄, félicitations ! <br/>
				</div>
			) : (
				//SINON, on affiche les questions
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.answerScore)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
