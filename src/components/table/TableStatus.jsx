import s from "./Table.module.css";
import React from "react";
import cn from "classnames";

export function TableStatus({status, getAlphabet, tableSize, tableType, itemForSearch}) {
    return <h1>{status === "win"
        ? "Победа!"
        : status === "waiting"
            ? "Нажмите пуск и найдите символы, начиная с первого"
            : <>
                <span>Найди&nbsp;</span>
                <span className={cn({[s.TargetSymbolRed]: getAlphabet(tableSize, tableType)[itemForSearch] < 0})}>
                 {Math.abs(getAlphabet(tableSize, tableType)[itemForSearch] || 0)}
                </span>
            </>}
    </h1>;
}
