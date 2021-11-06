export const getAlphabet = (tableSize, tableType) => {
    switch (tableType) {
        case 'Цифры':
            return Array(tableSize * tableSize).fill('').map((v, i) => i + 1)
        case 'Таблица Горбова-Шульте':
            return Array(Math.ceil(Math.pow(tableSize, 2) / 2) + 1)
                .fill('')
                .reduce((acc, val, i) => (acc.length + 2) <= Math.pow(tableSize, 2)
                    ? [...acc, i, i - Math.round(Math.pow(tableSize, 2) / 2) - 1]
                    : [...acc, i])
        case 'Русский алфавит':
            return Array(tableSize * tableSize).fill('')
                .map((v, i) => String.fromCharCode(i + 1040))
        case 'Английский алфавит':
            return Array(tableSize * tableSize + 6).fill('') //в латинице между большими и малыми идет 6 символов, их выпилит фильтр
                .map((v, i) => String.fromCharCode(i + 65))
                .filter((l) => /^[A-Za-z]/.test(l)).slice(0, tableSize * tableSize)
        case 'Рунический алфавит':
            return Array(tableSize * tableSize + 1).fill('')
                .map((v, i) => String.fromCharCode(i + 5792))
                .filter((l) => l !== 'ᛂ')
                .slice(0, tableSize * tableSize)
        default:
            return Array(tableSize * tableSize).fill('').map((v, i) => i + 1)
    }
}
export const getNewTable = (tableSize, tableType) => {
    const alphabet = getAlphabet(tableSize, tableType)
    return Array(tableSize).fill('').map(() => Array(tableSize).fill('').map(() => alphabet.getRandom()))
}
export const increaseTime = (t) => {
    const newTime = +t + 0.1
    return newTime.toFixed(1)
}
