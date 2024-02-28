import {NavBar, DatePicker} from 'antd-mobile'
import './index.scss'
import classNames from 'classnames'
import {useEffect, useMemo, useState} from "react";
import dayjs from 'dayjs'
import {useSelector} from 'react-redux'
import _ from 'lodash'
import DailyBill from "@/pages/Month/components/DailyBill";

const Month = () => {
    const [monthPickerVisible, setMonthPickerVisible] = useState(false)
    const handleShowMonthPicker = () => setMonthPickerVisible(true)
    const handleHideMonthPicker = () => setMonthPickerVisible(false)

    const handleConfirmMonthPicker = (newDate) => {
        const newMonth = dayjs(newDate).format('YYYY-MM')
        setSelectedMonth(newMonth)
        setSelectedMonthBillList(billsGroupedByMonth[newMonth])
    }
    const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).format('YYYY-MM')
    )

    const {billList} = useSelector(state => state.bill)

    const billsGroupedByMonth = useMemo(() => {
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    const [selectedMonthBillList, setSelectedMonthBillList] = useState([])

    const monthlySummary = useMemo(() => {
        // if currentMonthList has data
        if (selectedMonthBillList) {
            const totalExpense = selectedMonthBillList
                .filter(item => item.type === 'pay')
                .reduce((a, c) => a + c.money, 0)

            const totalIncome = selectedMonthBillList
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
    },[selectedMonthBillList])

    const billsGroupedByDay = useMemo(() => {
        const data = _.groupBy(selectedMonthBillList, item => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(data)
        return {
            data,
            keys
        }
    }, [selectedMonthBillList])

    useEffect(() => {
        // get monthly bill state from month group
        if (billsGroupedByMonth[selectedMonth]) {
            setSelectedMonthBillList(billsGroupedByMonth[selectedMonth])
        }
    },[billsGroupedByMonth, selectedMonth])

    return (<div className="monthlyBill">
        <NavBar className="nav" backArrow={false}>
            Monthly Income and Expense
        </NavBar>
        <div className="content">
            <div className="header">
                {/* Time Switch Area */}
                <div className="date" onClick={handleShowMonthPicker}>
                    <span className="text">
                      {selectedMonth + ''} Bill
                    </span>
                    {/*{Control the presence of the expand class name based on the state of current dialog box}*/}
                    <span className={classNames('arrow', monthPickerVisible && 'expand')}></span>
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
                    visible={monthPickerVisible}
                    max={new Date()}
                    onConfirm={handleConfirmMonthPicker}
                    onClose={handleHideMonthPicker}
                />
            </div>
            <div>
                {billsGroupedByDay.keys.map(key => {
                    return <DailyBill key={key} date={key} billList={billsGroupedByDay.data[key]}/>
                })}
            </div>

        </div>
    </div>)
}

export default Month
