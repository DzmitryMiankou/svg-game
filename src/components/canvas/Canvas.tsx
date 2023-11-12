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
import { CharacterSizeType } from "../../types/enum/type/gameType";

const enum KeyEnum {
  ArrowRight = "ArrowRight",
  ArrowLeft = "ArrowLeft",
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  w = "w",
  s = "s",
  d = "d",
  a = "a",
  R = "˃",
  L = "˂",
  U = "˄",
  D = "˅",
}

const SVG = styled.svg`
  width: 100%;
`;

const ButBox = styled.div`
  display: flex;
  flex-direction: column;
  width: min-content;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 14px;
  opacity: 40%;
  margin: 2px;
`;

const Text = styled.text`
  fill: #d4ccb4;
  font-size: 40px;
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
    size: Math.floor(width / 34),
    step: Math.floor(width / 280),
  };

  const switchKeys = useCallback(
    (key: string): void => {
      setKey(key);
      switch (key) {
        case KeyEnum.R:
        case KeyEnum.d:
        case KeyEnum.ArrowRight:
          setRevers(false);
          setKey(key);
          dispatch(setKoordActionX(CharacterProp.step));
          break;
        case KeyEnum.L:
        case KeyEnum.a:
        case KeyEnum.ArrowLeft:
          setRevers(true);
          setKey(key);
          dispatch(setKoordActionX(-CharacterProp.step));
          break;
        case KeyEnum.U:
        case KeyEnum.w:
        case KeyEnum.ArrowUp:
          setKey(key);
          dispatch(setKoordActionY(-CharacterProp.step));
          break;
        case KeyEnum.D:
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
        if (
          key === KeyEnum.ArrowRight ||
          key === KeyEnum.R ||
          key === KeyEnum.d
        )
          dispatch(setKoordActionX(-step));
        if (key === KeyEnum.ArrowLeft || key === KeyEnum.L || key === KeyEnum.a)
          dispatch(setKoordActionX(step));
        if (key === KeyEnum.ArrowDown || key === KeyEnum.D || key === KeyEnum.s)
          dispatch(setKoordActionY(-step));
        if (key === KeyEnum.ArrowUp || key === KeyEnum.U || key === KeyEnum.w)
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
      />
      <foreignObject x={width - 90} y={height / 1.4} width={80} height={42}>
        {["˂", "˃"].map((dats) => (
          <Button key={dats} onMouseDown={() => switchKeys(dats)}>
            {dats}
          </Button>
        ))}
      </foreignObject>
      <foreignObject x={width / 50} y={height / 1.5} width={40} height={90}>
        <ButBox>
          {["˄", "˅"].map((dats) => (
            <Button key={dats} onMouseDown={() => switchKeys(dats)}>
              {dats}
            </Button>
          ))}
        </ButBox>
      </foreignObject>
      <Text x={width / 1.24} y={width / 24}>
        {`${state.data.length} ключа из 11`}
      </Text>
    </SVG>
  );
};

export default Canvas;
