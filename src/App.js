import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 

export default function App() {

	// Pour l'instant on utilise juste un array d'objets statique afin de débuter simplement 
	// chaque objet contient une question, et un autre array d'objets, chacun étant une réponse avec son score correspondant
	// on utilisera du JS pour accéder aux différents objets

	const {handleSubmit, register, formState : {errors}} = useForm()

	const defaultQuestions = [
		{
			questionText: 'Eau - En cas de coupure du réseau d’eau potable.',
			answerOptions: [
				{ answerText: 'Vous croisez les doigts pour que la situation se rétablisse au plus vite.', answerScore: 0 },
				{ answerText: 'Vous avez suffisamment de bouteilles d’eau chez vous pour tenir quelques jours.', answerScore: 1 },
				{ answerText: 'Vous possédez un filtre permettant de potabiliser n’importe quelle eau.', answerScore: 2 },
				{ answerText: 'Vous possédez un système complet de potabilisation de l’eau (captation, stockage, filtration).', answerScore: 3 },
			],
		},
		{
			questionText: 'Alimentation - Dans l’hypothèse où vous ne pourriez plus acheter de produits alimentaires',
			answerOptions: [
				{ answerText: 'Vous faites le compte des biscottes au fond du placard.', answerScore: 0 },
				{ answerText: 'Vous avez suffisamment de nourriture chez vous pour tenir environ 1 semaine / personne.', answerScore: 1 },
				{ answerText: 'Vous êtes capable de produire une partie de votre alimentation à moyen terme (fruits & légumes).', answerScore: 2 },
				{ answerText: 'Vous ou votre communauté produit une grande part de son alimentation de manière stable et prévisible (fruit & légumes, céréales, produits animal, etc).', answerScore: 3 },
			],
		},
		{
			questionText: 'Irrigation - En cas de sécheresse prolongée',
			answerOptions: [
				{ answerText: 'Vous ne disposez d’aucun moyen pour arroser vos plantes, votre jardin, ou votre potager.', answerScore: 0 },
				{ answerText: 'Vous utilisez l’eau du réseau pour arroser.', answerScore: 1 },
				{ answerText: 'Vous avez mis en place un système d’arrosage basé sur une réserve d’eau limitée (cuve de stockage, petite mare, etc).', answerScore: 2 },
				{ answerText: 'Vous disposez d’un stock d’eau quasi-illimité vous permettant d’arroser tout le nécessaire (Source naturelle à haut débit, puit, captation en rivière ou grand point d’eau).', answerScore: 3 },
			],
		},
		{
			questionText: 'Eclairage - En cas de coupure de courant',
			answerOptions: [
				{ answerText: 'Vous n’avez que votre smartphone pour vous éclairer.', answerScore: 0 },
				{ answerText: 'Vous possédez un minimum de bougies et de lampes à piles.', answerScore: 1 },
				{ answerText: 'Vous êtes capable d’éclairer votre foyer pour plusieurs jours (lampes à pétrole, lanterne LED, bougies longues durée) ainsi que de charger des appareils tels que téléphones ou ordinateurs (batteries externes).', answerScore: 2 },
				{ answerText: 'Vous produisez de façon permanente tout ou une partie de votre électricité (énergie solaire, éolienne, etc). ', answerScore: 3 },
			],
		},
		{
			questionText: 'Cuisine - En cas de panne des réseau de gaz et d’électricité',
			answerOptions: [
				{ answerText: 'Vous ne pouvez plus cuisiner de plats chauds.', answerScore: 0 },
				{ answerText: 'Vous possédez le minimum pour cuisiner hors réseau (réchaud de camping par exemple).', answerScore: 1 },
				{ answerText: 'Vous êtes en mesure d’alimenter vos appareils de cuisson en combustible pour plusieurs semaines (bois, gaz en bouteille).', answerScore: 2 },
				{ answerText: 'Vous êtes capable de cuisiner seulement avec des énergies libres et renouvelables (cuiseur à bois, four solaire, etc).', answerScore: 3 },
			],
		},
	];
	const [questions, setQuestions] = useState(defaultQuestions)
	
	

	
	const [data, setData] = useState(null)

	function getData(event) {
		setData(event.target.value)
		console.log(event.target.value)
		
	}

	function onSubmit(data) {
		console.log(data)
		questions.push(data)
		console.log(questions)
	}

	
	
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

	const handleRemove = (x) => {
		if (questions.length > 1) {
		setQuestions(questions.splice( (x,1) ));
		}
		else { 
			alert('Plus de questions à supprimer !')
		}
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
					
					<div className='manage-questions'>
						{/* espace pour le formulaire */}
						<div>
							<form onSubmit={handleSubmit(onSubmit)}>
									<label>Nouvelle question : </label>
									<input type='text' className='question-input' onChange={getData} name="questionTextInput" {...register("questionText")}/><br/>
	
									<div className='form-input'><label>Reponse 1</label><input className='answer-input' type='text' onChange={getData} name="answerTextInput" {...register("answerOptions[0][answerText]")}/> <label>EcoScore:</label><input className='score-input' name="answerScoreInput" {...register("answerOptions[0][anserScore]")}></input></div>
									<div><label>Reponse 2</label><input className='answer-input' type='text' onChange={getData} name="answerTextInput" {...register("answerOptions[1][answerText]")}/> <label>EcoScore:</label><input className='score-input' name="answerScoreInput" {...register("answerOptions[1][anserScore]")}></input><br/></div>
									<div><label>Reponse 3</label><input className='answer-input' type='text' onChange={getData} name="answerTextInput" {...register("answerOptions[2][answerText]")}/> <label>EcoScore:</label><input className='score-input' name="answerScoreInput" {...register("answerOptions[2][anserScore]")}></input><br/></div>
									<div><label>Reponse 4</label><input className='answer-input' type='text' onChange={getData} name="answerTextInput" {...register("answerOptions[3][answerText]")}/>  <label>EcoScore:</label><input className='score-input'name="answerScoreInput" {...register("answerOptions[3][anserScore]")}></input><br/></div>
								
								<input type='submit' value="Ajouter" className='submit-button'/>
							</form>
						</div>

						<div>
							<div className='remove-questions'>
								{questions.map(	(question,index) => 
									(
									
										<li onClick={() => handleRemove({index})}>
											Enlever la question {index} : {question.questionText.slice(0,45)}...
										</li>
									
									)
								)} 
							</div>
						</div>
					</div>

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
