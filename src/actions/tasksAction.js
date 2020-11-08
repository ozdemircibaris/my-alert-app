import axios from "axios"
import { API_BASE } from "../config/env"

export const FETCH_TASKS = "fetch_tasks"

export const fetchTasks = () => {
    return dispatch => {
        axios({
            method: "get",
            url: `${API_BASE}/tasks`
        }).then((result) => {
            console.log('result.data', result.data)
            if(result.data.status == "success") {
                dispatch({
                    type: FETCH_TASKS,
                    payload: result.data.data
                })
            }
        })
    }
}