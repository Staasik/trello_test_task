import { ADD_BOARD, DELETE_BOARD, REORDER_ITEMS, LOAD_BOARDS, UPDATE_ITEM, BoardAction, ListAction, ItemAction, ADD_LIST, DELETE_LIST, ADD_ITEM, DELETE_ITEM } from './actions';

export interface Item {
    id: number;
    name: string;
    done: boolean;
}

export interface List {
    id: number;
    name: string;
    items: Item[];
}

export interface Board {
    id: number;
    name: string;
    lists: List[];
}

// Определяем интерфейс состояния приложения
export interface AppState {
    boards: Board[]; // Массив досок
    currentBoardIndex: number; // Индекс текущей доски
}

// Начальное состояние приложения
const initialState: AppState = {
    boards: [], // Пустой массив досок при инициализации
    currentBoardIndex: 0, // Инициализация индекса
};

export function findBoardWithId(boards: Board[], boardId: number) {
    return boards.find((board) => board.id === boardId) as Board;
}

export function findListWithId(board: Board, listId: number) {
    return board.lists.find((list) => list.id === listId) as List;
}

export function findItemWithId(list: List, itemId: number) {
    return list.items.find((item) => item.id === itemId) as Item;
}

// Редуктор, который обрабатывает действия и изменяет состояние
const reducer = (state = initialState, action: BoardAction | ListAction | ItemAction): AppState => {
    switch (action.type) {
        case ADD_BOARD:
            const newBoard = action.payload;
            const updatedBoard = [...state.boards, newBoard];
            localStorage.setItem('boards', JSON.stringify(updatedBoard));// Обновляем локальное хранилище
            return { ...state, boards: updatedBoard };

        case DELETE_BOARD:
            const updatedBoardsAfterDelete = state.boards.filter((board) => board.id !== action.payload);// Удаляем доску по айди
            localStorage.setItem('boards', JSON.stringify(updatedBoardsAfterDelete));// Обновляем локальное хранилище
            return { ...state, boards: updatedBoardsAfterDelete, currentBoardIndex: 0 };

        case LOAD_BOARDS:
            return { ...state, boards: action.payload };

        case ADD_LIST:
            const newBoardsWithList = [...state.boards];
            const currentBoard = findBoardWithId(newBoardsWithList, action.payload.boardId);
            currentBoard.lists.push(action.payload.list);
            localStorage.setItem('boards', JSON.stringify(newBoardsWithList));// Обновляем локальное хранилище
            return { ...state, boards: newBoardsWithList };

        case DELETE_LIST:
            const newBoardsWithoutList = [...state.boards];
            const currentDeleteBoard = findBoardWithId(newBoardsWithoutList, action.payload.boardId);
            currentDeleteBoard.lists = currentDeleteBoard.lists.filter((list) => list.id !== action.payload.listId);// Удаляем лист по айди
            localStorage.setItem('boards', JSON.stringify(newBoardsWithoutList));// Обновляем локальное хранилище
            return { ...state, boards: newBoardsWithoutList };

        case ADD_ITEM:
            const newBoardsWithItem = [...state.boards];
            const currentBoardWithItem = findBoardWithId(newBoardsWithItem, action.payload.boardId);
            const currenListWithItem = findListWithId(currentBoardWithItem, action.payload.listId);
            currenListWithItem?.items.push(action.payload.item); // Добавляем новый итем
            localStorage.setItem('boards', JSON.stringify(newBoardsWithItem));// Обновляем локальное хранилище
            return { ...state, boards: newBoardsWithItem };

        case UPDATE_ITEM:
            const newBoardsWithDoItem = [...state.boards];
            const currentBoardWithDoItem = findBoardWithId(newBoardsWithDoItem, action.payload.boardId);
            const currenListWithDoItem = findListWithId(currentBoardWithDoItem, action.payload.listId);
            const currenItemWithDoItem = findItemWithId(currenListWithDoItem, action.payload.itemId);
            currenItemWithDoItem.done = true; // Обновляем состояние если итем выполнен
            localStorage.setItem('boards', JSON.stringify(newBoardsWithDoItem));// Обновляем локальное хранилище
            return { ...state, boards: newBoardsWithDoItem };

        case DELETE_ITEM:
            const newBoardsWithoutItem = [...state.boards];
            const currentBoardWithoutItem = findBoardWithId(newBoardsWithoutItem, action.payload.boardId);
            const currenListWithoutItem = findListWithId(currentBoardWithoutItem, action.payload.listId);
            currenListWithoutItem.items = currenListWithoutItem.items.filter((item) => item.id !== action.payload.itemId);// Удаляем итем по айди
            localStorage.setItem('boards', JSON.stringify(newBoardsWithoutItem));// Обновляем локальное хранилище
            return { ...state, boards: newBoardsWithoutItem };

        case REORDER_ITEMS:
            const { boardId, listId, startIndex, endIndex } = action.payload;
            const updatedBoards = state.boards.map(board => {
                if (board.id === boardId) {
                    const updatedLists = board.lists.map(list => {
                        if (list.id === listId) {
                            const { items } = list;
                            const movedItem = items[startIndex]; // Получаем элемент, который нужно переместить
                            items.splice(startIndex, 1); // Удаляем элемент из начальной позиции
                            items.splice(endIndex, 0, movedItem); // Вставляем элемент в конечную позицию
                            return { ...list, items };
                        }
                        return list;
                    });
                    return { ...board, lists: updatedLists };
                }
                return board;
            });
            localStorage.setItem('boards', JSON.stringify(updatedBoards));// Обновляем локальное хранилище
            return { ...state, boards: updatedBoards };
        default:
            return state;
    }
};

export default reducer;