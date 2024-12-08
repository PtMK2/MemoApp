import {
    View, TextInput, StyleSheet, KeyboardAvoidingView,
    Alert
} from 'react-native'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { router, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { auth, db } from '../../config'

const handlePress = (id: string, bodyText: string): void => {
    if (auth.currentUser === null) {
        return
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    setDoc(ref, {
        bodyText: bodyText,
        updatedAt: Timestamp.fromDate(new Date())
    })
    .then(() => {
        router.back()
    })
    .catch((error) => {
        console.error('Error updating document: ', error)
        Alert.alert('更新に失敗しました')
    })
    router.back()
}

const Edit = (): JSX.Element => {
    const id = String(useLocalSearchParams().id)
    const [bodyText, setBodyText] = useState('') 
    useEffect(() => {
        if (auth.currentUser === null) {
            return
        }
        const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)  
        getDoc(ref)
        .then((docRef) => {
            console.log(docRef.id, '=>', docRef.data())
            const RemoteBodyText = docRef?.data()?.bodyText
            setBodyText(RemoteBodyText)
        })
        .catch((error) => {
            console.error('Error getting document: ', error)
        })
    }, [])
    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput 
                    multiline 
                    style={styles.input} 
                    value={bodyText}
                    onChangeText={(text) => { setBodyText(text) }}
                />
            </View>
            <CircleButton onPress={() => handlePress(id, bodyText)}>
                <Icon name='check' size={40} color='#fffffff'/>
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flex: 1
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
        paddingHorizontal: 27,
        paddingVertical: 32
    }

})

export default Edit