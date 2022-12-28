// Я думаю, что работать в проекте лучше с единой стилистикой и организацией работы с библиотеками и компонентами.
// Выбрать единую стилизацию (css или модули или bootstrap)
// Единый стиль работы с redux (connect или useDispatch)
// Выбрать единый работы с компонентами (классовый или функциональный подход)

// App лучше вынести из директории components в корень проекта. А содержимое App в другой компонент

import React from "react"; // убрать неиспользуемые елементы (с React 18 импорт React для работы с JSX не обязателен)
import logo from "../../logo.svg"; // убрать неиспользуемые елементы
import "./App.css"; //стили импортировать последними
import MainApp from "../MainApp"; //можно использовать ленивую загрузку (React.lazy)
import { useSelector } from "react-redux"; //сначала импорт библиотек, затем компонентов
// import { RootState } from "./store";

function App() {
  // todos не используется в данном компоненте, и передается в единственный дочерний компонент. Лучше сразу получать его в дочернем.
  const todos = useSelector(
    (state: { list: { todos: any[] } }) => state.list.todos
  );
  // синтаксис:
  // const todos = useSelector((state: RootState) => state.list.todos);

  return (
    // todo list for users:
    // комментарий выше излишний - достаточночно верно назвать импортируемый Component TodoListForUsers
    <div className="App main">
      <header className="App-header">
        TODO list with users:
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
      {/* MAIN APP:  */} {/* лишний комментарий */}
      <MainApp todos={todos} />
      <footer className="App-footer">
        <a //Использование <Link to=""> для ссылок
          href="https://example.org"
          target="_blank"
          className={"App-footer-link"} //убрать фигурные скобки, так как нет использования JS
        >
          All right reserved
        </a>
      </footer>
    </div>
  );
}

export default App;
