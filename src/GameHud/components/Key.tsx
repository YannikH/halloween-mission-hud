import React, { useContext } from "react";
import styled from "styled-components";
import { KeyHelper, KeyRegion } from "../data";
import { ControllerContext } from "../GameHud";
import { Row } from "./Common";

export type KeyParams = {
  pc: string[];
  xbox: string[];
  hint: string;
};

export const KeyCap = styled.span`
  background-color: #222222;
  border: solid 1px #fff;
  min-height: 32px;
  min-width: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  text-align: center;
  font-size: 17px;
  margin-right: 10px;
  margin-left: 10px;
  :first-child {
    margin-left: 0px;
  }
`;


export const ControllerButtonSimple = styled.span`
  background-color: #222222;
  border: solid 1px gray;
  min-height: 32px;
  min-width: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-align: center;
  font-size: 17px;
  margin-right: 10px;
  margin-left: 10px;
  :first-child {
    margin-left: 0px;
  }

  box-shadow: rgb(56 56 56) -1px 0px 5px 5px inset;
  -webkit-box-shadow: rgb(56 56 56) -1px 0px 5px 5px inset;
  -moz-box-shadow: rgb(56 56 56) -1px 0px 5px 5px inset;
`;

export const Dpad = styled.img`
  width: 40px;
  height: 40px;
`;

export const Bumper = styled.span`
  background-color: #222222;
  border: solid 1px white;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px 5px 0 0;
  height: 24px;
  width: 32px;
  font-size: 15px;
  padding: 0 3px;
  margin-right: 10px;
`;

export const Trigger = styled.span`
  background-color: #222222;
  border: solid 1px white;
  color: white;
  height: 32px;
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  padding: 0 3px;
  margin-right: 10px;
  border-radius: 3px;
`;

export const ControllerButton = ({children}: {children?: React.ReactNode}) => {
  if (typeof children === 'string' && children.includes('arr')) {
    const [_, direction] = children.split('_');
    let rotation = '0deg';
    switch (direction) {
      case 'right': rotation =  '90deg'; break;
      case 'down':  rotation = '180deg'; break;
      case 'left':  rotation = '270deg'; break;
    }
    const element = <Dpad src='dpad.png' style={{rotate: rotation}} />
    return element
  }
  if (children === 'LB' || children === 'RB') {
    return <Bumper> {children} </Bumper>
  };
  if (children === 'LT' || children === 'RT') {
    return <Trigger> {children} </Trigger>
  };
  return <ControllerButtonSimple> {children } </ControllerButtonSimple>
};

const KeyRow = styled(Row)`
  /* background-color: rgb(50 50 50 / 74%); */
  border-radius: 16px;
  padding-right: 10px;
  color: white;
`;

const HintText = styled.span`
  font-size: 23px;
  letter-spacing: 1px;
  text-transform: capitalize;
  text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
  -webkit-text-stroke: 1px #000;
  font-weight: 900;
`;

export const getHelperKeys = (keys: KeyHelper[], region: KeyRegion) => {
  const filtered = keys.filter(key => key.region == region);
  return filtered.map(key => <Key {...key}/>);
};

const Key = ({pc, xbox, hint}: KeyParams) => {
  const isXbox = useContext(ControllerContext);
  const KeyType = isXbox ? ControllerButton : KeyCap;
  const keysArray = isXbox ? xbox : pc;

  let keys: any = <></>;
  if (keysArray.length == 1) {
    keys = <KeyType>{keysArray[0]}</KeyType>
  } else {
    keys = keysArray.map((key, index) => {
      if (index < keysArray.length - 1) {
        return <><KeyType>{key}</KeyType> + </>
      } else {
        return <KeyType>{key}</KeyType>
      }
    });
  }

  if (!hint) return keys

  return (
    <KeyRow>
    {keys} <HintText>{hint}</HintText>
    </KeyRow>
  )
};

export default Key