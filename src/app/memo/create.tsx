import {
    View, TextInput, StyleSheet, KeyboardAvoidingView
} from 'react-native'
import { router } from 'expo-router'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useState } from 'react'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { auth, db } from '../../config'

const handlePress = (bodyText: string): void => {
    if (!auth.currentUser) {
        return
    }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    addDoc(ref, {
        bodyText: bodyText,
        updatedAt: Timestamp.fromDate(new Date())
    })
    .then(() => {
        console.log('success')
        router.back()
    })
    .catch((error) => {
        console.error('Error adding document: ', error)
    })
}


const Create = (): JSX.Element => {
    const [bodyText, setBodyText] = useState('')
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
            <CircleButton onPress={() => handlePress(bodyText)}>
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
        paddingHorizontal: 27,
        paddingVertical: 32,
        flex: 1
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24
    }

})

export default Create