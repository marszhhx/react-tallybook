export const billListData = {
    pay: [
        {
            type: 'foods',
            name: 'Groceries',
            list: [
                { type: 'food', name: 'Food'},
                { type: 'drinks', name: 'Drinks' },
                { type: 'dessert', name: 'Snacks' },
            ],
        },
        {
            type: 'taxi',
            name: 'Transportation',
            list: [
                { type: 'taxi', name: 'Taxi' },
                { type: 'longdistance', name: 'Travel' },
            ],
        },
        {
            type: 'recreation',
            name: 'Recreation',
            list: [
                { type: 'bodybuilding', name: 'Fitness' },
                { type: 'game', name: 'Games' },
                { type: 'audio', name: 'Audio' },
                { type: 'travel', name: 'Holidays' },
            ],
        },
        {
            type: 'daily',
            name: 'General',
            list: [
                { type: 'clothes', name: 'Apparels' },
                { type: 'bag', name: 'Shoes & Bags' },
                { type: 'book', name: 'Study' },
                { type: 'promote', name: 'Self-improvement' },
                { type: 'home', name: 'Decorations' },
            ],
        },
        {
            type: 'other',
            name: 'Others',
            list: [{ type: 'community', name: 'Communities' }],
        },
    ],
    income: [
        {
            type: 'professional',
            name: 'Other Expense',
            list: [
                { type: 'salary', name: 'Paycheck' },
                { type: 'overtimepay', name: 'Over Time Pay' },
                { type: 'bonus', name: 'Bonus' },
            ],
        },
        {
            type: 'other',
            name: 'Other Income',
            list: [
                { type: 'financial', name: 'Investment' },
                { type: 'cashgift', name: 'Gift' },
            ],
        },
    ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
    billListData[key].forEach(bill => {
        bill.list.forEach(item => {
            prev[item.type] = item.name
        })
    })
    return prev
}, {})
