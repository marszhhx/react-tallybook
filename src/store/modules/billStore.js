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
        }
    }
})

// 解构action creator
const {setBillList} = billStore.actions

// 编写异步
const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:8888/ka")
        dispatch(setBillList(res.data))
    }
}

export {getBillList}

// 导出reducer
const reducer = billStore.reducer

export default reducer