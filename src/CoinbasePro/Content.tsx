import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  tabs: {
    flexDirection: "row",
    padding: 16
  },
  tabActive: {
    borderBottomWidth: 1,
    borderColor: "white",
    paddingBottom: 8
  },
  tabLabelActive: {
    color: "white",
    fontSize: 20
  },
  tab: {
    borderBottomWidth: 1,
    borderColor: "#222324",
    paddingBottom: 8,
    flex: 1
  },
  tabLabel: {
    fontSize: 20,
    color: "white",
    marginLeft: 16
  },
  actions: {
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
    backgroundColor: "#222324",
    borderRadius: 8,
    padding: 16
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  noOrders: {
    color: "white",
    marginLeft: 4,
    fontSize: 20,
    marginTop: 16
  },
  values: {
    flex: 1
  },
  value: {
    color: "white",
    fontSize: 16
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderRadius: 8
  },
  label: {
    fontSize: 20
  }
});

interface ButtonProps {
  color: string;
  backgroundColor: string;
  label: string;
  onPress: Function;
}

interface CoinProps {
  handleNextSlides: Function
  handlePrevSlides: Function
  domain: [number, number]
  currentSlice: number;
}

const Button = ({ color, backgroundColor, label, onPress}: ButtonProps) => {

return (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.button, { backgroundColor }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  </TouchableOpacity>

);}

export default ({handleNextSlides, handlePrevSlides, domain, currentSlice}: CoinProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.tabs}>
          <View style={styles.tabActive}>
            <Text style={styles.tabLabelActive}>Current Period</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.noOrders}>{`You are at slice ${currentSlice}`} </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <View style={styles.values}>
          <Text style={styles.value}>{`Lowest: ${domain[0]}`}</Text>
          <Text style={styles.value}>{`Highest: ${domain[1]}`}</Text>
        </View>
        <Button 
          label="Prev" 
          backgroundColor="#4AFA9A" 
          color="#222324"
          onPress={handlePrevSlides} 
        />
        <Button 
          label="Next" 
          backgroundColor="#E33F64" 
          color="white" 
          onPress={handleNextSlides}
        />
      </View>
    </SafeAreaView>
  );
};
