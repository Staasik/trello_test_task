import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { AppState, List, findBoardWithId } from "../../redux/reducer";
import { addList, loadBoards } from "../../redux/actions";
import Lists from "../elements/Lists";
import {HtmlWrapper,Logo,Text,Container,AddList,SelectedBoard,ListDescription,Name,BoardName,} from "../../styles/pages/Board";

function MyBoard() {
  const { boardId } = useParams(); // Получение параметра из URL
  const [newList, setNewList] = useState<boolean>(false); // Состояние для нового листа
  const [listName, setListName] = useState<string>(""); // Состояние для имени нового листа

  const boards = useSelector((state: AppState) => state.boards); // Получение списка досок из Redux состояния
  const dispatch = useDispatch(); // Получение функции диспетчера для отправки действий в Redux
  const currentBoardId = parseInt(boardId!); // Айди текущей доски
  const currentBoard = findBoardWithId(boards, currentBoardId); // Найти доску по айди

  useEffect(() => {
    const storedBoards = localStorage.getItem("boards"); // При инициализации компонента загружаем список досок из локального хранилища
    if (storedBoards) {
      dispatch(loadBoards(JSON.parse(storedBoards))); // Загружаем доски, если они есть
    }
  }, [dispatch]);

  // Обработчик открытия формы для создания нового листа
  function createList() {
    setNewList(true);
  }
  // Обработчик закрытия формы для создания нового листа
  function closeList() {
    setNewList(false);
    setListName(""); // Очищаем текстовое поле при закрытии формы
  }
  // Обработчик нажатия на энтер для сохранения нового листа
  function handleEnterPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      saveList();
    }
  }

  // Обработчик сохранения нового листа
  function saveList() {
    if (listName.trim() !== "") {
      const newList: List = {id: Date.now(), name: listName, items: []}; // Создаем новый элемент
      dispatch(addList(currentBoard.id, newList)); // Добавляем новый лист в Redux состояние
      setListName("");
      setNewList(false);
    }
  }

  return (
    <HtmlWrapper>
      <Logo><Link to="/" style={{ textDecoration: "none", color: "black" }}>Trello😀</Link></Logo>
      <Container>
        <SelectedBoard>
          <BoardName>
            <Text>{currentBoard?.name}</Text>
          </BoardName>
          <AddList onClick={createList}>Добавить список</AddList>
          {newList && (
            <ListDescription>
              <Name
                placeholder="Введите название списка"
                maxLength={25}
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                onKeyDown={handleEnterPress}
              />
              <Text style={{ cursor: "pointer" }} onClick={closeList}>✖️</Text>
            </ListDescription>
          )}
        </SelectedBoard>
        <Lists currentBoardId={currentBoardId} />
      </Container>
    </HtmlWrapper>
  );
}

export default MyBoard;