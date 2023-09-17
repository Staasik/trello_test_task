import styled from "styled-components";

export const Text = styled.div`
    font-family: cursive;
    font-size: 18px;
`
export const ListsContainer = styled.div`
    width:100%;
    height:100%;
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
    align-items:flex-start;
    gap: 20px;
    overflow-x: auto;
    overflow-y: auto;
`
export const ListName = styled.div`
    width:100%;
    height:50px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 20px;
    background-color:#9ACD32;
    box-sizing: border-box;
`
export const ListItem = styled(ListName)`
    min-width:350px;
    background-color:#FFD700;
    flex-direction: column;
    height:auto;    
    @media (max-width: 800px) {
        min-width:100%;  
    }
`
export const ItemDescription = styled.div`
    width:100%;
    height:100px;
    display:flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
    padding: 20px;
    gap: 20px;
    background-color:#FFFFFF;
    box-sizing: border-box;
`
export const Name = styled.textarea` 
    width:100%;   
    height:50px;
    border: 1px solid black;
    padding: 10px;
    font-family: cursive;
    font-size: 14px;
    background-color:#FFFACD;
    box-sizing: border-box;
    resize: none;
`

