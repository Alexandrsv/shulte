import React, {useEffect} from 'react';
import {Chart} from "./Chart";
import {Text} from "@vkontakte/vkui";
import Settings from "../settings/Settings";
import {getScoreTH} from "../../redux/score-reducer";
import {useDispatch} from "react-redux";

const Statistics = () => {
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getScoreTH(null))
    }, [dispatch])

    // Да, я знаю, что инлайн стили - оч плохое решение
    return (
        <div style={{height: '100%',}}>
            <Text level="1" weight={'semibold'} style={{textAlign: "center", padding: '30px'}}>График результатов</Text>
            <Chart/>
            <Settings isScoreSettings={true}/>
        </div>
    )
}

export default Statistics
