// 1. Должна заменить прежний зоопарк
// 2. Задача - только преобразование стэйта
// 3. Вернуть новый стэйт
import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export const REMOVE_TODOLIST = 'REMOVE-TODOLIST' as const
export const ADD_TODOLIST = 'ADD-TODOLIST' as const // как константа как конкретное значение
export const CHANGE_TITLE = 'CHANGE-TODOLIST-TITLE' as const
export const CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER' as const

type RemoveTodoListAT = {
    type: typeof REMOVE_TODOLIST
    id: string
}
type AddTodoListAT = {
    type: typeof ADD_TODOLIST
    title: string
}
type ChangeTodoListTitleAT = {
    type: typeof CHANGE_TITLE
    id: string
    title: string
}
type ChangeTodoListFilterAT = {
    type: typeof CHANGE_TODOLIST_FILTER
    nextFilterValue: FilterValuesType
    id: string
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolist: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...todolists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.nextFilterValue} : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: REMOVE_TODOLIST, id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: ADD_TODOLIST, title})
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => ({type: CHANGE_TITLE, id, title})
export const ChangeTodoListFilterAC = (nextFilterValue: FilterValuesType, id: string): ChangeTodoListFilterAT => ({type: CHANGE_TODOLIST_FILTER, nextFilterValue, id})