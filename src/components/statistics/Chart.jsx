import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import { Icon28GraphOutline } from "@vkontakte/icons";
import { Placeholder } from "@vkontakte/vkui";
import { logger } from "../../logger";

export function Chart() {
  const tableSize = useSelector((s) => s.settingsReducer.size);
  const tableType = useSelector((s) => s.settingsReducer.tableType);
  const isShuffleCells = useSelector((s) => s.settingsReducer.isShuffleCells);
  const score = useSelector((s) =>
    s.scoreReducer.score.filter((v) => {
      return (
        v.size === tableSize &&
        v.tableType === tableType &&
        v.isShuffleCells === isShuffleCells
      );
    })
  );
  const data = score.map((v, i) => ({
    attemptNumber: +i + 1,
    "Затраченное время": +v.timeOfPassing,
  }));
  logger("SCORE", score);

  if (data.length === 0) {
    return (
      <div style={{ height: 250 }}>
        <Placeholder icon={<Icon28GraphOutline width={56} height={56} />}>
          Нет данных о попытках прохождения таблицы с указанными настройками
        </Placeholder>
      </div>
    );
  }
  return (
    <div key={Math.random()}>
      <AreaChart
        width={window.innerWidth}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 5, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="40%" stopColor="#4986CC" stopOpacity={0.8} />
            <stop offset="99%" stopColor="#fff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="attemptNumber" type={"number"} allowDecimals={false}>
          <Label value="Номер попытки" offset={-10} position="bottom" dy={5} />
        </XAxis>
        <YAxis axisLine={false}>
          <Label
            value={"Время в секундах"}
            position="Left"
            angle={-90}
            type={"number"}
            dx={-15}
          />
        </YAxis>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip
          label={"213"}
          separator={":"}
          labelFormatter={(props) => {
            return `Попытка номер ${props}`;
          }}
          formatter={(props) => {
            return ` ${props} сек`;
          }}
        />
        <Area
          type="monotone"
          dataKey="Затраченное время"
          stroke="#4986CC"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
}
