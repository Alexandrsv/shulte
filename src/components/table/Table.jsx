import React, {useEffect, useRef, useState} from 'react';
import s from './Table.module.css'
import bridge from "@vkontakte/vk-bridge";
import {Icon16ClockOurline} from "@vkontakte/icons";
import {Button, Div, Touch} from "@vkontakte/vkui";
import {useSelector} from "react-redux";
import {clickSound} from "../../assets/audio/click_sound";
// import clickSound from '../../assets/audio/click.wav'


const getAlphabet = (tableSize, tableType) => {
    let alphabet
    switch (tableType) {
        case 'Цифры':
            alphabet = Array(tableSize * tableSize).fill('').map((v, i) => i + 1)
            break
        case 'Русский алфавит':
            alphabet = Array(tableSize * tableSize).fill('')
                .map((v, i) => String.fromCharCode(i + 1040))
            break
        case 'Английский алфавит':
            alphabet = Array(tableSize * tableSize + 6).fill('') //в латинице между большими и малыми идет 6 символов, их выпилит фильтр
                .map((v, i) => String.fromCharCode(i + 65))
                .filter((l) => /^[A-Za-z]/.test(l))
            break
        default:
            alphabet = Array(tableSize * tableSize).fill('').map((v, i) => i + 1)
    }
    return alphabet
}

const getNewTable = (tableSize, tableType) => {
    const alphabet = getAlphabet(tableSize, tableType)
    console.log(alphabet)
    return Array(tableSize).fill('').map(() => Array(tableSize).fill('').map(() => alphabet.getRandom()))
}

const increaseTime = (t) => {
    const newTime = +t + 0.1
    return newTime.toFixed(1)
}

const Table = () => {
    const [itemForSearch, setItemForSearch] = useState(0)
    const [time, setTime] = useState(0)
    const [table, setNewTable] = useState([[]])
    const [status, setStatus] = useState('waiting') //waiting|win|game

    const tableSize = useSelector(s => s.settingsReducer.size)
    const isShuffleCells = useSelector(s => s.settingsReducer.isShuffleCells)
    const isVibed = useSelector(s => s.settingsReducer.isVibed)
    const isSound = useSelector(s => s.settingsReducer.isSound)
    const tableType = useSelector(s => s.settingsReducer.tableType)

    const intervalRef = useRef()

    useEffect(() => { //Обработка победы, остановка таймера
        if (itemForSearch >= Math.pow(tableSize, 2)) {
            setStatus('win')
            clearInterval(intervalRef.current);
        }
    }, [itemForSearch, tableSize])


    useEffect(() => { //Старт
        setNewTable(getNewTable(tableSize, tableType))
        setItemForSearch(0)
    }, [setNewTable, tableSize, tableType])


    const onItemClick = (item) => {
        console.log(item)
        if (getAlphabet(tableSize, tableType)[itemForSearch] === item) {
            if (isSound) {
                const sound = clickSound()
                sound.volume = 0.2
                sound.play().catch(e => console.log('Play', e))
            }
            isVibed && bridge.send("VKWebAppTapticImpactOccurred", {"style": "light"})
            isShuffleCells && setNewTable(getNewTable(tableSize, tableType))
            setItemForSearch(itemForSearch + 1)
        }
    }


    const onRestartTable = () => {
        setNewTable(getNewTable(tableSize, tableType))
        setItemForSearch(0)
        setStatus('game')
        clearInterval(intervalRef.current)
        setTime(0)
        intervalRef.current = setInterval(() => {
            setTime(t => increaseTime(t))
        }, 100)
    }

    return (
        <>
            <div className={s.Table}>
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
                        ? 'Нажмите пуск и найдите символы, начиная с первого'
                        : 'Найди ' + getAlphabet(tableSize, tableType)[itemForSearch] || ''}
                </h1>

                {table.map((v, i) =>
                    <div key={i} className={s.Row}>
                        {
                            v.map(vv => <Touch
                                key={vv}
                                onClick={() => onItemClick(vv)}
                                noSlideClick={false}
                                onMove={() => onItemClick(vv)}
                                className={s.Cell}>{vv}</Touch>)
                        }
                    </div>)}
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
