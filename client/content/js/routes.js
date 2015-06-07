import React from 'react';
import {
    Route,
    Redirect,
    DefaultRoute,
    createRoutesFromReactChildren,
    NotFoundRoute
    } from 'react-router';
import RootRoute from './components/route';
import NotFound from './components/not-found';
import LoginRoute from './components/login/route';
import HomeRoute from './components/authenticated/route';
import ActivityRoute from './components/authenticated/activity/route';
import ActivityContainer from './components/authenticated/activity/container';
import RegistryRoute from './components/authenticated/registry/route';
import RegistryContainer from './components/authenticated/registry/container';
import RegistryEditRoute from './components/authenticated/registry/edit/route';
import RegistryEditContainer from './components/authenticated/registry/edit/container';
import SettingsRoute from './components/authenticated/settings/route';

export default createRoutesFromReactChildren(
    <Route path="/" handler={RootRoute}>
        <Route name="login" path="login" handler={LoginRoute} />
        <Route name="home" path="home" handler={HomeRoute}>
            <Redirect from="home" to="activity" />
            <Route name="activity" path="activity" handler={ActivityRoute}>
                <DefaultRoute handler={ActivityContainer} />
            </Route>
            <Route name="registry" path="registry" handler={RegistryRoute}>
                <DefaultRoute handler={RegistryContainer} />
                <Route path="edit" handler={RegistryEditRoute}>
                    <DefaultRoute handler={RegistryEditContainer} />
                    <Route path=":id" handler={RegistryEditContainer} />
                </Route>
            </Route>
            <Route name="settings" path="settings" handler={SettingsRoute} />
        </Route>
        <NotFoundRoute handler={NotFound} />
    </Route>
);
