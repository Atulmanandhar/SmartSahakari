import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import {Colors, GlobalStyles} from '../../constants';
import {appStackParams} from '../../navigation/navigationParams';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import CompleteTaskCard from '../../components/completeTaskCard';
import CustomText from '../../components/CustomText';

interface Props {
  navigation: NativeStackNavigationProp<appStackParams, 'CompleteTasks'>;
}

const renderItem = (itemData: any) => {
  return <CompleteTaskCard itemData={itemData} />;
};
const itemSeperatorComponent = () => {
  return <View style={styles.line} />;
};
const CompleteTasks = ({navigation}: Props) => {
  const {collectorsTask, todaysDate, collectorsData} = useSelector(
    (state: RootState) => state.taskState,
  );
  const completeTasks = collectorsTask.filter(
    (item: any) => item.taskStatus === true,
  );

  //   console.log(collectorsData);
  //   console.log(incompleteTaskRecord);
  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <CustomHeader
        labelName="Completed Tasks"
        leftIcon="arrow-back"
        leftIconPress={() => navigation.pop()}
      />
      {completeTasks.length === 0 ? (
        <View style={GlobalStyles.paddingSpacing}>
          <CustomText label="No tasks have been completed yet." />
        </View>
      ) : (
        <FlatList
          keyExtractor={(_, idx) => idx.toString()}
          data={completeTasks}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeperatorComponent}
        />
      )}
    </SafeAreaView>
  );
};

export default CompleteTasks;

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: Colors.borderColor,
  },
});
