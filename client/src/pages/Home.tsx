import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

const Home: FC = () => {
  const { user } = useAuth()!;
  const [meme, setMeme] = useState();

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(object => {
        const memes = object.data.memes;
        const randomIndex = Math.floor(Math.random() * memes.length);
        const meme = memes[randomIndex];
        setMeme(meme.url);
      })
      .catch(console.log);
  }, []);
  
  return (
    <Wrapper>
      <h1>Welcome {user}!</h1>
      {meme && (
        <img src={meme} alt="Meme" />
      )}
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  text-align: center;

  h1 {
    margin-top: 50px;
  }

  img {
    max-height: 400px;
    border: 2px solid #FFF;
  }
`;
