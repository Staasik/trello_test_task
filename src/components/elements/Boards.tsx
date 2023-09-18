import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/reducer";
import { BoardsContainer, Text, BoardItem } from "../../styles/elements/Boards";
import { deleteBoard } from "../../redux/actions";
import {StyledLink,SvgClose} from "../../styles/pages/Main";

const Boards: React.FC = () => {
  const boards = useSelector((state: AppState) => state.boards); // Получение списка досок из Redux состояния
  const dispatch = useDispatch();// Получение функции диспетчера для отправки действий в Redux

  // Удаляем доску по айди
  const handleDeleteBoard = (boardId: number) => {
    dispatch(deleteBoard(boardId)); // Диспетчеризируем действие удаления доски
  };

  return (
    <BoardsContainer>
      {boards.map((board, index) => (
        <BoardItem key={index}>
          <StyledLink to={`/board/${board.id}`}><Text>{board.name}</Text></StyledLink>
          <SvgClose style={{ cursor: "pointer" }} onClick={() => handleDeleteBoard(board.id)}/>
        </BoardItem>
      ))}
    </BoardsContainer>
  );
};

export default Boards;