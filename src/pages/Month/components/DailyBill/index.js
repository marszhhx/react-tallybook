import classNames from 'classnames'
import './index.scss'
import {useMemo, useState} from "react";
import {billTypeToName} from '@/contents/index.js'

const DailyBill = ({date, billList}) => {
    const dailySummary = useMemo(() => {
        // if billList has data
        if (billList) {
            const totalExpense = billList
                .filter(item => item.type === 'pay')
                .reduce((a, c) => a + c.money, 0)

            const totalIncome = billList
                .filter(item => item.type === 'income')
                .reduce((a, c) => a + c.money, 0)

            return {
                totalExpense,
                totalIncome,
                balance: totalExpense + totalIncome
            }
        }
        // if billList === undefined
        return {
            totalExpense: 0,
            totalIncome: 0,
            balance: 0
        }
    }, [billList])

    const [visible, setVisible] = useState(false)


    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon" onClick={() => setVisible(!visible)} >
                    <span className="date">{date}</span>
                    {/*控制状态显示arrow*/}
                    <span className={classNames('arrow', visible && 'expand')}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">Expense</span>
                        <span className="money">{dailySummary.totalExpense.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">Income</span>
                        <span className="money">{dailySummary.totalIncome.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{dailySummary.balance.toFixed(2)}</span>
                        <span className="type">Balance</span>
                    </div>
                </div>
            </div>
            {/* Daily List */}
            <div className="billList" style={ {display: visible? 'block': 'none'} }>
                {billList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            <div className="detail">
                                <div className="billType">{billTypeToName[item.useFor]}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default DailyBill
