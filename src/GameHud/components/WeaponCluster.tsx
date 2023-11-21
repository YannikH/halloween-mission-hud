import { useContext } from 'react';
import styled from 'styled-components';
import { GameHudData } from '../data'
import { KeyHelpContext } from '../GameHud';
import { Column, Row } from './Common'
import { getHelperKeys } from './Key';

const WeaponClusterBackground = styled.div`
  background-color: rgb(38 50 67 / 79%);
  padding: 0.5vw 1vw;
  transform: skew(-35deg, 0deg);
  padding-right: 120px;
  margin-right: -100px;
  margin-bottom: 10px;
`;

const SkewCounter = styled(Row)`
  transform: skew(35deg, 0deg);
`;

const WeaponClusterPositioner = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 15px;
  
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const WeaponImage = styled.img`
  max-height: 5vw;
  width: auto;
  padding-right: 20px;
`;

const MagazineImage = styled.img`
  width: 16px;
  height: 16px;
  margin: 0px 5px;
`;

const AmmoColumn = styled(Column)`
  padding-right: 15px;
  border-right: solid 1px white;
  min-width: 80px;
`;

const StanceIndicator = styled.img`
  max-height: 5vw;
  width: auto;
  padding-left: 20px;
  margin-right: -2vw;
`;

const LockIcon = styled.img`
  position: absolute;
  top: 25%;
  left: 50%;
  height: 50%;
  margin-left:-12.5%;
  width: auto;
`;

const WeaponCluster = ({gameHudData}: {gameHudData: GameHudData}) => {
  const keysConfig = useContext(KeyHelpContext);
  const keys = getHelperKeys(keysConfig, 'BR');
  const isSafe = gameHudData.firemodeName === 'Safe';
  const weaponOpacity = isSafe ? '20%' : '100%';
  return (
    <WeaponClusterPositioner>
      <WeaponClusterBackground>
        <SkewCounter>
          <div style={{position: 'relative'}}>
            <LockIcon
              src="lock-icon.png"
              hidden={!isSafe}
            />
            <WeaponImage
              src={gameHudData.currentWeaponIcon}
              style={{opacity: weaponOpacity}}
            />
          </div>
          <AmmoColumn>
            <span>{gameHudData.firemodeName} | {gameHudData.ammoName}</span>
            <Row>
              {gameHudData.ammo}
              <MagazineImage src={gameHudData.magazineIcon} />
              x{gameHudData.magazines}
            </Row>
          </AmmoColumn>
          <StanceIndicator src="run.png" />
          </SkewCounter>
      </WeaponClusterBackground>
      <Row style={{justifyContent: 'flex-end'}}> { keys } </Row>
    </WeaponClusterPositioner>
  )
};

export default WeaponCluster