import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../redux/reducer";
import { BoardsContainer, Text, BoardItem } from "../../styles/elements/Boards";
import { deleteBoard } from "../../redux/actions";
import { Link } from "react-router-dom";

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
          <Link to={`/board/${board.id}`} style={{ textDecoration: "none", color: "black" }}><Text>{board.name}</Text></Link>
          <Text style={{ cursor: "pointer" }} onClick={() => handleDeleteBoard(board.id)}>✖️</Text>
        </BoardItem>
      ))}
    </BoardsContainer>
  );
};

export default Boards;