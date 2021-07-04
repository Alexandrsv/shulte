import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addScoreTH, getScoreTH} from "../../redux/score-reducer";
import {Chart} from "./Chart";
import {Text} from "@vkontakte/vkui";

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
            <Text level="1" weight={'semibold'} style={{ textAlign: "center",padding:'30px' }}>График результатов</Text>
            <Chart/>
        </div>
    )
}

export default Statistics
