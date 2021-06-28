import React from 'react';
import {Button} from "@vkontakte/vkui";
import {useDispatch} from "react-redux";
import {addScoreTH, getScoreTH} from "../../redux/score-reducer";

const Statistics = () => {
    const dispatch=useDispatch()
    const btnGetHandler=()=>{
        dispatch(getScoreTH(1))
    }
    const btnPostHandler=()=>{
        dispatch(addScoreTH(7,250))
    }
    return (
        <div>
            Статка. Пока на минималках. Таблица с историей каток, потом сделаю график
            <Button onClick={btnGetHandler}>Запрс</Button>
            <Button onClick={btnPostHandler}>Добавить</Button>
        </div>
    );
};

export default Statistics;
