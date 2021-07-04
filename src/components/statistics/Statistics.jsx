import React from 'react';
import {Chart} from "./Chart";
import {Text} from "@vkontakte/vkui";
import Settings from "../settings/Settings";

const Statistics = () => {

    return (
        <div>
            <Text level="1" weight={'semibold'} style={{textAlign: "center", padding: '30px'}}>График результатов</Text>
            <Chart/>
            <Settings isScoreSettings={true}/>
        </div>
    )
}

export default Statistics
