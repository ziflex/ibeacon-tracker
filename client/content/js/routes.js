import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import AppRoute from './components/route';
import ActivityRoute from './components/activity/route';
import ActivityContainer from './components/activity/container';
import RegistryRoute from './components/registry/route';
import RegistryContainer from './components/registry/container';
import RegistryEditRoute from './components/registry/edit/route';
import RegistryEditContainer from './components/registry/edit/container';

// declare our routes and their hierarchy
export default (
    <Route handler={AppRoute}>
        <Route path="/" handler={ActivityRoute}>
            <DefaultRoute handler={ActivityContainer} />
        </Route>
        <Route path="registry" handler={RegistryRoute}>
            <DefaultRoute handler={RegistryContainer} />
            <Route path="edit" handler={RegistryEditRoute}>
                <DefaultRoute handler={RegistryEditContainer} />
                <Route path=":id" handler={RegistryEditContainer} />
            </Route>
        </Route>
    </Route>
);
