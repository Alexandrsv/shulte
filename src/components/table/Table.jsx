import React, {useEffect, useRef, useState} from 'react';
import s from './Table.module.css'
import bridge from "@vkontakte/vk-bridge";
import {Icon16ClockOurline} from "@vkontakte/icons";
import {Button, Div} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import {clickSound} from "../../assets/audio/click_sound";
// import clickSound from '../../assets/audio/click.wav'

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
    // const clickSound = new Audio(clickSound)
    clickSound.volume = 0.2
    const dispatch = useDispatch()
    const tableSize = useSelector(s => s.settingsReducer.size)
    const intervalRef = useRef()

    useEffect(() => { //Обработка победы, остановка таймера
        if (itemForSearch > Math.pow(tableSize, 2)) {
            setStatus('win')
            clearInterval(intervalRef.current);
            bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
        }
    }, [itemForSearch, tableSize])


    useEffect(() => { //Старт
        setNewTable(getNewTable(tableSize))
        setItemForSearch(1)
    }, [setNewTable, tableSize])


    const onItemClick = (e) => {
        const item = e.target.childNodes[0].data
        if (itemForSearch === +item) {
            clickSound.play()
            setItemForSearch(itemForSearch + 1)
        } else {

        }

    }


    const onRestartTable = () => {
        setNewTable(getNewTable(tableSize))
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
                {status !== 'waiting' && ''}
                <span style={{padding: '10px', visibility: status !== 'waiting' ? 'visible' : 'hidden'}}>
                        <Icon16ClockOurline/>
                    </span>
                <div style={{
                    display: "inline",
                    fontFamily: 'monospace',
                    visibility: status !== 'waiting' ? 'visible' : 'hidden'
                }}>
                    {time + ' сек'}
                </div>

                <h1>{status === 'win'
                    ? 'Победа!'
                    : status === 'waiting'
                        ? 'Нажмите пуск и найдите цифры, начиная с 1'
                        : 'Найди ' + itemForSearch}
                </h1>

                {table.map((v, i) =>
                    <div key={i} className={s.Row}>
                        {
                            v.map(vv => <span key={vv} onClick={onItemClick} className={s.Cell}>{vv}</span>)
                        }
                    </div>)}
                {itemForSearch === Math.pow(table.length + 1, 2) && <h1>Победа</h1>}
                <br/>
                <Div>
                    <Button stretched mode="primary" onClick={onRestartTable}
                            className={s.Btn}>{status === 'win'
                        ? 'Заново'
                        : status === 'game'
                            ? 'Рестарт'
                            : 'Пуск'}
                    </Button>
                </Div>
            </div>
        </>
    )
}

export default Table;
