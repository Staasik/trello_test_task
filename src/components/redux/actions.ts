// Определяем типы действий для досок
export const ADD_BOARD = 'ADD_BOARD'; // Действие для добавления доски
export const DELETE_BOARD = 'DELETE_BOARD'; // Действие для удаления доски
export const LOAD_BOARDS = 'LOAD_BOARDS'; // Действие для загрузки досок

type Board = {
    id: number; 
    name: string; 
    lists: List[];
};

type List = {
    id: number; 
    name: string; 
    items: Item[]; 
};

type Item = {
    id: number; 
    name: string; 
    done: boolean;
};

// Определяем общий тип для всех действий связанных с досками
export type BoardAction =
    | { type: typeof ADD_BOARD; payload: Board } // Добавление доски
    | { type: typeof DELETE_BOARD; payload: number } // Удаление доски
    | { type: typeof LOAD_BOARDS; payload: Board[] } // Загрузка списка досок

// Создаем действие для добавления доски
export const addBoard = (board: Board): BoardAction => ({
    type: ADD_BOARD,
    payload: board,
});

// Создаем действие для удаления доски
export const deleteBoard = (boardId: number): BoardAction => ({
    type: DELETE_BOARD,
    payload: boardId,
});

// Создаем действие для загрузки досок
export const loadBoards = (boards: Board[]): BoardAction => ({
    type: LOAD_BOARDS,
    payload: boards,
});

// Определяем типы действий для списков
export const ADD_LIST = 'ADD_LIST'; // Добавление списка
export const DELETE_LIST = 'DELETE_LIST'; // Удаление списка

// Определяем типы действий для пунктов
export const ADD_ITEM = 'ADD_ITEM'; // Добавление пункта
export const DELETE_ITEM = 'DELETE_ITEM'; // Удаление пункта
export const UPDATE_ITEM = 'UPDATE_ITEM'; // Обновление итема
export const REORDER_ITEMS = 'REORDER_ITEMS'; // Обновление списка итемов после перетаскивания

// Определяем общий тип для всех действий связанных с списками
export type ListAction =
    | { type: typeof ADD_LIST; payload: { boardId: number; list: List } } // Добавление списка
    | { type: typeof DELETE_LIST; payload: { boardId: number; listId: number } } // Удаление списка

// Определяем общий тип для всех действий связанных с пунктами
export type ItemAction =
    | { type: typeof ADD_ITEM; payload: { boardId: number; listId: number; item: Item } } // Добавление пункта
    | { type: typeof DELETE_ITEM; payload: { boardId: number; listId: number; itemId: number } } // Удаление пункта    
    | { type: typeof UPDATE_ITEM; payload:{boardId: number; listId: number; itemId: number }} // Обновление состояния выполненного или нет итема
    | { type: typeof REORDER_ITEMS; payload:{boardId: number; listId: number; startIndex: number, endIndex: number}}; // Обновление списка итемов после перетаскивания

// Создаем действие для добавления списка
export const addList = (boardId: number, list: List): ListAction => ({
    type: ADD_LIST,
    payload: { boardId, list },
}); 

// Создаем действие для удаления списка
export const deleteList = (boardId: number, listId: number): ListAction => ({
    type: DELETE_LIST,
    payload: { boardId, listId },
});

// Создаем действие для добавления пункта
export const addItem = (boardId: number, listId: number, item: Item): ItemAction => ({
    type: ADD_ITEM,
    payload: { boardId, listId, item },
});

// Создаем действие для удаления пункта
export const deleteItem = (boardId: number, listId: number, itemId: number): ItemAction => ({
    type: DELETE_ITEM,
    payload: { boardId, listId, itemId },
});

// Действие для обновления состояния итема, выполнен или нет
export const doItem = (boardId: number, listId: number,itemId: number): ItemAction => ({
    type: UPDATE_ITEM,
    payload: { boardId, listId, itemId },
  });

// Действие для обновления порядка элементов в списке итемов после перетаскивания
export const reorderItems = (boardId: number, listId: number, startIndex: number, endIndex: number) => ({
    type: REORDER_ITEMS,
    payload: { boardId, listId, startIndex, endIndex },
  });

