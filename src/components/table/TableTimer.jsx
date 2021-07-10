import {Icon16ClockOurline} from "@vkontakte/icons";
import React from "react";

export function TableTimer({status, time}) {
    return <>
            <span style={{
                margin: "10px",
                visibility: status !== "waiting" ? "visible" : "hidden"
            }
            }>
                <Icon16ClockOurline style={window.innerHeight < 603 && {display: 'none'}}/>
            </span>
        <div style={{
            display: "inline",
            fontFamily: "monospace",
            visibility: status !== "waiting" ? "visible" : "hidden"
        }}>
            {time + " сек"}
        </div>
    </>;
}
