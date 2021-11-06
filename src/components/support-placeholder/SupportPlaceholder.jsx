import React from 'react';
import {Placeholder, Panel} from "@vkontakte/vkui";
import {Icon56AppleDeviceOutline} from "@vkontakte/icons";

const SupportPlaceholder = () => {
    return (
        <Panel centered={true}>
            <Placeholder
                icon={<Icon56AppleDeviceOutline/>}
                header="Нельзя сотворить здесь"
            >
                Устройства на базе IOS в данный момент не поддерживаются :-( <br/>
                Со временем это будет исправлено
            </Placeholder>
        </Panel>
    );
};

export default SupportPlaceholder;
