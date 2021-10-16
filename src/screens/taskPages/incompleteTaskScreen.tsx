import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import {Colors, GlobalStyles} from '../../constants';
import {appStackParams} from '../../navigation/navigationParams';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import IncompleteTaskCard from '../../components/incompleteTaskCard';
import CustomText from '../../components/CustomText';

interface Props {
  navigation: NativeStackNavigationProp<appStackParams, 'IncompleteTasks'>;
}

const renderItem = (itemData: any) => {
  return <IncompleteTaskCard itemData={itemData} />;
};
const itemSeperatorComponent = () => {
  return <View style={styles.line} />;
};
const IncompleteTasks = ({navigation}: Props) => {
  const {collectorsTask, todaysDate, collectorsData} = useSelector(
    (state: RootState) => state.taskState,
  );
  const incompleteTasks = collectorsTask.filter(
    (item: any) => item.taskStatus === false,
  );

  //   console.log(collectorsData);
  //   console.log(incompleteTaskRecord);
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader
        labelName="Incomplete Tasks"
        leftIcon="arrow-back"
        leftIconPress={() => navigation.pop()}
      />
      {incompleteTasks.length === 0 ? (
        <CustomText label="All Tasks have been completed" />
      ) : (
        <FlatList
          keyExtractor={(_, idx) => idx.toString()}
          data={incompleteTasks}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeperatorComponent}
        />
      )}
    </SafeAreaView>
  );
};

export default IncompleteTasks;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: Colors.borderColor,
  },
});
