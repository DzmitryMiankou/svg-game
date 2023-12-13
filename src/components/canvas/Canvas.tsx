import React, { FC, useState, useCallback, useEffect } from "react";
import { StateSizeCanvasType } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { setKoordActionX, setKoordActionY } from "../../redux/koordReducer";
import styled from "styled-components";
import ActiveElement from "./active/ActiveElement";
import {
  labyrinthProp,
  BrikcsProp,
  noActiveElemntProp,
  LabyrinthPropType,
} from "./ElementProps";
import { ColourEnum } from "../../types/enum/ColourEnum";
import { CharacterSizeType } from "../../types/type/gameType";
import Data from "../../data/data.json";
import keyImg from "../../img/key.png";
import titleImg from "../../img/title.png";

const enum KeyEnum {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  w = "w",
  s = "s",
  d = "d",
  a = "a",
}

const SVG = styled.svg<{ $light: number }>`
  width: 100%;
  filter: ${(prop) =>
    prop.$light === 8 ? "grayscale(100%)" : "grayscale(0%)"};
`;

const Text = styled.text`
  fill: #fdde46;
  font-size: 46px;
  @media (max-width: 770px) {
    font-size: 30px;
  }
`;

const Canvas: FC<{ get: StateSizeCanvasType }> = ({ get }) => {
  const state: { data: { id: string }[] } = useSelector(
    (store: RootState) => store.game
  );
  const store = useSelector((state: RootState) => state.koord);
  const [revers, setRevers] = useState<boolean>(false);
  const [key, setKey] = useState<string>();
  const dispatch: AppDispatch = useDispatch();

  const { height, width } = get;

  const CharacterProp: CharacterSizeType = {
    size: Math.floor(width / 37),
    step: Math.floor(width / 280),
  };

  const switchKeys = useCallback(
    (key: string): void => {
      setKey(key);
      switch (key) {
        case KeyEnum.d:
        case KeyEnum.ArrowRight:
          setRevers(false);
          setKey(key);
          dispatch(setKoordActionX(CharacterProp.step));
          break;
        case KeyEnum.a:
        case KeyEnum.ArrowLeft:
          setRevers(true);
          setKey(key);
          dispatch(setKoordActionX(-CharacterProp.step));
          break;
        case KeyEnum.w:
        case KeyEnum.ArrowUp:
          setKey(key);
          dispatch(setKoordActionY(-CharacterProp.step));
          break;
        case KeyEnum.s:
        case KeyEnum.ArrowDown:
          setKey(key);
          dispatch(setKoordActionY(CharacterProp.step));
          break;
        default:
          break;
      }
    },
    [dispatch, CharacterProp.step]
  );

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent): void =>
      switchKeys(event.key);

    window.addEventListener("keydown", keyDownHandler);
    return window.removeEventListener("keyup", keyDownHandler);
  }, [switchKeys]);

  useEffect((): void => {
    if (store.x < 0) dispatch(setKoordActionX(CharacterProp.step));
    if (store.x > width - CharacterProp.size)
      dispatch(setKoordActionX(-CharacterProp.step));
    if (store.y > height - CharacterProp.size)
      dispatch(setKoordActionY(-CharacterProp.step));
    if (store.y < 0) dispatch(setKoordActionY(CharacterProp.step));

    const colisObj = (
      step: number,
      hero: number,
      props: LabyrinthPropType<number>
    ): void => {
      if (
        store.x < props.x + props.width &&
        store.x + hero > props.x &&
        store.y < props.y + props.height &&
        store.y + hero > props.y
      ) {
        if (key === KeyEnum.ArrowRight || key === KeyEnum.d)
          dispatch(setKoordActionX(-step));
        if (key === KeyEnum.ArrowLeft || key === KeyEnum.a)
          dispatch(setKoordActionX(step));
        if (key === KeyEnum.ArrowDown || key === KeyEnum.s)
          dispatch(setKoordActionY(-step));
        if (key === KeyEnum.ArrowUp || key === KeyEnum.w)
          dispatch(setKoordActionY(step));
      }
    };

    labyrinthProp(width).forEach((props) =>
      colisObj(CharacterProp.step, CharacterProp.size, props)
    );
  }, [
    dispatch,
    height,
    CharacterProp.size,
    CharacterProp.step,
    key,
    store.x,
    store.y,
    width,
  ]);

  return (
    <SVG
      $light={state.data.length}
      x="0px"
      y="0px"
      viewBox={`0 0 ${width} ${height}`}
      enableBackground={`new 0 0 ${width} ${height}`}
    >
      <rect
        fill={ColourEnum.BGColour}
        width={width}
        height={height}
        stroke={ColourEnum.WallColour}
        strokeWidth="1%"
      />
      {noActiveElemntProp(width).map((prop) => (
        <image overflow="visible" {...prop} />
      ))}
      {labyrinthProp(width).map((prop) => (
        <rect fill={ColourEnum.WallColour} {...prop} />
      ))}
      {BrikcsProp(width).map((props) => (
        <image {...props} />
      ))}
      <ActiveElement
        revers={revers}
        width={width}
        height={height}
        storeX={store.x}
        storeY={store.y}
        sizeCh={CharacterProp.size}
        keyd={key}
        CharacterProp={CharacterProp}
        state={state}
        data={Data}
      />
      <Text x={Math.floor(width / 1.13)} y={Math.floor(width / 24)}>
        {`${state.data.length}`}
      </Text>
      <image
        width={Math.floor(width / 44)}
        x={Math.floor(width / 1.1)}
        y={Math.floor(width / 120)}
        xlinkHref={keyImg}
      />
      <Text x={Math.floor(width / 1.06)} y={Math.floor(width / 24)}>
        {`из ${Data.filter((el) => el.answer !== "").length}`}
      </Text>
      <image
        x={Math.floor(width / 2.12)}
        y={Math.floor(width / 270)}
        width={Math.floor(width / 3)}
        xlinkHref={titleImg}
      />
    </SVG>
  );
};

export default Canvas;
