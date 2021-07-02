import {Icon16ClockOurline} from "@vkontakte/icons";
import React from "react";

export function TableTimer({status,time}) {
    return <>
            <span style={{
                padding: "10px",
                visibility: status !== "waiting" ? "visible" : "hidden"
            }
            }>
                <Icon16ClockOurline/>
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
