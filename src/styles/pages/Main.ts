import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdDone } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';
import { MdClose } from 'react-icons/md';

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
    flex-direction:row;
    justify-content:space-between;
    align-items:flex-start;
    margin-top: 50px;
    @media (max-width: 800px) {
        flex-direction:column;    
        gap:50px;    
    }
`
export const NewBoard = styled.div`
    width:45%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap: 20px;
    @media (max-width: 800px) {
        width:100%;  
    }
`
export const BoardName = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    padding: 20px;
    align-items:center;
    background-color:#9ACD32;
    box-sizing: border-box;
`
export const Description = styled.div`
    width:100%;
    height:200px;
    display:flex;
    flex-direction: column;
    justify-content:center;
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
export const Buttons = styled.div`  
    width:100%;     
    display:flex;
    flex-direction: row;
    justify-content:space-between;
`
export const Save = styled.div`  
    width:45%;  
    height: 40px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family: cursive;
    font-size: 18px;
    cursor: pointer;
    background-color:#9ACD32;
`
export const Cancel = styled(Save)`  
    background-color:#FFD700;
`
export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`
export const SvgDone = styled(MdDone)`
    width:25px;  
    height: 25px;
    cursor:pointer;
`
export const SvgAdd = styled(MdAdd)`
    width:25px;  
    height: 25px;
`
export const SvgClose = styled(MdClose)`
    width:25px;  
    height: 25px;
    cursor:pointer;
`


