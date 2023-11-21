import styled from "styled-components";
import { WeaponInfo } from "../data";
import { Column, Row, FixedContainer } from "./Common";
import Key from "./Key";


const ItemHelpContainer = styled.div`
  width: 100%;
  position: absolute;
  padding: 15px;
  bottom: 0;
  left: 0;
`;

const MiniImg = styled.img`
  height:30px;
  width: auto;
  padding-bottom: 10px;
`;

const ItemColumn = styled(Column)`
  width: 70px;
`;

const ItemHelp = ({weaponInfo}: {weaponInfo: WeaponInfo}) => {
  return (
    <ItemHelpContainer>
      <Column>
        <Row>
          <ItemColumn>
            <MiniImg src={weaponInfo.primaryIcon}/>
            <Key pc={['1']} xbox={['arr_left']} hint={''} />
          </ItemColumn>
          
          <ItemColumn>
            <MiniImg src={weaponInfo.secondaryIcon}/>
            <Key pc={['2']} xbox={['arr_up']} hint={''} />
          </ItemColumn>
          
          <ItemColumn>
            <MiniImg src={weaponInfo.launcherIcon}/>
            <Key pc={['3']} xbox={['arr_right']} hint={''} />
          </ItemColumn>
          
          <ItemColumn>
            <MiniImg src={weaponInfo.grenadeIcon}/>
            <Key pc={['4']} xbox={['arr_down']} hint={''} />
          </ItemColumn>
        </Row>
      </Column>
    </ItemHelpContainer>
  )
};

export default ItemHelp;