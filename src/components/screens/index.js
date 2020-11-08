import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import { fetchTasks } from '../../actions/tasksAction';


export class Index extends Component {
    componentWillMount() {
        this.props.fetchTasks()
    }
    render() {
        return (
            <View>
                <Text> prop </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(
    mapStateToProps,
    {
        fetchTasks
    }
)(Index)
