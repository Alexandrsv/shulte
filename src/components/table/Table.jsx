import React, {useEffect, useRef, useState} from 'react';
import s from './Table.module.css'
import bridge from "@vkontakte/vk-bridge";
import {Button, Div, Touch} from "@vkontakte/vkui";
import {useSelector} from "react-redux";
import {clickSound} from "../../assets/audio/click_sound";
// import clickSound from '../../assets/audio/click.wav'
import cn from 'classnames'
import {TableStatus} from "./TableStatus";
import * as PropTypes from "prop-types";
import {TableTimer} from "./TableTimer";

const getAlphabet = (tableSize, tableType) => { //TODO: Влупи ретерны сразу, без break
    let alphabet
    switch (tableType) {
        case 'Цифры':
            alphabet = Array(tableSize * tableSize).fill('').map((v, i) => i + 1)
            break
        case 'Таблица Горбова-Шульте':
            alphabet = Array(Math.ceil(Math.pow(tableSize, 2) / 2) + 1)
                .fill('')
                .reduce((acc, val, i) => (acc.length + 2) <= Math.pow(tableSize, 2)
                    ? [...acc, i, i - Math.round(Math.pow(tableSize, 2) / 2) - 1]
                    : [...acc, i])
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
        case 'Рунический алфавит':
            alphabet = Array(tableSize * tableSize).fill('') //в латинице между большими и малыми идет 6 символов, их выпилит фильтр
                .map((v, i) => String.fromCharCode(i + 5792))
            break
        default:
            alphabet = Array(tableSize * tableSize).fill('').map((v, i) => i + 1)
    }
    return alphabet
}

const getNewTable = (tableSize, tableType) => {
    const alphabet = getAlphabet(tableSize, tableType)
    return Array(tableSize).fill('').map(() => Array(tableSize).fill('').map(() => alphabet.getRandom()))
}

const increaseTime = (t) => {
    const newTime = +t + 0.1
    return newTime.toFixed(1)
}


TableTimer.propTypes = {
    status: PropTypes.string,
    time: PropTypes.number
};
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
    useEffect(() => {
        return () => clearInterval(intervalRef.current)
    }, [])

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
                <TableTimer status={status} time={time}/>

                <TableStatus status={status}
                             getAlphabet={getAlphabet}
                             tableSize={tableSize}
                             tableType={tableType}
                             itemForSearch={itemForSearch}/>

                {table.map((v, i) =>
                    <div key={i} className={s.Row}>
                        {
                            v.map(vv => <Touch
                                key={vv}
                                onClick={() => onItemClick(vv)}
                                noSlideClick={false}
                                onMove={() => onItemClick(vv)}
                                className={cn({
                                    [s.Cell]: true,
                                    [s.CellBlack]: tableType === 'Таблица Горбова-Шульте' && vv > 0,
                                    [s.CellRed]: tableType === 'Таблица Горбова-Шульте' && vv < 0
                                })
                                }>{Math.abs(vv)}</Touch>)
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
