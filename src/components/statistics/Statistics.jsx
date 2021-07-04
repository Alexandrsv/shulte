import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addScoreTH, getScoreTH} from "../../redux/score-reducer";
import {Chart} from "./Chart";

const Statistics = () => {
    const dispatch = useDispatch()
    const score = useSelector(s => s.scoreReducer.score)
    const btnGetHandler = () => {
        dispatch(getScoreTH(1))
    }
    const btnPostHandler = () => {
        dispatch(addScoreTH(250))
    }
    return (
        <div>
            Тут будет график. Когда-нибудь...

            <hr/>
            <hr/>
            <Chart/>
        </div>
    )
}

export default Statistics
