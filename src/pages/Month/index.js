import {NavBar, DatePicker} from 'antd-mobile'
import './index.scss'
import classnames from 'classnames'
import {useEffect, useMemo, useState} from "react";
import dayjs from 'dayjs'
import {useSelector} from 'react-redux'
import _ from 'lodash'
import DailyBill from "@/pages/Month/components/DailyBill";

const Month = () => {

    const billList = useSelector(state => state.bill.billList)

    const monthGroup = useMemo(() => {
        // return calculated value
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    // Control the opening and closing of the dialog box
    const [dateVisible, setDateVisible] = useState(false)

    const [currentDate, setCurrentDate] = useState(()=> {
        return dayjs(new Date()).format('YYYY-MM')
    })

    const [currentMonthList, setCurrentMonthList] = useState([])

    // 当前页数据 currentMonthList，分组useMemo
    const dayGroup = useMemo(() => {
        console.log(currentMonthList)
        const groupData = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return {
            groupData,
            keys
        }
    }, [currentMonthList])

    console.log(dayGroup)

    const monthlySummary = useMemo(() => {
        // if currentMonthList has data
        if (currentMonthList) {
            const totalExpense = currentMonthList
                .filter(item => item.type === 'pay')
                .reduce((a, c) => a + c.money, 0)

            const totalIncome = currentMonthList
                .filter(item => item.type === 'income')
                .reduce((a, c) => a + c.money, 0)

            return {
                totalExpense,
                totalIncome,
                balance: totalExpense + totalIncome
            }
        }
        // if currentMonthList === undefined
        return {
            totalExpense: 0,
            totalIncome: 0,
            balance: 0
        }
    },[currentMonthList])

    useEffect(() => {
        const currentDateKey = dayjs(new Date()).format('YYYY-MM')
        // get monthly bill state from month group
        if (monthGroup[currentDateKey]) {
            setCurrentMonthList(monthGroup[currentDateKey])
        }
    },[monthGroup])


    // Confirm call back
    const handleConfirm = (date) => {
        const formatedDate = dayjs(date).format('YYYY-MM')
        setCurrentDate(formatedDate)
        setDateVisible(false)
        setCurrentMonthList(monthGroup[formatedDate])
    }

    return (<div className="monthlyBill">
        <NavBar className="nav" backArrow={false}>
            Monthly Income and Expense
        </NavBar>
        <div className="content">
            <div className="header">
                {/* Time Switch Area */}
                <div className="date" onClick={() => setDateVisible(true)}>
                    <span className="text">
                      {currentDate + ''} Bill
                    </span>
                    {/*{Control the presence of the expand class name based on the state of current dialog box}*/}
                    <span className={classnames('arrow', dateVisible && 'expand')}></span>
                </div>
                {/* Statistics Area */}
                <div className='twoLineOverview'>
                    <div className="item">
                        <span className="money">{monthlySummary.totalExpense.toFixed(2)}</span>
                        <span className="type">Expense</span>
                    </div>
                    <div className="item">
                        <span className="money">{monthlySummary.totalIncome.toFixed(2)}</span>
                        <span className="type">Income</span>
                    </div>
                    <div className="item">
                        <span className="money">{monthlySummary.balance.toFixed(2)}</span>
                        <span className="type">Balance</span>
                    </div>
                </div>
                {/* Date Picker */}
                <DatePicker
                    className="kaDate"
                    title="Billing Date"
                    precision="month"
                    visible={dateVisible}
                    max={new Date()}
                    onCancel={() => setDateVisible(false)}
                    onConfirm={handleConfirm}
                    onClose={() => setDateVisible(false)}
                />
            </div>
            <div>
                {dayGroup.keys.map(key => {
                    return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]}/>
                })}
            </div>

        </div>
    </div>)
}

export default Month
