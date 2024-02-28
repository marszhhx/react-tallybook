import {Button, DatePicker, Input, NavBar} from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import {billListData} from '@/contents'
import {useNavigate} from 'react-router-dom'
import {useState} from "react";
import {addToBillList} from "@/store/modules/billStore";
import {useDispatch} from "react-redux";
import dayjs from "dayjs";

const New = () => {
    // collect category
    const [category, setCategory] = useState('pay')

    // collect amount
    const [money, setMoney] = useState(0)

    // collect useFor
    const [useFor, setUseFor] = useState('')

    // date Visible
    const [dateVisible, setDateVisible] = useState(false)

    const [date, setDate] = useState(new Date())


    const moneyChange = (value) => {
        setMoney(value)
    }

    const dispatch = useDispatch()

    // Submit bill
    const submitBill = () => {
        // 1. collect bill data
        const data = {
            type: category,
            money: category === 'pay' ? -money : +money,
            date: date,
            useFor: useFor
        }

        console.log(data)

        // 2. trigger submit action
        dispatch(addToBillList(data))

        // 3. navigate to previous page

        navigate(-1)
    }
    const navigate = useNavigate()

    const dateConfirm = (date) => {
        // console.log(date)
        setDate(date)
        setDateVisible(false)
    }


    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                New Entry
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(category === 'pay' && 'selected')}
                        onClick={() => setCategory('pay')}
                    >
                        Expense
                    </Button>
                    <Button
                        className={classNames(category === 'income' && 'selected')}
                        shape="rounded"
                        onClick={() => setCategory('income')}
                    >
                        Income
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon"/>
                            <span className="text" onClick={() => setDateVisible(true)}
                            >{dayjs(date).format("YYYY-MM-DD")}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={dateVisible}
                                onConfirm={dateConfirm}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[category].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                item.type === useFor && 'selected'
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}

                                        >
                                            <div className="icon">
                                                <Icon type={item.type}/>
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={submitBill}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default New
