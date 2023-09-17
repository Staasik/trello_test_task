import styled from "styled-components";

export const Text = styled.div`
    font-family: cursive;
    font-size: 18px;
`
export const ItemsContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    gap: 10px;
    margin-top: 20px;
`
interface ItemElementProps {
    $done: boolean;
}

export const ItemElement = styled.div<ItemElementProps>`
    width:100%;  
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    align-items:center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    background-color:${({ $done }) => $done ? "gray" : "#FFA07A"};
    @media (max-width: 800px) {
        min-width:100%;  
    }
`


