import React, {useEffect, useRef, useState} from 'react';
import s from './Table.module.css'

const SIZE = 3

const getNewTable = (SIZE) => {
    const arrValues = Array(SIZE * SIZE).fill('').map((v, i) => i + 1)
    return Array(SIZE).fill('').map(() => Array(SIZE).fill('').map(() => arrValues.getRandom()))
}

const increeceTime = (t) => {
    const newTime = +t + 0.1
    return newTime.toFixed(1)
}

const Table = () => {
    const [itemForSearch, setItemForSearch] = useState(1)
    const [time, setTime] = useState(0)
    const [table, setNewTable] = useState([[]])
    const [status, setStatus] = useState('waiting') //waiting|win|game

    const intervalRef = useRef()

    useEffect(() => { //Обработка победы, остановка таймера
        if (itemForSearch > Math.pow(table.length, 2)) {
            setStatus('win')
            clearInterval(intervalRef.current);
        }
    }, [itemForSearch, table.length])


    useEffect(() => { //Старт
        setNewTable(getNewTable(SIZE))
    }, [setNewTable])


    const onItemClick = (e) => {
        const item = e.target.childNodes[0].data
        if (itemForSearch === +item) {
            setItemForSearch(itemForSearch + 1)
        }

    }

    const onRestartTable = () => {
        setNewTable(getNewTable(SIZE))
        setItemForSearch(1)
        setStatus('game')
        clearInterval(intervalRef.current)
        setTime(0)
        intervalRef.current = setInterval(() => {
            setTime(t => increeceTime(t))
        }, 100)
    }

    return (
        <>
            <div className={s.Table}>
                <span style={{display: "inline"}}>Время:</span><span
                style={{display: "inline", fontFamily: 'monospace'}}>{time}</span>
                <h1>{status === 'win' ? 'Победа!' : 'Найди ' + itemForSearch}</h1>
                {table.map((v, i) =>
                    <div key={i} className={s.Row}>
                        {
                            v.map(vv => <span key={vv} onClick={onItemClick} className={s.Cell}>{vv}</span>)
                        }
                    </div>)}
                {itemForSearch === Math.pow(table.length + 1, 2) && <h1>Победа</h1>}
                <button onClick={onRestartTable}
                        className={s.Btn}>{status === 'win'
                    ? 'Заново'
                    : status === 'game' ? 'Рестарт' : 'Пуск'}
                </button>
            </div>
        </>
    )
}

export default Table;
