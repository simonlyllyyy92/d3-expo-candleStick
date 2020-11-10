import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import moment from "moment";

import { SafeAreaView } from "react-native-safe-area-context";
import { Candle } from "./Candle";
import Row from "./Row";
import Animated, {
  call,
  divide,
  floor,
  onChange,
  useCode,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black"
  },
  table: {
    flexDirection: "row",
    padding: 16
  },
  date: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500"
  },
  column: {
    flex: 1
  },
  separator: {
    width: 16
  }
});

const formatValue = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

interface HeaderProps {
  caliber: number;
  candles: Candle[];
  x: Animated.Node<number>
}

export default ({ candles, x, caliber }: HeaderProps) => {
  const [{ date, open, close, high, low }, setCandle] = useState(candles[0]);
  const diff = `${((close - open) * 100) / open}`;
  const change = close - open < 0 ? diff.substring(0, 5) : diff.substring(0, 4);
  useCode(() => onChange(x, call([floor(divide(x, caliber))], ([index])=>{
    setCandle(candles[index])
  })), [x,candles])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label="Open" value={formatValue(open)} />
          <Row label="Close" value={formatValue(close)} />
          <Row label="Volume" value="" />
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Row label="High" value={formatValue(high)} />
          <Row label="Low" value={formatValue(low)} />
          <Row
            label="Change"
            value={`${change}%`}
            color={close - open > 0 ? "#4AFA9A" : "#E33F64"}
          />
        </View>
      </View>
      <Text style={styles.date}>
        {moment(date).format("h:mm MMM Do, YYYY")}
      </Text>
    </SafeAreaView>
  );
}