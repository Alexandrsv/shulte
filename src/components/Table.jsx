import React, {useEffect, useState} from 'react';
import s from './Table.module.css'

const SIZE = 4

const getNewTable = (SIZE) => {
    const arrValues = Array(SIZE * SIZE).fill('').map((v, i) => i + 1)
    return Array(SIZE).fill('').map(v => Array(SIZE).fill('').map((v) => arrValues.getRandom()))
}

const Table = () => {
    const [itemForSearch, setItemForSearch] = useState(1)
    const [table, setNewTable] = useState([[]])

    useEffect(() => {
        setNewTable(getNewTable(SIZE))
    }, [])

    const onItemClick = (e) => {
        console.log(e.target.childNodes[0].data, Math.pow(table.length, 2))
        const item = e.target.childNodes[0].data
        if (itemForSearch === +item) {
            setItemForSearch(itemForSearch + 1)
        }
    }

    const onRestartTable = () => {
        setNewTable(getNewTable(SIZE))
        setItemForSearch(1)
    }

    return (
        <>
            <div className={s.Table}>
                <h1>{itemForSearch > Math.pow(table.length, 2) ? 'Победа!' : 'Найди ' + itemForSearch}</h1>
                {table.map((v, i) =>
                    <div key={i} className={s.Row}>
                        {
                            v.map(vv => <span key={vv} onClick={onItemClick} className={s.Cell}>{vv}</span>)
                        }
                    </div>)}
                {itemForSearch === Math.pow(table.length + 1, 2) && <h1>Победа</h1>}
                <button onClick={onRestartTable} className={s.Btn}>Новая таблица</button>
            </div>
        </>
    );
};

export default Table;
