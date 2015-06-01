import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import AppRoute from './components/route';
import MonitorRoute from './components/monitor/route';
import RegistryRoute from './components/registry/route';
import Registry from './components/registry/container';
import RegistryDetailsRoute from './components/registry/details/route';
import RegistryDetails from './components/registry/details/container';

// declare our routes and their hierarchy
export default (
    <Route handler={AppRoute}>
        <Route path="/" handler={MonitorRoute}/>
        <Route path="registry" handler={RegistryRoute}>
            <DefaultRoute name="registry-list" handler={Registry} />
            <Route path="edit" handler={RegistryDetailsRoute}>
                <DefaultRoute name="registry-details" handler={RegistryDetails} />
                <Route path=":id" handler={RegistryDetails} />
            </Route>
        </Route>
    </Route>
);
