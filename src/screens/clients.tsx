import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import CustomText from '../components/CustomText';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {appStackParams} from '../navigation/navigationParams';

import {
  Colors,
  FontFamily,
  FontSizes,
  GlobalStyles,
  Spacing,
} from '../constants';
import SearchBar from '../components/Searchbar';
import MyClientsCard from '../components/MyClientsCard';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
interface Props {
  navigation: NativeStackNavigationProp<appStackParams, 'Clients'>;
}

const dummyClient = [...Array(10).keys()];

const renderItem = (itemData: any) => {
  return <MyClientsCard itemData={itemData} />;
};
const itemSeperatorComponent = () => {
  return <View style={styles.line} />;
};

const Clients = ({navigation}: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>('');
  const handleSearch = () => {
    console.log('search works');
  };
  const customersData = useSelector(
    (state: RootState) => state.taskState.collectorsData,
  );
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader
        labelName="My Clients"
        leftIcon="arrow-back"
        leftIconPress={() => navigation.pop()}
      />
      {customersData.length === 0 ? (
        <View style={GlobalStyles.paddingSpacing}>
          <CustomText label="Sorry. No data avaialble currently" />
        </View>
      ) : (
        <FlatList
          keyExtractor={(_, idx) => idx.toString()}
          data={customersData}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeperatorComponent}
        />
      )}
      <View style={GlobalStyles.marginH}>{/* <MyClientsCard /> */}</View>
    </SafeAreaView>
  );
};

export default Clients;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  line: {
    height: 1,
    backgroundColor: Colors.borderColor,
  },
});

{
  /* <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          onSubmitEditing={handleSearch}
        /> */
}
