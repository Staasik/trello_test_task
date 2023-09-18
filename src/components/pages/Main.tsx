import {HtmlWrapper,Logo,Text,Container,BoardName,NewBoard,Description,Name,Save,Cansel,Buttons,StyledLink,SvgAdd,SvgClose} from "../../styles/pages/Main";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Boards from "../elements/Boards";
import { addBoard, loadBoards } from "../../redux/actions";

function Main() {
  const [newBoard, setNewBoard] = useState<boolean>(false); // Состояние для новой доски
  const [boardName, setBoardName] = useState<string>(""); // Состояние для имени новой доски

  const dispatch = useDispatch();// Получение функции диспетчера для отправки действий в Redux

  useEffect(() => {
    const storedBoards = localStorage.getItem("boards"); // При инициализации компонента загружаем список досок из локального хранилища
    if (storedBoards) {
      dispatch(loadBoards(JSON.parse(storedBoards))); // Загружаем доски, если они есть
    }
  }, [dispatch]);

  // Обработчик сохранения новой доски
  function saveBoard() {
    if (boardName.trim() !== "") {
      const newBoard = {id: Date.now(), name: boardName,lists: []}; // Создаем новый элемент
      dispatch(addBoard(newBoard)); // Добавляем новую доску в Redux состояние
      setBoardName("");
      setNewBoard(false);
    }
  }

  // Обработчик открытия формы для создания новой доски
  function createBoard() {
    setNewBoard(true);
  }

  // Обработчик закрытия формы для создания новой доски
  function closeBoard() {
    setNewBoard(false);
    setBoardName(""); // Очищаем текстовое поле при закрытии формы
  }

  return (
    <HtmlWrapper>
      <Logo><StyledLink to="/">Trello😀</StyledLink></Logo>
      <Container>
        {newBoard ? 
          <NewBoard>
            <BoardName>
              <SvgAdd/>
              <Text>Новая доска</Text>
              <SvgClose style={{ cursor: "pointer"}} onClick={() => closeBoard()}/>
            </BoardName>
            <Description>
              <Text>Название доски</Text>
              <Name
                placeholder="Введите название вашей доски"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                maxLength={25}>
              </Name>
              <Buttons>
                <Cansel onClick={() => closeBoard()}>Отмена</Cansel>
                <Save onClick={() => saveBoard()}>Сохранить</Save>
              </Buttons>
            </Description>
          </NewBoard>
         : 
          <NewBoard>
            <BoardName style={{ cursor: "pointer" }} onClick={() => createBoard()}>
              <SvgAdd/>
              <Text>Новая доска</Text>
            </BoardName>
          </NewBoard>
        }
        <Boards/>
      </Container>
    </HtmlWrapper>
  );
}

export default Main;