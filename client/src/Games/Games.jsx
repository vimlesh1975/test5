import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CustomClient from './CustomClient';

import Hockey from './Hockey'
import Kabaddi from './Kabaddi';
import Tennis from './Tennis';


const Games = () => {
    const onTabChange = () => {

    }
    return (
        <div>
            <Tabs selectedTabClassName='selectedTab' forceRenderTabPanel={true} onSelect={(index, prevIndex) => onTabChange(index, prevIndex)}>
                <TabList>
                    <Tab>Hockey</Tab>
                    <Tab>Tennis</Tab>
                    <Tab>Kabaddi</Tab>
                    <Tab>Custom Client</Tab>
                </TabList>

                <TabPanel>
                    <Hockey />
                </TabPanel>
                <TabPanel>
                    <Tennis />
                </TabPanel>
                <TabPanel>
                    <Kabaddi />
                </TabPanel>
                <TabPanel>
                    <CustomClient />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default Games
