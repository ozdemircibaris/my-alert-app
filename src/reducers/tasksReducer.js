import {
    FETCH_TASKS,
    ADD_TASK_CLICK,
    ADD_TASK_SUCCESS,
    ADD_TASK_FINALLY,
} from "../actions/tasksAction";

const INITIAL_STATE = {
    tasksValues: [],
    addTaskStatus: ""
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_TASKS:
            let dateNow = new Date()
            action.payload.map((item) => {
                let dateNow2 = new Date(item.jobDate)
                if(dateNow.getTime() > dateNow2.getTime()) {
                    item.out_of_date = true;
                } else if(dateNow2.getTime() > dateNow.getTime()) {
                    item.out_of_date = false;
                }
            })
            return {
                ...state,
                tasksValues: action.payload,
                addTaskStatus: ""
            }
        case ADD_TASK_CLICK:
            return {
                ...state,
            }
        case ADD_TASK_SUCCESS:
            state.tasksValues.splice(0, 0, action.payload)
            return {
                ...state,
            }
        case ADD_TASK_FINALLY:
            return {
                ...state,
                addTaskStatus: "finally"
            }
        default:
            return state;
    }
}