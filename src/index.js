import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import bridge from '@vkontakte/vk-bridge';
import {AdaptivityProvider, AppRoot, ConfigProvider} from "@vkontakte/vkui";
import {Provider} from "react-redux";
import store from "./redux/store";
import { YMInitializer } from 'react-yandex-metrika';

export const UserContext = createContext();

bridge.send("VKWebAppInit", {});


const renderDefault = () => {
    bridge.send('VKWebAppInit').then(_ => {
        bridge.send('VKWebAppGetUserInfo').then(r => {
            ReactDOM.render(
                <React.StrictMode>
                    <Provider store={store}>
                        <ConfigProvider webviewType='internal'>
                            <AdaptivityProvider>
                                <AppRoot>
                                    <UserContext.Provider value={r}>
                                        <App/>
                                        {/*<Example/>*/}
                                        <YMInitializer accounts={[82216162]} options={{webvisor: true}} version="2" />
                                    </UserContext.Provider>
                                </AppRoot>
                            </AdaptivityProvider>
                        </ConfigProvider>
                    </Provider>
                </React.StrictMode>,
                document.getElementById('root')
            )

        })
    })
}



renderDefault()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
