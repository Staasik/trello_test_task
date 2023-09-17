import styled from "styled-components";

export const Text = styled.div`
    font-family: cursive;
    font-size: 18px;
`
export const BoardsContainer = styled.div`
    width:45%;
    height:100%;    
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    gap: 20px;
    overflow-y: auto;
    @media (max-width: 800px) {
        width:100%;  
    }
`
export const BoardItem = styled.div`
    width:100%;
    height:50px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding: 20px;
    background-color:#9ACD32;
    box-sizing: border-box;
`