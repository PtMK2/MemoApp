import { View, StyleSheet } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { memo, useEffect , useState} from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'

import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import LogOutButton from '../../components/LogOutButton'
import { db, auth } from '../../config'
import { Memo } from '../../../types/memo'

const handlePress = (): void => {
    router.push('/memo/create')
}

const List = (): JSX.Element => {
    const [memos, setMemos] = useState<Memo[]>([])
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => { return <LogOutButton />}
        })
    }, [])

    useEffect(() => {
        if (auth.currentUser === null) {
            return
        }
        const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
        const q = query(ref, orderBy('updatedAt', 'desc'))
        const unsubscribe =  onSnapshot(q, (snapshot) => {
            const remoteMemos: Memo[] = []
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data())
                const { bodyText, updatedAt } = doc.data()
                remoteMemos.push({
                    id: doc.id,
                    bodyText: bodyText,
                    updatedAt: updatedAt.toDate()
                })
            })
            setMemos(remoteMemos)
        })
        return unsubscribe
    }, [])
    return (
        <View style={styles.container}>
            <View>
                {memos.map((memo) => {
                    return <MemoListItem memo={memo}/>
                })}
            </View>
            <CircleButton onPress={handlePress}>
                <Icon name='plus' size ={40} color='#fffffff'/>
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF'
    }
})

export default List