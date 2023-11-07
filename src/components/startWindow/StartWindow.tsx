import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../img/arrow.svg";
import { ReactComponent as Probel } from "../../img/propbel.svg";

const BoxWindow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  flex-direction: column;
  background-color: #e6af4a;
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
      <H1>энерголабиринт</H1>
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
    </BoxWindow>
  );
};

export default StartWindow;
