import Main from "./components/pages/Main";
import Board from "./components/pages/Board";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./components/redux/reducer";
import { BrowserRouter, Route ,Routes} from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/board/:boardId" element={<Board />} />
          </Routes>
        </BrowserRouter>
        </DndProvider>
    </Provider>
  );
}
export default App;
