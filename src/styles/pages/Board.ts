import styled from "styled-components";

export const HtmlWrapper = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background-color: #FFFACD;
`
export const Logo = styled.div`
    font-size: 30px;
    font-family: cursive;
`
export const Text = styled(Logo)`
    font-size: 18px;
`
export const Container = styled.div`
    width:80%;
    height:75%;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    margin-top: 50px;
    gap: 50px;
`
export const SelectedBoard = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap: 20px;
`
export const BoardName = styled.div`
    width:100%;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    padding: 20px;
    background-color:#9ACD32;
    box-sizing: border-box;
`
export const ListDescription = styled.div`
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
export const AddList = styled.div`  
    width:100%;  
    height: 40px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family: cursive;
    font-size: 18px;
    cursor: pointer;
    background-color:#FFD700;
`
