import Table from "./components/table/Table";
import Settings from "./components/settings/Settings";
import {useState} from "react";
import {
    Epic,
    Group,
    Panel,
    PanelHeader,
    Placeholder,
    SplitCol,
    SplitLayout,
    Tabbar,
    TabbarItem,
    usePlatform,
    View,
    ViewWidth,
    VKCOM,
    withAdaptivity
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {Icon16GridOfFour, Icon28GearCircleFillGray, Icon28GraphOutline} from "@vkontakte/icons";
import Statistics from "./components/statistics/Statistics";
import {useSelector} from "react-redux";

Array.prototype.getRandom = function () {
    const idx = Math.floor((Math.random() * this.length))
    const elem = this[idx]
    this.splice(idx, 1)
    return elem
}

const App = withAdaptivity(({viewWidth}) => {
    const platform = usePlatform();
    const [activeStory, setActiveStory] = useState('table');
    const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
    const isDesktop = viewWidth >= ViewWidth.TABLET;
    const hasHeader = platform !== VKCOM;
    const state = useSelector(s => s)

    return (
        <SplitLayout
            header={hasHeader && <PanelHeader separator={false}/>}
            style={{justifyContent: "center"}}
        >

            <SplitCol
                animate={true}
                // width={'100%'}
                // maxWidth={'100%'}
            >
                <Epic activeStory={activeStory} tabbar={
                    <Tabbar shadow={false}>
                        <TabbarItem
                            onClick={onStoryChange}
                            selected={activeStory === 'table'}
                            data-story="table"
                            text="Таблицы Шульте"
                        ><Icon16GridOfFour width={28} height={28}/></TabbarItem>
                        <TabbarItem
                            onClick={onStoryChange}
                            selected={activeStory === 'statistics'}
                            data-story="statistics"
                            text="Статистика"
                        ><Icon28GraphOutline/></TabbarItem>
                        <TabbarItem
                            onClick={onStoryChange}
                            selected={activeStory === 'settings'}
                            data-story="settings"
                            label="2"
                            text="Настройки"
                        ><Icon28GearCircleFillGray/></TabbarItem>
                        <TabbarItem
                            onClick={() => {
                                console.log('State', state)
                            }}
                            selected={activeStory === 'settings'}
                            data-story="settings"
                            label="2"
                            text="State"
                        ><Icon28GearCircleFillGray/></TabbarItem>


                    </Tabbar>
                }>
                    <View id="table" activePanel="table">
                        <Panel id="table">
                            <PanelHeader>Таблицы Шульте</PanelHeader>
                            <Group style={{height: ''}}>
                                <Table/>
                            </Group>
                        </Panel>
                    </View>
                    <View id="statistics" activePanel="statistics">
                        <Panel id="statistics">
                            <PanelHeader>Статистика</PanelHeader>
                            <Group style={{}}>
                                <Placeholder icon={<Icon28GraphOutline width={56} height={56}/>}>
                                </Placeholder>
                                <Statistics/>
                            </Group>
                        </Panel>
                    </View>
                    <View id="settings" activePanel="settings">
                        <Panel id="settings">
                            <PanelHeader>Настройки</PanelHeader>
                            <Group style={{}}>
                                <Placeholder icon={<Icon28GearCircleFillGray width={56} height={56}/>}>
                                </Placeholder>
                                <Settings/>
                            </Group>
                        </Panel>
                    </View>
                </Epic>
            </SplitCol>
        </SplitLayout>
    );
}, {
    viewWidth: true
});


export default App;
