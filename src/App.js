import Table from "./components/table/Table";
import Settings from "./components/settings/Settings";

import { useEffect, useState } from "react";
import {
  Epic,
  Panel,
  PanelHeader,
  SplitCol,
  SplitLayout,
  Tabbar,
  TabbarItem,
  usePlatform,
  View,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {
  Icon28AllCategoriesOutline,
  Icon28GraphOutline,
  Icon28SettingsOutline,
} from "@vkontakte/icons";
import Statistics from "./components/statistics/Statistics";
import bridge from "@vkontakte/vk-bridge";
import { useDispatch } from "react-redux";
import { userInit } from "./redux/init-reducer";
import { logger } from "./logger";
import { getScoreTH } from "./redux/score-reducer";
import SupportPlaceholder from "./components/support-placeholder/SupportPlaceholder";
import { useAds } from "./hooks/useAds";
// eslint-disable-next-line no-extend-native
Array.prototype.getRandom = function () {
  const idx = Math.floor(Math.random() * this.length);
  const elem = this[idx];
  this.splice(idx, 1);
  return elem;
};

const App = () => {
  const platform = usePlatform();
  const [activeStory, setActiveStory] = useState("table");
  useAds();

  const onStoryChange = (e) => setActiveStory(e.currentTarget.dataset.story);
  const hasHeader = false;
  const dispatch = useDispatch();
  logger("platform", platform);

  useEffect(() => {
    // eruda.init();
    bridge.send("VKWebAppGetUserInfo").then((r) => {
      logger("VKWebAppGetUserInfo", r);
      dispatch(userInit(r));
    });
    bridge.subscribe((e) => {
      logger("bridge.subscribe", e);
      // eslint-disable-next-line default-case
      switch (e.detail.type) {
        case "VKWebAppViewRestore":
          dispatch(getScoreTH(null));
          break;
      }
    });
  }, [dispatch]);

  if (platform === "ios") {
    return <SupportPlaceholder />;
  }

  return (
    <SplitLayout
      header={hasHeader && <PanelHeader separator={false} />}
      style={{ justifyContent: "center", backgroundColor: "white" }}
    >
      <SplitCol animate={true}>
        <Epic
          activeStory={activeStory}
          tabbar={
            <Tabbar shadow={false} onClick={() => {}}>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "table"}
                data-story="table"
                text="Таблицы Шульте"
              >
                <Icon28AllCategoriesOutline style={{ cursor: "pointer" }} />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "statistics"}
                data-story="statistics"
                text="Статистика"
              >
                <Icon28GraphOutline style={{ cursor: "pointer" }} />
              </TabbarItem>
              <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === "settings"}
                data-story="settings"
                text="Настройки"
              >
                <Icon28SettingsOutline style={{ cursor: "pointer" }} />
              </TabbarItem>
            </Tabbar>
          }
        >
          <View id="table" activePanel="table">
            <Panel id="table">
              <PanelHeader>Таблицы Шульте</PanelHeader>
              <Table />
            </Panel>
          </View>
          <View id="statistics" activePanel="statistics">
            <Panel id="statistics">
              <PanelHeader>Статистика</PanelHeader>
              <Statistics />
            </Panel>
          </View>
          <View id="settings" activePanel="settings">
            <Panel id="settings">
              <PanelHeader>Настройки</PanelHeader>
              <Settings />
            </Panel>
          </View>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};

export default App;
