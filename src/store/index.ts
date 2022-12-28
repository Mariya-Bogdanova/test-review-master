import { configureStore } from '@reduxjs/toolkit'
// документация redux-toolkit-with-typescript требует использования функции createSlice и затем export type RootState = ReturnType<typeof store.getState>...
// export type AppDispatch = typeof store.dispatch

export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {  
            switch (action.type) {
                case 'ADD_TODO': {
                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                    // return {
                        // ...state,
                        // todos: [
                        //     ...state.todos,
                        //     action.payload
                        // ]
                    // }
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
