import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolist-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType

    | AddTodoListAT  //на таскредусер и такой тип экшенов будет обрабатывать
    | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)}
        case 'ADD_TASK':
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case 'CHANGE_TASK_STATUS':
            return {...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE_TASK_TITLE':
            return {...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            //const {[action.id]: [], ...rest]} = {state}  //удаление свойства из объекта с помощью деструктуризации
            return copyState
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE_TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD_TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone:boolean, todoListId: string) => {
    return {type: 'CHANGE_TASK_STATUS', taskId, isDone, todoListId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todoListId} as const
}
