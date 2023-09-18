import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState, Item, findBoardWithId, findListWithId } from "../../redux/reducer";
import { ItemsContainer, Text, ItemElement } from "../../styles/elements/Items";
import { deleteItem, doItem, reorderItems } from "../../redux/actions";
import { useDrag, useDrop } from "react-dnd";
import {SvgClose,SvgDone} from "../../styles/pages/Main";

// Пропсы компонента, которые ожидаются при его использовании
interface DraggableItemProps {
  currentItem: Item;
  currentBoardId: number;
  currentListId: number;
  itemIndex: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ currentItem, currentBoardId, currentListId, itemIndex }) => {
  const dispatch = useDispatch(); // Получение функции диспетчера для отправки действий в Redux

  // Функция для удаления итема списка по айди
  const handleDeleteItem = (itemId: number) => {
    dispatch(deleteItem(currentBoardId, currentListId, itemId)); // Диспетчеризация действия удаления итема списка
  };

  // Функция для обработки клика на галочку
  const handleCheckClick = (itemId: number) => {
    dispatch(doItem(currentBoardId, currentListId, itemId)); // Диспетчеризация действия обновления итема списка
  };

  // Используем хук useDrag для настройки перетаскивания элементов
  const [, dragRef] = useDrag({
    type: "Item", // Тип перетаскиваемого элемента
    item: { currentBoardId, currentListId, currentItem, index: itemIndex }, // Задаем объект, который будет передаваться во время перетаскивания
  });

  // Используем хук useDrop для определения области, в которой можно бросить элемент
  const [, dropRef] = useDrop({
    accept: "Item", // Тип, который элемент может принимать
    hover: (draggedItem: { currentBoardId: number; currentListId: number; currentItem: Item; index: number }) => {
      // Проверяем, что перетаскиваемый элемент находится в том же самом списке и имеет различный индекс
      if (draggedItem.currentListId === currentListId && draggedItem.index !== itemIndex) {
        dispatch(reorderItems(currentBoardId, currentListId, draggedItem.index, itemIndex));// Вызываем действие reorderItems для перемещения элемента с draggedItem.index на позицию index
        draggedItem.index = itemIndex;// Устанавливаем новый индекс перетаскиваемого элемента
      }
    },
  });

  return (
    <ItemElement $done={currentItem.done} ref={(node) => dropRef(dragRef(node))}>
      <Text>{currentItem.name}</Text>
      {currentItem.done ?
        <SvgClose onClick={() => handleDeleteItem(currentItem.id)}/>
      : 
        <SvgDone onClick={() => handleCheckClick(currentItem.id)}/>
      }
    </ItemElement>
  );
};

// Пропсы компонента, которые ожидаются при его использовании
interface ItemsProps {
  currentBoardId: number;
  currentListId: number;
}

const Items: React.FC<ItemsProps> = ({ currentBoardId, currentListId }) => {
  const boards = useSelector((state: AppState) => state.boards); // Получение списка досок из Redux состояния
  const currentBoard = findBoardWithId(boards, currentBoardId); // Найти доску по айди
  const currentList = findListWithId(currentBoard, currentListId); // Найти список по айди

  return (
    <ItemsContainer>
      {currentList?.items?.map((item, itemIndex) => (
        <DraggableItem
          key={itemIndex}
          currentItem={item}
          currentBoardId={currentBoardId}
          currentListId={currentListId}
          itemIndex={itemIndex}
        />
      ))}
    </ItemsContainer>
  );
};

export default Items;