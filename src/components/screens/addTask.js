import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { addTask } from '../../actions/tasksAction';
import { AppButton, AppInput, envStyles, PhoneHeight, PhoneWidth, responsiveSize } from '../../config/env';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/tr';

export class AddTask extends Component {
    state = {
        titleValue: "",
        subTitleValue: "",
        jobDateValue: new Date(),
        jobDateModalVisible: false,
        jobPickedStatus: false
    }

    onTitleChanged = value => this.setState({ titleValue: value })
    onSubTitleChanged = value => this.setState({ subTitleValue: value })
    onJobDateChanged = (e, value) => this.setState({ jobDateValue: value })
    onCloseModal = () => this.setState({ jobDateModalVisible: false })
    onPickedJob = () => this.setState({ jobDateModalVisible: false, jobPickedStatus: true })
    onAddTask = () => {
        this.props.addTask(
            this.state.titleValue,
            this.state.subTitleValue,
            this.state.jobDateValue
        )
    }

    render() {
        const { jobDateModalVisible, jobDateValue, jobPickedStatus } = this.state;
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent
                    visible={jobDateModalVisible}
                    onRequestClose={this.onCloseModal}>
                    <View style={envStyles.modalContainer}>
                        <View style={envStyles.modalTopContent}>
                            <TouchableOpacity onPress={this.onCloseModal}>
                                <Text style={envStyles.modalButtonTitle}> Vazgeç </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onPickedJob}>
                                <Text style={envStyles.modalButtonTitle}> Seç </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            jobDateModalVisible && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={jobDateValue}
                                    mode={"datetime"}
                                    locale="tr"
                                    is24Hour={true}
                                    display="spinner"
                                    onChange={this.onJobDateChanged}
                                    />
                            )
                        }
                    </View>
                </Modal>
                <AppInput
                    placeholder="title"
                    onChangeText={this.onTitleChanged}
                    icon={require('../../icons/title.png')} />
                <AppInput
                    placeholder="subTitle"
                    onChangeText={this.onSubTitleChanged}
                    icon={require('../../icons/description.png')} />
                <TouchableOpacity
                    onPress={() => this.setState({ jobDateModalVisible: true })}
                    style={styles.inputWrapper}>
                    <Image
                        style={styles.inputIcon}
                        source={require('../../icons/calendar.png')} />
                        <Text style={styles.inputTitle}>{jobPickedStatus == true ? moment(jobDateValue).format('LLL'):"jobDate"}  </Text>
                </TouchableOpacity>
                <AppButton
                    onPress={this.onAddTask}
                    style={styles.appButton}
                    title="Ekle" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    appButton: {
        marginTop: PhoneHeight * 0.05
    },
    inputWrapper: {
        borderBottomWidth: 1,
        width: PhoneWidth * 0.85,
        height: PhoneHeight * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#212d40',
        marginTop: 20,
    },
    inputIcon: {
        width: responsiveSize(15),
        height: responsiveSize(15),
        marginLeft: 15,
        resizeMode: 'contain'
    },
    inputTitle: {
        width: "80%",
        textAlign: 'center'
    }
})

const mapStateToProps = (state) => {
    return {

    }
}
export default connect(
    mapStateToProps,
    {
        addTask
    }
)(AddTask)