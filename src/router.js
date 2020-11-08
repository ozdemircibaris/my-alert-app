import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Index from './components/screens';

const RouterComp = () => {
    return (
        <Router>
            <Stack key="root">
                <Scene
                    key="index"
                    component={Index} />
            </Stack>
        </Router>
    )
}

export { RouterComp }