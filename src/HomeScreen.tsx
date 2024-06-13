import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { Appbar, DataTable, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { selectors, actions } from "./store/inventory";
import { RootState } from "./store";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "./App";
import ProductItem from "./ProductItem";

export default (props: StackScreenProps<StackParamList, "Home">) => {
  const fetching = useSelector((state: RootState) => state.inventory.fetching);
  const inventory = useSelector(selectors.selectInventory);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(actions.fetchInventory());
    });
    return unsubscribe;
  }, [props.navigation]);

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.home}>
      <HeaderComponent />
      <SafeAreaView edges={['bottom', 'left', 'right']}>
        <FlatList
          style={styles.inventoryList}
          refreshControl={
            <RefreshControl
              refreshing={fetching}
              onRefresh={() => dispatch(actions.fetchInventory())}
            />
          }
          data={inventory}
          renderItem={({ item }) => <ProductItem key={item.id} inventory={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={renderSeparator}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.fab}>
        <FAB
          icon={() => (
            <MaterialCommunityIcons name="barcode" size={24} color="#0B5549" />
          )}
          label="Scan Product"
          onPress={() => props.navigation.navigate("Camera")}
        />
      </SafeAreaView>
    </View>
  );
};

const HeaderComponent = () => (
  <Appbar.Header style={styles.header}>
    <Appbar.Content title="Inventory" titleStyle={styles.title} />
  </Appbar.Header>
);

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  header: {
    backgroundColor: "#FDFBFC",
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    marginVertical: 6,
  },
  inventoryList: {
    paddingTop: 12
  },
  fab: {
    position: "absolute",
    bottom: 16,
    width: "100%",
    flex: 1,
    alignItems: "center"
  }
});
