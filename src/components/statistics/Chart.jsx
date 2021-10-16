import {Area, AreaChart, CartesianGrid, Label, Tooltip, XAxis, YAxis} from 'recharts';
import {useSelector} from "react-redux";
import {Icon28GraphOutline} from "@vkontakte/icons";
import {Placeholder} from "@vkontakte/vkui";


// const data = Array(100)
//     .fill('')
//     .map((v, i) => ({
//         "name": `  Page ${i}  `,
//         "x": (Math.random() * 100).toFixed(),
//         "y": 5 + Math.random() * 20,
//         "z": Math.random() * 2000,
//     }))


export function Chart() {
    const tableSize = useSelector(s => s.settingsReducer.size)
    const tableType = useSelector(s => s.settingsReducer.tableType)
    const isShuffleCells = useSelector(s => s.settingsReducer.isShuffleCells)
    const score = useSelector(s => s.scoreReducer.score.filter((v) => {
        return v.size === tableSize && v.tableType === tableType && v.isShuffleCells === isShuffleCells
    }))
    const data = score.map((v, i) => ({attemptNumber: +i + 1, 'Затраченное время': +v.timeOfPassing}))
    if (data.length === 0) {
        return <Placeholder icon={<Icon28GraphOutline width={56} height={56}/>}>Нет данных о попытках прохождения
            таблицы с указанными настройками</Placeholder>
    }
    return <div>
        <AreaChart width={window.innerWidth} height={250} data={data}
                   margin={{top: 10, right: 30, left: -10, bottom: 20}}
        >
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="40%" stopColor="#4986CC" stopOpacity={0.8}/>
                    <stop offset="99%" stopColor="#fff" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="attemptNumber"
                   type={'number'}
                   allowDecimals={false}
                   >
                <Label value="Номер попытки" offset={-10} position="bottom"/>
            </XAxis>
            <YAxis axisLine={false}>
                <Label value={'Время в секундах'} position="Left" angle={-90} type={'number'}/>
            </YAxis>
            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
            <Tooltip
                label={'213'}
                separator={':'}
                labelFormatter={(props) => {
                    return `Попытка номер ${props}`
                }}
                formatter={(props) => {
                    return ` ${props} сек`
                }}
            />
            <Area type="monotone" dataKey='Затраченное время' stroke="#4986CC" fillOpacity={1} fill="url(#colorUv)"/>
            {/*<Brush*/}
            {/*    data={data}*/}
            {/*    dataKey={'attemptNumber'}*/}
            {/*    travellerWidth={10}*/}
            {/*    height={40}*/}
            {/*    // startIndex={data.length>20 && Math.round(data.length * 0.8)}*/}
            {/*    fill={'#fff'}*/}
            {/*    stroke={'#4986CC'}*/}
            {/*/>*/}
        </AreaChart>
    </div>
}
