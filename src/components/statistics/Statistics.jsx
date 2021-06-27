import React from 'react';
import {Button} from "@vkontakte/vkui";
import {useDispatch} from "react-redux";
import {getScoreTH} from "../../redux/score-reducer";

const Statistics = () => {
    const dispatch=useDispatch()
    const btnHandler=()=>{
        dispatch(getScoreTH(1))
    }
    return (
        <div>
            Статка. Пока на минималках. Таблица с историей каток, потом сделаю график
            <Button onClick={btnHandler}>Запрс</Button>
        </div>
    );
};

export default Statistics;
