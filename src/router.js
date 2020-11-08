import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Index from './components/screens';
import AddTask from './components/screens/addTask';

const RouterComp = () => {
    return (
        <Router>
            <Stack gesturesEnabled={false} key="root">
                <Scene
                    key="index"
                    title="Tasks"
                    gesturesEnabled={false}
                    component={Index} />
                <Scene
                    key="addTask"
                    title="Add Task"
                    tintColor="#000"
                    gesturesEnabled={false}
                    component={AddTask} />
            </Stack>
        </Router>
    )
}

export { RouterComp }