import { View, StyleSheet } from 'react-native'

import Header from '../components/Header'
import MemoListItem from '../components/MemoListItem'
import CircleButton from '../components/CircleButton'

const Index = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View>
                <MemoListItem />
                <MemoListItem />
                <MemoListItem />
            </View>
            <CircleButton>+</CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFF'
    }

})

export default Index