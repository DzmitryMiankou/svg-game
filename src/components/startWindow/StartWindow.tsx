import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const BoxWindow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  font-size: 3rem;
  text-transform: uppercase;
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
    </BoxWindow>
  );
};

export default StartWindow;
