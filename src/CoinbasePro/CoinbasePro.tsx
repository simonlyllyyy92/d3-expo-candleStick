import React, {useEffect, useState} from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import demoData from './demoData.json'
import Values from "./Values";
import Line from "./Line";
import Content from "./Content";
import Header from "./Header";
import Chart from './Chart';
import { PanGestureHandler, ScrollView, State } from "react-native-gesture-handler";
import Animated, {  add,diffClamp,eq,modulo,sub } from 'react-native-reanimated'
import {onGestureEvent, useValues} from 'react-native-redash'
import Label from './Label'

const { width: size } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "black"
  }
});

/**
 * @PanGestureHandlerState
 * State.UNDETERMINED This is the initial state of each handler. It also changes to that state when it is done recognizing and hasn't started recogninzing another gesture.
 * State.FAILED Handler has received some touches, but for some condition (e.g. finger traveled too long distance when maxDist property is set) it won't get activated and gesture was not recognized. After that handler is reset to the initial state.
 * State.BEGAN Handler has started receiving touch stream but hasn't yet receive enough data to either fail or activate.
 * State.CANCELLED The gesture recognizer has received signal (possibly new touches or a command from the touch system controller) resulting in the cancellation of a continuous gesture. Gesture recognizer is reset to the initial state.
 * State.ACTIVE Handler has recognized gesture and will stay in the active as until the gesture finishes (normally when user lifts the finger) or get cancelled by the touch system. Under normal circumstances it would turn into ended state. In case it is cancelled by the touch system it would turn into CANCELLED state. Learn about discrete and continuous handlers here to understand how long handler can be kept in the ACTIVE state.
 * State.END The gesture recognizer has received touches recognized as the end of the gesture. After that it will reset to the initial state.
 */
export default () => {


  const [initialNum, setInitialNum] = useState(0)
  const [numToSlice, setNumToSlice] = useState(40)
  const [currentSlice, setCurrentSlice] = useState(1)

  let candles = demoData.slice(initialNum, numToSlice)
  let values = candles.map(candle => [candle.l, candle.h]).flat()
  let domain: [number,number]= [Math.min(...values), Math.max(...values)]
  const caliber = size / candles.length;


  const [x, y, state] = useValues([0,0,State.UNDETERMINED], [])
  const gestureHandler = onGestureEvent({x,y,state})
  const opacity = eq(state, State.ACTIVE)
  const translateY = diffClamp(y, 0, size);
  const translateX = add(sub(x, modulo(x, caliber)), caliber / 2)
  //eq Returns 1 if the value of both nodes are equal. Otherwise returns 0.
  //modulo 取余
  //add 求和
  //sub 按 element 顺序相减


  useEffect(() => {
    candles = demoData.slice(initialNum, numToSlice)
    values = candles.map(candle => [candle.l, candle.h]).flat()
    domain = [Math.min(...values), Math.max(...values)]
  }, [initialNum, numToSlice])

  
  
  const handleNextSlides = () => {
    if(initialNum < demoData.length){
      setInitialNum(initialNum + 40)
      setNumToSlice(numToSlice + 40)
      setCurrentSlice(currentSlice + 1)
    }
  }

  const handlePrevSlides = () => {
    if(initialNum > 0){
      setInitialNum(initialNum - 40)
      setNumToSlice(numToSlice - 40)
      setCurrentSlice(currentSlice - 1)
    }
  }
  return (
    <ScrollView style={styles.container}>
      <View>
        <Header />
        <Animated.View style={{opacity}}>
          <Values x={translateX} {...{ caliber, candles }} />
        </Animated.View>
      </View>
        <View>
          <Chart {...{candles,size, caliber, domain}} />
          <PanGestureHandler  {...gestureHandler}>
            <Animated.View style={StyleSheet.absoluteFill}>
              <Animated.View style={{...StyleSheet.absoluteFillObject, opacity, transform:[{translateY}]}}>
                <Line x={size} y={0}/>
              </Animated.View>
              <Animated.View style={{...StyleSheet.absoluteFillObject, opacity, transform:[{translateX}]}}>
                <Line x={0} y={size}/>
              </Animated.View>
              <Label {...{translateY, domain, size, opacity}}/>
            </Animated.View>
          </PanGestureHandler>
        </View>
        <Content {...{domain, handleNextSlides, handlePrevSlides, currentSlice}}/>
    </ScrollView>
  );
};
