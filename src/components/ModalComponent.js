import React from 'react';
import { View, Modal, TouchableOpacity, Text } from 'react-native';

import styles from '../../assets/styles/style.js';

import TimesDark from './../../assets/images/times-dark.svg';

export default function ModalComponent({ modalVisible, setModalVisible, modalTitle, modalContent }) {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.H3TitleNoMargin}>{modalTitle}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.modalClose}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <TimesDark width={20} height={20} />
                        </TouchableOpacity>
                    </View>
                    {modalContent}
                </View>
            </View>
        </Modal>
    );
}