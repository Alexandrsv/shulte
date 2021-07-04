import React, {useEffect, useRef, useState} from 'react';
import s from './Table.module.css'
import bridge from "@vkontakte/vk-bridge";
import {Button, Div, Touch} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import {clickSound} from "../../assets/audio/click_sound";
// import clickSound from '../../assets/audio/click.wav'
import cn from 'classnames'
import {TableStatus} from "./TableStatus";
import {TableTimer} from "./TableTimer";
import {getAlphabet, getNewTable, increaseTime} from "../../utils/utils";
import {addResultToScore} from "../../redux/score-reducer";


const Table = () => {
    const [itemForSearch, setItemForSearch] = useState(0)
    const [timeOfPassing, setTime] = useState(0)
    const [table, setNewTable] = useState([[]])
    const [status, setStatus] = useState('waiting') //waiting|win|game

    const tableSize = useSelector(s => s.settingsReducer.size)
    const isShuffleCells = useSelector(s => s.settingsReducer.isShuffleCells)
    const isVibed = useSelector(s => s.settingsReducer.isVibed)
    const isSound = useSelector(s => s.settingsReducer.isSound)
    const tableType = useSelector(s => s.settingsReducer.tableType)

    const dispatch = useDispatch()

    const intervalRef = useRef()
    useEffect(() => {
        return () => clearInterval(intervalRef.current)
    }, [])

    useEffect(() => { //Обработка победы, остановка таймера
        if (itemForSearch >= Math.pow(tableSize, 2)) {
            setStatus('win')
            clearInterval(intervalRef.current)
            dispatch(addResultToScore(tableSize, tableType, isShuffleCells, timeOfPassing, Date.now()))
        }
    }, [dispatch, isShuffleCells, itemForSearch, tableSize, tableType, timeOfPassing])

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
                <TableTimer status={status} time={timeOfPassing}/>

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
                                }>{Number.isInteger(vv) ? Math.abs(vv) : vv}</Touch>)
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
