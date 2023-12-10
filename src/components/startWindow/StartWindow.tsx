import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../img/arrow.svg";
import { ReactComponent as Probel } from "../../img/propbel.svg";
import hero from "../../img/hero.png";

const BoxWindow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  background-color: #e6af4a;
  position: relative;
`;

const ButtonStart = styled.button`
  text-align: center;
  border: #3b2414 solid 3px;
  padding: 7px;
  background-color: #3b2414;
  color: #e6af4a;
  font-size: 2rem;
  text-transform: uppercase;
  transition: 0.2s;
  z-index: 1;
  &:hover {
    background-color: #e6af4a;
    color: #3b2414;
  }
`;

const H1 = styled.h1`
  font-size: 7rem;
  text-transform: uppercase;
  @media (max-width: 1100px) {
    font-size: 5rem;
  }
  @media (max-width: 770px) {
    font-size: 2rem;
  }
`;

const H2 = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
  @media (max-width: 770px) {
    font-size: 1rem;
  }
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  z-index: 1;
`;

const P = styled.p`
  text-align: center;
  font-size: 32px;
`;

const BoxImage = styled.div`
  width: 20%;
  min-width: 200px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 770px) {
    font-size: 1rem;
    min-width: 100px;
  }
`;
const BoxImage2 = styled(BoxImage)`
  width: 10%;
`;

const Hero = styled.img`
  position: absolute;
  left: -40px;
  bottom: 0px;
  z-index: 0;
  width: 20%;
`;

const Hero2 = styled(Hero)`
  left: 82%;
  bottom: 0px;
  width: 20%;
  transform: scaleX(-1);
`;

const StartWindow: React.FC<{
  setOpenPage: Dispatch<SetStateAction<boolean>>;
  handlePlay: () => void;
}> = ({ setOpenPage, handlePlay }) => {
  const handlerClick = (): void => {
    setOpenPage(true);
    handlePlay();
  };

  return (
    <BoxWindow>
      <div>
        <H1>энерголабиринт</H1>
        <P>помоги собрать пионеру все ключи</P>
      </div>
      <ButtonStart type="button" onClick={handlerClick}>
        начать игру
      </ButtonStart>
      <H2>управление игрой</H2>
      <Box>
        <BoxImage>
          <p>выполнить действие</p>
          <Probel />
        </BoxImage>
        <BoxImage2>
          <p>передвижение</p>
          <Arrow />
        </BoxImage2>
      </Box>
      <p>© Web-студия Гимназии №7 города Молодечно</p>
      <Hero src={hero} alt="png" />
      <Hero2 src={hero} alt="png" />
    </BoxWindow>
  );
};

export default StartWindow;
