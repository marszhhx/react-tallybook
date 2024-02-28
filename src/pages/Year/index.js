import classNames from "classnames";
import {DatePicker, NavBar} from "antd-mobile";
import TwoLineOverview from "@/components/TwoLineOverview";
import OneLineOverview from "@/components/OneLineOverview";
import './index.scss'
import {useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from "lodash";

const Year = () => {
    const [yearPickerVisible, setYearPickerVisible] = useState(false)
    const handleShowYearPicker = () => setYearPickerVisible(true)
    const handleHideYearPicker = () => setYearPickerVisible(false)

    const handleConfirmYearPicker = (newDate) => {
        const newYear = dayjs(newDate).format('YYYY')
        setSelectedYear(newYear)
        setSelectedYearBillList(billsGroupedByYear[newYear])
    }

    const [selectedYear, setSelectedYear] = useState(() => dayjs(new Date()).format('YYYY'))

    // 1. get the billList Slice
    const {billList} = useSelector(state => state.bill);

    // 2. get bills grouped by year
    const billsGroupedByYear = useMemo(() => {
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY'))
    }, [billList])

    // 3. get selected year bill List
    const [selectedYearBillList, setSelectedYearBillList] = useState([])

    // 4. calculate the data for TwoLineOverview
    const annualSummary = useMemo(() => {
        // if selectedYearBillList has data
        if (selectedYearBillList) {
            const totalExpense = selectedYearBillList
                .filter(item => item.type === 'pay')
                .reduce((a, c) => a + c.money, 0)

            const totalIncome = selectedYearBillList
                .filter(item => item.type === 'income')
                .reduce((a, c) => a + c.money, 0)
            return {
                totalExpense,
                totalIncome,
                balance: totalExpense + totalIncome
            }
        }
        // if selectedYearBillList === undefined
        return {
            totalExpense: 0,
            totalIncome: 0,
            balance: 0
        }
    }, [selectedYearBillList])

    // 5. calculate the data for OneLineOverview
    const billsGroupedByMonth = useMemo(() => {
        const data = _.groupBy(selectedYearBillList, item => dayjs(item.date).format('YYYY-MM'))
        const keys = Object.keys(data)
        return {
            data,
            keys
        }
    }, [selectedYearBillList])

    useEffect(() => {
        if (billsGroupedByYear[selectedYear]) {
            setSelectedYearBillList(billsGroupedByYear[selectedYear])
        }
    }, [billsGroupedByYear, selectedYear])

    return (
        <div className="billDetail">
            <NavBar className="nav" backArrow={false}>
                <div className="nav-title" onClick={handleShowYearPicker}>
                    Year {selectedYear}
                    <span className={classNames('arrow', yearPickerVisible && 'expand')}></span>
                </div>
            </NavBar>
            <DatePicker
                className="kaDate"
                title="Bill Year"
                precision="year"
                visible={yearPickerVisible}
                max={new Date()}
                onConfirm={handleConfirmYearPicker}
                onClose={handleHideYearPicker}
            />
            <div className="content">
                <div className='overview'>
                    <TwoLineOverview
                        pay={annualSummary.totalExpense}
                        income={annualSummary.totalIncome}
                        className="overview"
                    />
                </div>
                {billsGroupedByMonth.keys.map(key => {
                    return (
                        <div
                            className="monthBill"
                            key={key}
                        >
                            <div className="date">{key}</div>
                            <OneLineOverview pay={0} income={0}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Year