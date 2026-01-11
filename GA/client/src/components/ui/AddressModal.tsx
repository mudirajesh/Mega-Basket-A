import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';


interface AddressModalProps {
    visible: boolean;
    onClose: () => void;
    currentAddress: string;
    onSave: (address: string) => void;
}

const AddressModal: FC<AddressModalProps> = ({ visible, onClose, currentAddress, onSave }) => {
    const [address, setAddress] = useState(currentAddress)

    useEffect(() => {
        setAddress(currentAddress)
    }, [currentAddress])


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Change Address</CustomText>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name='close' size={24} color={Colors.text} />
                        </TouchableOpacity>
                    </View>

                    <CustomText variant='h8' style={{ marginTop: 10, marginBottom: 5 }} fontFamily={Fonts.Medium}>
                        Delivery Address
                    </CustomText>
                    
                    <TextInput
                     style={styles.input}
                     multiline
                     numberOfLines={4}
                     value={address}
                     onChangeText={setAddress}
                     placeholder="Enter your delivery address"
                     placeholderTextColor="#aaa"
                    />

                    <TouchableOpacity 
                    style={styles.saveBtn}
                    onPress={() => {
                        onSave(address)
                        onClose()
                    }}
                    >
                        <CustomText variant='h6' style={{color: '#fff'}} fontFamily={Fonts.Bold}>Save Address</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        elevation: 5,
        height: '50%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 10,
        padding: 10,
        fontFamily: Fonts.Regular,
        fontSize: RFValue(12),
        color: Colors.text,
        textAlignVertical: 'top',
        height: 100,
        marginBottom: 20
    },
    saveBtn: {
        backgroundColor: Colors.secondary,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    }
})

export default AddressModal
