import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {
    ActionType,
    ADD_TODOLIST, AddTodoListAC,
    CHANGE_TITLE,
    CHANGE_TODOLIST_FILTER, ChangeTodoListFilterAC, ChangeTodoListTitleAC,
    REMOVE_TODOLIST, RemoveTodoListAC,
    todolistsReducer
} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    // 1. test data
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // 2. выполнение тестируемого кода
    // const endState = todolistsReducer(startState, {type: REMOVE_TODOLIST, id: todolistId1})
    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId1))

    // 3. сверяем ожидаемый результат с реальным
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
});
test('correct todolist should be added', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();
    let newTodolistTitle = 'New Todolist';
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // const endState = todolistsReducer(startState, {type: ADD_TODOLIST, title: newTodolistTitle})
    const action: ActionType = AddTodoListAC(newTodolistTitle)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
});
test('correct todolist should be change its name', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();
    let newTodolistTitle = 'What to learn';
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    // const endState = todolistsReducer(startState, {type: CHANGE_TITLE, id: todolistId2, title: newTodolistTitle})
    const endState = todolistsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
});
test('correct filter should be changed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();
    let newFilter: FilterValuesType = 'completed';
    const startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(newFilter, todolistId2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
});

