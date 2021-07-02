import {Area, AreaChart, Brush, CartesianGrid, Tooltip, XAxis, YAxis} from 'recharts';


const data = Array(100)
    .fill('')
    .map((v, i) => ({
        "name": `  Page ${i}  `,
        "x": (Math.random() * 100).toFixed(),
        "y": 5 + Math.random() * 20,
        "z": Math.random() * 2000,
    }))


export function Chart() {
    return <div>
        <AreaChart width={300} height={250} data={data}
                   margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="40%" stopColor="#4986CC" stopOpacity={0.8}/>
                    <stop offset="99%" stopColor="#fff" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type="monotone" dataKey="x" stroke="#4986CC" fillOpacity={1} fill="url(#colorUv)"/>
            <Brush
                data={data}
                travellerWidth={10}
                startIndex={data.length * 0.8}
                fill={'#fff'}
                stroke={'#4986CC'}
            />
        </AreaChart>
    </div>
}
