import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, Item, findBoardWithId } from "../redux/reducer";
import { ListsContainer, Text, ListItem, Name, ItemDescription, ListName } from "../../styles/elements/Lists";
import { addItem, deleteList, deleteItem,reorderItems } from "../redux/actions";
import Items from "./Items";
import { useDrop } from 'react-dnd'

// Пропсы компонента, которые ожидаются при его использовании
interface DropTargetListProps {
  currentListId: number;
  currentBoardId: number;
}

const DropTargetList: React.FC<DropTargetListProps> = ({ currentListId, currentBoardId }) => {

  const dispatch = useDispatch();// Получение функции диспетчера для отправки действий в Redux

  //Обработчик события "drop", который вызывается при бросании перетаскиваемого элемента
  const handleDrop = (item: { currentBoardId: number; currentListId: number; currentItem: Item }) => {
    // Проверяем перетаскиваем ли мы на другой лист наш итем
    if(currentListId !== item.currentListId){
      dispatch(deleteItem(item.currentBoardId, item.currentListId, item.currentItem.id));// Отправляем действие в Redux для удаления элемента из исходного списка
      const newItem: Item = {id: item.currentItem.id,name: item.currentItem.name,done: item.currentItem.done}// Создаем новый элемент с данными из перетаскиваемого элемента
      dispatch(addItem(currentBoardId, currentListId, newItem));// Отправляем действие в Redux для добавления нового элемента в текущий список
    }
  };

  // Используем хук useDrop для определения области, в которой можно бросить элемент
  const [, drop] = useDrop({
    accept: 'Item',// Тип перетаскиваемого элемента
    drop: (item: {currentBoardId: number; currentListId: number; currentItem: Item }) => handleDrop(item),// Функция когда элемент бросили
    collect: (monitor) => ({
      isOver: monitor.isOver()// Переменная isOver будет true, если элемент бросили
    })
  });

  return (
    <div style={{ width: "100%" }} ref={drop}>
      <Items currentListId={currentListId} currentBoardId={currentBoardId} />
    </div>
  );
};

// Пропсы компонента, которые ожидаются при его использовании
interface ListsProps {
  currentBoardId: number; 
}

const Lists: React.FC<ListsProps> = ({currentBoardId}) => {
  const boards = useSelector((state: AppState) => state.boards); // Получение списка досок из Redux состояния
  const dispatch = useDispatch(); // Получение функции диспетчера для отправки действий в Redux
  const currentBoard = findBoardWithId(boards, currentBoardId); // Найти доску по айди
  const lists = currentBoard?.lists; // Получение списков текущей доски

 // Функция для удаления списка по айди
  const handleDeleteList = (listId: number) => {
    dispatch(deleteList(currentBoard.id, listId)); // Диспетчеризация действия удаления списка
  };

  const [newItemNames, setNewItemNames] = useState<{ [key: number]: string }>({}); // Состояние имен итемов

  // Добавление нового итема списка
  const handleAddItem = (listIndex: number) => {
    const newItemName = newItemNames[listIndex]; // Получаем имя нового элемента из состояния
    if (newItemName.trim() !== "") {
      const newItem: Item = {id: Date.now(), name: newItemName, done: false,}; // Создаем новый элемент
      const currentList = currentBoard.lists[listIndex]; // Получаем текущий список по индексу
      dispatch(addItem(currentBoard.id, currentList.id, newItem)); // Отправляем действие addItem в Redux
      setNewItemNames((prev) => ({ ...prev, [listIndex]: "" })); // Очищаем имя нового элемента только для конкретного списка
    }
  };

  // Если пользователь нажал клавишу Enter
  const handleEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>, listIndex: number) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Предотвращаем стандартное действие (новая строка в текстовом поле)
      handleAddItem(listIndex); // Вызываем функцию для добавления элемента
    }
  };

  return (
    <ListsContainer>
      {lists?.map((list, listIndex) => (
        <ListItem key={listIndex}>
          <ListName>
            <Text>{list.name}</Text>
            <Text style={{ cursor: "pointer" }} onClick={() => handleDeleteList(list.id)}>✖️</Text>
          </ListName>
          <ItemDescription>
            <Name
              placeholder="Введите название элемента списка"
              maxLength={25}
              value={newItemNames[listIndex] || ""}
              onChange={(e) => setNewItemNames({ ...newItemNames, [listIndex]: e.target.value })}
              onKeyDown={(e) => handleEnterPress(e, listIndex)}
            />
          </ItemDescription>
          <DropTargetList currentListId={currentBoard?.lists[listIndex].id} currentBoardId={currentBoardId} />
        </ListItem>
      ))}
    </ListsContainer>
  );
};

export default Lists;