import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { fetchTasks } from '../../actions/tasksAction';
import { PhoneHeight, PhoneWidth, responsiveSize } from '../../config/env';
import moment from 'moment';
import 'moment/locale/tr';
import { Actions } from 'react-native-router-flux';

export class Index extends Component {
    componentWillMount() {
        this.props.fetchTasks()
    }
    taskRenderItemContent = (key, value, out_of_date) => {
        return (
            <View style={styles.taskRenderItemContent}>
                <Text style={styles.cardTitle}> {key}: </Text>
                <Text style={[styles.cardValue, {color: out_of_date == true ? "#d66853":"#7d4"}]}> {value} </Text>
            </View>
        )
    }
    tasksListRenderItem = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                { this.taskRenderItemContent("title", item.title, item.out_of_date) }
                { this.taskRenderItemContent("subTitle", item.subTitle, item.out_of_date) }
                { this.taskRenderItemContent("jobDate", moment(item.jobDate).format('LLL'), item.out_of_date) }
            </View>
        )
    }
    render() {
        const { tasksValues } = this.props;
        // console.log('tasksValues ', tasksValues.length > 0 ? Date.parse(tasksValues[14].jobDate) - Date.parse(tasksValues[13].jobDate):null)
        // console.log('tasksValues ', Date.parse(tasksValues[15].jobDate) - Date.parse(tasksValues[14].jobDate))
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={tasksValues}
                    style={{
                        marginTop: PhoneHeight * 0.02,
                    }}
                    renderItem={this.tasksListRenderItem} />
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => Actions.addTask()}
                    style={{ marginVertical: PhoneHeight * 0.02 }}>
                    <Image
                        style={styles.addTasks}
                        source={require('../../icons/add.png')} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    cardContainer: {
        padding: 10,
        backgroundColor: '#11151C',
        width: PhoneWidth * 0.9, // default -80
        marginHorizontal: 10,
        marginVertical: PhoneHeight * 0.02,
        height: PhoneHeight * 0.2,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    cardTitle: {
        color: '#fff',
        fontSize: responsiveSize(14)
    },
    cardValue: {
        color: '#7d4',
        fontSize: responsiveSize(14)
    },
    taskRenderItemContent: {
        flexDirection: 'row'
    },
    addTasks: {
        width: responsiveSize(50),
        height: responsiveSize(50),
    }
})

const mapStateToProps = (state) => {
    const { tasksValues } = state.TasksReducer;
    return {
        tasksValues
    }
}

export default connect(
    mapStateToProps,
    {
        fetchTasks
    }
)(Index)
