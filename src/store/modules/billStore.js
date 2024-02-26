// 账单列表store

import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        },
        submitEntry(state, action) {
            state.billList.push(action.payload)
        }
    }
})

// 解构action creator
const {setBillList, submitEntry} = billStore.actions

// 编写异步
const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:8888/ka")
        dispatch(setBillList(res.data))
    }
}

const addToBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post("http://localhost:8888/ka", data)
        dispatch(submitEntry(res.data))
    }
}

// 导出异步action creator
export {getBillList, addToBillList}

// 导出reducer
const reducer = billStore.reducer

export default reducer