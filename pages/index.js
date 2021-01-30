import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubConner from '../src/components/GitHubConner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

/* const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`;
*/

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>CorridaQuiz - modelo base</title>
        <meta property="og:url" content="https://blog.runplace.com.br/wp-content/uploads/2020/05/retorno-aos-treinos-de-corrida-780x450.jpg" />
      </Head>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Corrida, um estado de espírito </h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fzendo uma submissão por meio do react');

              //router manda para a próxima página
            }}
            >
              <Input
                name = "nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz ae seu nome para jogar :)" 
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da galera </h1>
            <p>{db.external}</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubConner projectUrl="https://github.com/thiagoalvesec" />
    </QuizBackground>
  );
}
