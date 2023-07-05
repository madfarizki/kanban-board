import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import styled from "styled-components";
import { colors } from "../../constants";

const StyledSetting = styled.div`
    position: relative;
    display: inline-block;
    border-radius: 4px;
    width: 24px;
    height: 16px;
    text-align: center;
    cursor: pointer;
    &:hover {
        background: ${colors.NEUTRAL._30};
    }
`;

const StyledMenu = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 0px;
    z-index: 5;
    cursor: default;

    width: 320px;
    background: ${colors.NEUTRAL._10};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
`;

const StyledBackdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
`;

export default function Setting({ children = "" }) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            {showMenu && <StyledBackdrop onClick={() => setShowMenu(false)} />}
            <StyledSetting onClick={() => setShowMenu(!showMenu)}>
                <BsThreeDots size={20} />
                {showMenu && <StyledMenu>{children}</StyledMenu>}
            </StyledSetting>
        </>
    );
}
