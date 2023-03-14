import React from "react";
import {
  Checkbox,
  FormItem,
  Group,
  Select,
  Text,
  Title,
} from "@vkontakte/vkui";
import { useDispatch, useSelector } from "react-redux";
import {
  changeShuffleCells,
  changeSound,
  changeTableSize,
  changeTableType,
  changeVibed,
} from "../../redux/settings-reducer";

const allTableTypes = [
  { value: "Цифры", label: "Цифры" },
  { value: "Русский алфавит", label: "Русский алфавит" },
  { value: "Английский алфавит", label: "Английский алфавит" },
  { value: "Рунический алфавит", label: "Рунический алфавит" },
  { value: "Таблица Горбова-Шульте", label: "Таблица Горбова-Шульте" },
];

const allTableSizes = Array(4)
  .fill("")
  .map((v, i) => ({
    value: String(i + 3),
    label: String(i + 3),
  }));

const Settings = ({ isScoreSettings = false }) => {
  const tableSize = useSelector((s) => s.settingsReducer.size);
  const tableType = useSelector((s) => s.settingsReducer.tableType);
  const isShuffleCells = useSelector((s) => s.settingsReducer.isShuffleCells);
  const isVibed = useSelector((s) => s.settingsReducer.isVibed);
  const isSound = useSelector((s) => s.settingsReducer.isSound);
  const dispatch = useDispatch();

  const onChangeSize = (e) => dispatch(changeTableSize(+e.target.value));
  const onChangeType = (e) => dispatch(changeTableType(e.target.value));
  const onChangeShuffle = (e) => dispatch(changeShuffleCells(e.target.checked));
  const onChangeVibed = (e) => dispatch(changeVibed(e.target.checked));
  const onChangeSound = (e) => dispatch(changeSound(e.target.checked));

  return (
    <>
      <Group mode="plain">
        <Title
          level="1"
          style={isScoreSettings ? { display: "none" } : { paddingTop: "20px" }}
          weight={"medium"}
        >
          Настройки таблицы
        </Title>
        <FormItem
          top={
            <Text weight="semibold" style={{ marginBottom: 16 }}>
              Размер таблицы
            </Text>
          }
        >
          <Select
            onChange={onChangeSize}
            value={String(tableSize)}
            options={allTableSizes}
          />
        </FormItem>
        <FormItem
          top={
            <Text weight="semibold" style={{ marginBottom: 16 }}>
              Тип таблицы
            </Text>
          }
        >
          <Select
            onChange={onChangeType}
            value={tableType}
            options={allTableTypes}
          />
        </FormItem>
        <Checkbox checked={isShuffleCells} onChange={(e) => onChangeShuffle(e)}>
          При нахождении символа перемешать ячейки
        </Checkbox>
        <Checkbox
          style={isScoreSettings ? { display: "none" } : {}}
          checked={isVibed}
          onChange={(e) => onChangeVibed(e)}
        >
          Вибрация при клике
        </Checkbox>
        <Checkbox
          style={isScoreSettings ? { display: "none" } : {}}
          checked={isSound}
          onChange={(e) => onChangeSound(e)}
        >
          Звук при клике
        </Checkbox>
      </Group>
    </>
  );
};

export default Settings;
