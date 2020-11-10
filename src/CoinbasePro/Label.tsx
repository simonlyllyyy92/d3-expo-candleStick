import React from 'react'
import {StyleSheet} from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'
import {ReText} from 'react-native-redash'
import {format} from './Helpers'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        alignSelf:'flex-end',
        padding: 4,
        marginTop: 4
    },
    label: {
        color: 'black'
    }
})

interface LabelProps{
    domain: [number, number];
    translateY: Animated.Node<number>;
    size: number;
    opacity: Animated.Node<number>;
}

export default ({domain, translateY, size, opacity}: LabelProps) => {
    const value = interpolate(translateY, {
        inputRange: [0, size],
        outputRange: [domain[1], domain[0]]
    })

    const text = format(value)
    return (
        <Animated.View style={[styles.container, {transform:[{translateY}], opacity}]}>
            <ReText style={styles.label} {...{text}} />
        </Animated.View>
    )
}