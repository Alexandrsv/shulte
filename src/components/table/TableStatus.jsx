import s from "./Table.module.css";
import React from "react";
import cn from "classnames";

export function TableStatus({status, getAlphabet, tableSize, tableType, itemForSearch}) {
    const searchSymbol = getAlphabet(tableSize, tableType)[itemForSearch] || 0
    return <h1>{status === "win"
        ? "Победа!"
        : status === "waiting"
            ? "Нажмите пуск и найдите символы, начиная с первого"
            : <>
                <span>Найди&nbsp;</span>
                <span className={cn(s.TargetSymbol,{[s.TargetSymbolRed]: getAlphabet(tableSize, tableType)[itemForSearch] < 0})}>
                 {Number.isInteger(searchSymbol) ? Math.abs(searchSymbol) : searchSymbol}
                </span>
            </>}
    </h1>;
}
