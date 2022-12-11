import React, { useState } from 'react';
import { render } from 'react-dom';

export default function App() {

	// Pour l'instant on utilise juste un array d'objets statique afin de débuter simplement 
	// chaque objet contient une question, et un autre array d'objets, chacun étant une réponse avec son score correspondant
	// on utilisera du JS pour accéder aux différents objets

	const questions = [
		{
			questionText: 'Combien de litres d\'eau as tu à la maison batard ?',
			answerOptions: [
				{ answerText: 'un litre (0pt)', answerScore: 0 },
				{ answerText: 'six litres (+6pt)', answerScore: 6 },
				{ answerText: 'dix litres (+10pt)', answerScore: 10 },
				{ answerText: 'vingt litres (+20pt)', answerScore: 20 },
			]
		},
		{
			questionText: 'Et combien de panneaux solaires enculé ?',
			answerOptions: [
				{ answerText: '1 (+1pt)', answerScore: 1 },
				{ answerText: '2 (+2pt)', answerScore: 2 },
				{ answerText: '3 (+3pt)', answerScore: 3 },
				{ answerText: '4 (+4pt)', answerScore: 4 },
			]
		},
		{
			questionText: 'Et combien de shots de vodka ?',
			answerOptions: [
				{ answerText: '1 (+11pt)', answerScore: 11 },
				{ answerText: '2 (+12pt)', answerScore: 12 },
				{ answerText: '3 (+13pt)', answerScore: 13 },
				{ answerText: '4 (+14pt)', answerScore: 14 },
			]
		}
	];

	//on déclare les états et les states manager pour REACT
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [ecoScore, setEcoScore] = useState(0);
	
	//fonction pour réinitialiser le test
	const initTest = () => {
		setShowScore(0);
		setCurrentQuestion(0);
		setEcoScore(0);
	}

	// fonction pour afficher un texte variant selon le score 
	const textScore = (x) => { 
			if(x < 10) {	
				return <p>Vous etes une grosse 💩</p> ;
			}
			else if (x >=10 && x < 20) {
				return <p>Vous etes une petite 💩</p>;
			}
			else if (x >=20 && x<30) {
				return <p>Vous etes pas mal 🙏</p>;
			}
			else {
				return <p>Bravo ! 💥</p>;
			}
	}

	// on crée une fonction qui va gérer le click sur une réponse 
	const handleAnswerOptionClick = (answerScore, starString) => {
		//ajoute le nombre d'eco points de la réponse au total des points
		setEcoScore(ecoScore + answerScore);
	
		//verifier si on est à la derniere question et passe à la question suivante si besoin
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	//on prépare maintenant le rendu de l'application 
	return (
		
		
		<div className='app'>

			{showScore ? (
				//SI showScore is true (derniere question atteinte), on affiche le score final 
				<div className='score-section'>
					Votre score est de {ecoScore}
					{textScore(ecoScore)}

					<p>
						<button onClick={	() => initTest()	}>Réinitialiser le test</button>	
					</p>
				</div>
			) : (
				//SINON, on affiche les questions
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
						<p style={{fontSize:'10px'}}><i>sélectionez la situation qui vous correspond le plus</i></p>
					</div>
					<div className='answer-section'>
						{/* on crée une boucle pour afficher les différentes réponses en itérant à travers les objets de l'array questions */}
						{/* puis on affiche le résultat à l'intérieur d'un bouton qui va déclencher la fonction handleAnswerOptionClick */}
						{/* on n'oublie pas d'entrer comme argument answerScore que la fonction utilisera pour définir ecoScore */}
						
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.answerScore)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
