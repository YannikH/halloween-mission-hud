import { createContext } from "react";
import styled, { ThemeProvider } from "styled-components";
import BottomLeft from "./components/BottomLeft";
import { Column, FixedContainer } from "./components/Common";
import ItemHelp from "./components/ItemHints";
import Key, { getHelperKeys } from "./components/Key";
import WeaponCluster from "./components/WeaponCluster";
import { GameHudData, KeyHelper, WeaponInfo } from "./data";

const GameHudContainer = styled(FixedContainer)`
  width: 100%;
  height: 100%;
  background: none;
  position: relative;
  overflow: hidden;
`;

const ContextContainer = styled(FixedContainer)`
  top: 70%;
  left: 0;
`;

declare global {
  interface Window {
    UpdateGameData: (gameVars: any) => void;
    ShowKeybindHint: (keybind: KeyHelper) => void;
    RemoveKeybindHint: ({id}: {id: string}) => void;
  }
}


export const ControllerContext = createContext(true);
export const KeyHelpContext = createContext([] as KeyHelper[]);

const GameHud = ({gameHudData, setGameHudData}: {gameHudData: GameHudData, setGameHudData: React.Dispatch<GameHudData>}) => {
  const updateGameData = (gameVars: any) => {
    setGameHudData({
      ...gameHudData,
      ...gameVars
    })
  };

  const ShowKeybindHint = (keybind: KeyHelper) => {
    gameHudData.keyHelpers.push(keybind);
    setGameHudData({
      ...gameHudData
    })
  };
  const RemoveKeybindHint = (id: string) => {
    const remainingHelpers = gameHudData.keyHelpers.filter((help: KeyHelper) => {
      return help.id !== id
    });
    setGameHudData({
      ...gameHudData,
      keyHelpers: remainingHelpers
    });
  };

  window.UpdateGameData = updateGameData;
  window.ShowKeybindHint = ShowKeybindHint;
  window.RemoveKeybindHint = ({id}: {id: string}) => RemoveKeybindHint(id);

  const backgrounds = ['bg1.png', 'bg2.png'];
  const gameHudTheme = {
    background: backgrounds[gameHudData.background]
  };

  const keys = getHelperKeys(gameHudData.keyHelpers, 'CENTER');
  return (
    <ThemeProvider theme={gameHudTheme}>
      <KeyHelpContext.Provider value={gameHudData.keyHelpers}>
        <ControllerContext.Provider value={gameHudData.usingController}>
          <GameHudContainer>
            <ContextContainer>
              <Column> {keys} </Column>
            </ContextContainer>
            <WeaponCluster gameHudData={gameHudData} />
            <ItemHelp weaponInfo={gameHudData} />
            <BottomLeft />
          </GameHudContainer>
          </ControllerContext.Provider>
        </KeyHelpContext.Provider>
    </ThemeProvider>
  );
};

export default GameHud;