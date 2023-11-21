import { useContext } from "react";
import styled from "styled-components";
import { FixedContainer } from "./Common";
import { KeyHelpContext } from "../GameHud"
import { getHelperKeys } from "./Key";

const BottomLeftContainer = styled(FixedContainer)`
  width: auto;
  height: auto;
  bottom: 0;
  left: 0;
  padding: 15px;
`;

const BottomLeft = () => {
  const keysConfig = useContext(KeyHelpContext);
  const keys = getHelperKeys(keysConfig, 'BL');
  return (
    <BottomLeftContainer>
      { keys }
    </BottomLeftContainer>
  );
};

export default BottomLeft