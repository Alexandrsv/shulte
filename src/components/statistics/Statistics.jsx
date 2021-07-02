import React from 'react';
import {Button} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import {addScoreTH, getScoreTH} from "../../redux/score-reducer";
import {Chart} from "./Chart";

const Statistics = () => {
    const dispatch = useDispatch()
    const score = useSelector(s=>s.scoreReducer.score)
    const btnGetHandler = () => {
        dispatch(getScoreTH(1))
    }
    const btnPostHandler = () => {
        dispatch(addScoreTH(250))
    }
    return (
        <div>
            Тут будет график. Когда-нибудь...
            {score.map((s)=> {
                return <div>{s.map(l=><span>{l<10000?l:Date(l*1000)}|</span>)}</div>
            })}
            <Button onClick={btnGetHandler}>Запрс</Button>
            <Button onClick={btnPostHandler}>Добавить</Button>
            <hr/><hr/>
            <Chart/>
        </div>
    )
}

export default Statistics
