import {NavBar, DatePicker} from 'antd-mobile'
import './index.scss'
import classnames from 'classnames'
import {useMemo, useState} from "react";
import dayjs from 'dayjs'
import {useSelector} from 'react-redux'
import _ from 'lodash'

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
    const handleConfirm = (date) => {
        // console.log('onConfirm', date)
        const formatedDate = dayjs(date).format('YYYY-MM')
        setCurrentDate(formatedDate)
        setDateVisible(false)
    }

    return (<div className="monthlyBill">
        <NavBar className="nav" backArrow={false}>
            Monthly Income and Expenses
        </NavBar>
        <div className="content">
            <div className="header">
                {/* Time Switch Area */}
                <div className="date" onClick={() => setDateVisible(true)}>
                    <span className="text">
                      {currentDate + ''} Bill
                    </span>

                    {/*{Control the presence of the expand class name based on the state of current dialog box}*/}
                    <span className={classnames('arrow', !dateVisible && 'expand')}></span>
                </div>
                {/* Statistics Area */}
                <div className='twoLineOverview'>
                    <div className="item">
                        <span className="money">{100}</span>
                        <span className="type">Expenses</span>
                    </div>
                    <div className="item">
                        <span className="money">{200}</span>
                        <span className="type">Income</span>
                    </div>
                    <div className="item">
                        <span className="money">{200}</span>
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
        </div>
    </div>)
}

export default Month
