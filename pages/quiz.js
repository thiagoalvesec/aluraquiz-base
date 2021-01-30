import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import db from '../db.json';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';



export const QuizButton = styled.button`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ 
  question, 
  totalQuestions, 
  questionIndex,
  onSubmit
}) {

  const questionId = `question__${questionIndex}`
  return (
    <Widget>
          <Widget.Header>
            <h3>
               {`Pergunta ${questionIndex + 1} de ${totalQuestions}`} 
            </h3>
            
          </Widget.Header>
          <img
            alt="Descrição"
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
            }}
            src={question.image}
          />
          <Widget.Content>
            <h2>
              {question.title}
            </h2>
            <p>
              {question.description}
            </p>

            <form 
              onSubmit={(infosDoEvento) =>{
                infosDoEvento.preventDefault();
                onSubmit();
              }}
            >
              {question.alternatives.map((alternative, alternativeIndex) => {
                const alternativeId = `alternative__${alternativeIndex}`
                return (
                  <Widget.Topic
                    as="label"
                    htmlFor={alternativeId}
                  >
                    <input 
                      //style ={{ display: 'none'}}
                      id={alternativeId}
                      name={questionId}
                      type="radio"
                    />
                    {alternative}
                  </Widget.Topic>
                );
              })}

              {/*<pre>
                {JSON.stringify(question, null, 4)}
              </pre>*/}
            
              <Button type="submit">
                Confirmar
              </Button>
            </form>
          </Widget.Content>
        </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
}

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;


  React.useEffect(() => {
    // fetch()... (busca do servidor o JSON)
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1*1000);
    //nasce === didMount -> ciclo de vida do componente
  }, []);
  
  function handleSubmitQuiz(){
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions){
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget 
            question={question} 
            questionIndex={questionIndex}
            totalQuestions={totalQuestions} 
            onSubmit={handleSubmitQuiz}
        />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <div>Você acertou x questões, parabéns!</div>}
      </QuizContainer>
    </QuizBackground>
  );
}
