import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserSelect.module.css";

type UserSelectProps = {
  // название и значение поправить
  user?: number; //userNname
  idx: number; //userId
};
// деструктуризация props
function UserSelect(props: UserSelectProps) {
  const dispatch = useDispatch();
  const todos = useSelector(
    (state: { list: { todos: any[] } }) => state.list.todos //синтаксис
  );
  // данный fetch запрос достаточно сделать 1 раз в верхнем компоненте, а здесь только импортировать

  React.useEffect(() => {
    // можно импортировать useEffect
    console.log("userSelect"); // console.log-и убираем при заливке
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((users) => users.json())
      .then((users) => setOptions(users));
  }, []);
  const [options, setOptions] = React.useState([]); // useState() наверх

  const { idx } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const changedTodos = todos.map((t, index) => {
      const res = { ...t };
      if (index == idx) {
        // == не используется,
        // здесь необходимо проверять id дела, а не индекс массива
        console.log("props.user", props.user); // убрать console.log
        res.user = e.target.value;
      }
      return res;
    });
    // данные изменения должны происходить в reducer, куда в payload мы передаем id дела и id userа а не измененный массив.
    dispatch({ type: "CHANGE_TODO", payload: changedTodos });
  };

  return (
    <select name="user" className={styles.user} onChange={handleChange}>
      {options.map((user: any) => (
        <option
          value={user.id}
          //key={user.id}
        >
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserSelect;
