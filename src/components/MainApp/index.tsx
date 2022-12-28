import React from "react";
import { Form } from "react-bootstrap";
import { InputNewTodo } from "../InputNewTodo";
import UserSelect from "../UserSelect";
import { connect } from "react-redux";
import styles from "./MainApp.module.css";
// в данном проекте использовать единый интерфейс для дела (Todo) и брать any в местах, где работаем с Todo

// type Todo = {
//     title: string
//     idTitle: string | number
//     isDone:boolean
//     userName?: string
//     userId?:string | number
// }
type Todo = {
  title: string;
  user?: number;
  isDone: boolean;
};

type MainAppProps = {
  todos: Todo[];
  addTodo: (t: Todo) => void;
  changeTodo: (todos: Todo[]) => void;
};
type MainAppState = {
  todoTitle: string;
};
//почему на классах?
class Index extends React.Component<MainAppProps, MainAppState> {
  constructor(props: MainAppProps) {
    super(props);
    this.state = { todoTitle: "" };
    // в стейт лучше записать все поля дела (по крайне мере которые будут меняться)
  }
  handleTodoTitle = (todoTitle: string) => {
    this.setState({ todoTitle });
  };

  handleSubmitTodo = (todo: any) => {
    this.props.addTodo(todo);
  };

  render() {
    const { todoTitle } = this.state;
    window.allTodosIsDone = true; //const [allTodosIsDone, setAllTodosIsDone] = useState(true);

    this.props.todos.map((t) => {
      // так как поле allTodosIsDone не работает с хуком useState(), верный рендер не происходит
      //с точки зрения производительности, лучше заносить Todo, в котором isDone=false в массив:
      // type idTodo = string | number;
      // const [allUndoneId, setAllUndoneId] = useState<idTodo>([]);
      // if (allUndoneId.length) setAllTodosIsDone(false)
      if (!t.isDone) {
        window.allTodosIsDone = false;
      } else {
        window.allTodosIsDone = true;
      }
    });

    return (
      <div>
        {/*По документации  <Form.Check></Form.Check> располагается внутри <Form></Form> и имеет id */}
        <Form.Check
          type="checkbox"
          label="all todos is done!"
          checked={window.allTodosIsDone}
          // readOnly - необходимо добавить для исползования checked без onChange
        />
        <hr />
        {/* input хорошо расположить в форме */}
        <InputNewTodo
          todoTitle={todoTitle}
          onChange={this.handleTodoTitle}
          onSubmit={this.handleSubmitTodo}
        />

        {/* вынести список элементов в отдельный компонент */}
        {/* деструктуризировать из this пропсы... */}
        {/* однобуквенные имена переменных = не хорошо */}
        {/* деструктуризация в map)) */}
        {this.props.todos.map((t, idx) => (
          // элементы замепенного массива должны иметь уникальный key={} и там должен быть не индекс массива
          // вынести отдельное дело в компонент
          // стилизация списка дел кривая, можно поправить поработав с флексами/границами/шириной блоков...
          <div
            className={styles.todo}
            // key={t.idTitle}
          >
            {t.title}
            {/* в качестве id нужно передавать idUser  а не индекс массива */}
            <UserSelect user={t.user} idx={idx} key={t.title} />
            <Form.Check
              style={{ marginTop: -8, marginLeft: 5 }} // вынести стили
              type="checkbox"
              checked={t.isDone}
              onChange={(e) => {
                // вынести большую логику в отдельную фенкцию наверх
                //не нужно менять весь массив нужно заменить одного поле в элементе
                //вызвать dispatch и передать в payload индекс дела в котором изменился статус
                const changedTodos = this.props.todos.map((t, index) => {
                  const res = { ...t }; //map и так возвращает новый массив.
                  if (index == idx) {
                    res.isDone = !t.isDone;
                  }
                  return res;
                });
                this.props.changeTodo(changedTodos);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

// connect - устаревший. Используется:
// const dispatch = useDispatch();
// dispatch((importAction(param)));
export default connect(
  (state) => ({}),
  (dispatch) => ({
    addTodo: (todo: any) => {
      dispatch({ type: "ADD_TODO", payload: todo });
    },
    changeTodo: (todos: any) =>
      dispatch({ type: "CHANGE_TODOS", payload: todos }),
    removeTodo: (index: number) =>
      dispatch({ type: "REMOVE_TODOS", payload: index }),
  })
)(Index);
