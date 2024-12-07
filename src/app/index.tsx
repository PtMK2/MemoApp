import { Redirect, router } from 'expo-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'

import { auth } from '../config'

const Index = (): JSX.Element => {
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('logged in')
                router.replace('/memo/list')
            }
        })
    }, [])
    return <Redirect href="auth/sign_up" />
}

export default Index