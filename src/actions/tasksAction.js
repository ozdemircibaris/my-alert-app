import axios from "axios"
import { Actions } from "react-native-router-flux";
import { API_BASE } from "../config/env"

export const FETCH_TASKS = "fetch_tasks"

export const ADD_TASK_CLICK   = "add_task_click";
export const ADD_TASK_SUCCESS = "add_task_success";
export const ADD_TASK_FAILED  = "add_task_failed";
export const ADD_TASK_FINALLY = "add_task_finally";

export const fetchTasks = () => {
    return dispatch => {
        axios({
            method: "get",
            url: `${API_BASE}/tasks`
        }).then((result) => {
            if(result.data.status == "success") {
                dispatch({
                    type: FETCH_TASKS,
                    payload: result.data.data
                })
            }
        })
    }
}

export const addTask = (title, subTitle, jobDate) => {
    return dispatch => {
        dispatch({
            type: ADD_TASK_CLICK
        })
        let data = JSON.stringify({
            "title": title,
            "subTitle": subTitle,
            "jobDate": jobDate
        })
        axios({
            method: "post",
            url: `${API_BASE}/tasks`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data
        }).then((result) => {
            if(result.data.status == "success") {
                dispatch({
                    type: ADD_TASK_SUCCESS,
                    payload: result.data.data
                })
                Actions.jump('index')
            }
        }).catch((err) => {
            console.log('err.response', err.response)
        }).finally(() => {
            dispatch({
                type: ADD_TASK_FINALLY,
            })
        })
    }
}