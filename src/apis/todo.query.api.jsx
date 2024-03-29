import { useQuery } from 'react-query';
import QueryKey from '../consts/query-key';
import useMutateData from '../hooks/use-mutate-data';
import TodoApi from './todo.api';

const TodoQueryApi = {
    deleteTodo: (todoId, successFn) =>
        useMutateData(() => TodoApi.deleteTodo(todoId), [QueryKey.todoData, todoId], successFn),
    addTodo: (todoData) => {
        useMutateData(() => TodoApi.addTodo(todoData), [QueryKey.todoData]);
    },
    editTodo: (todoData, todoId, successFn) =>
        useMutateData(() => TodoApi.editTodo(todoData, todoId), [QueryKey.todoData, todoId], successFn),
};

export default TodoQueryApi;
