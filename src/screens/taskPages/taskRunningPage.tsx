import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors, GlobalStyles} from '../../constants';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';
import CustomLabel from '../../components/CustomLabel';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {appStackParams} from '../../navigation/navigationParams';
interface Props {}
const TaskRunningPage = (props: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<appStackParams, 'TodaysTask'>>();
  const {collectorsTask, todaysDate} = useSelector(
    (state: RootState) => state.taskState,
  );
  const incompleteTasks = collectorsTask.filter(
    (item: any) => item.taskStatus === false,
  ).length;
  const completeTasks = collectorsTask.filter(
    (item: any) => item.taskStatus === true,
  ).length;
  return (
    <View style={[GlobalStyles.screen]}>
      <View style={GlobalStyles.paddingSpacing}>
        <CustomLabel title="Task Date" value={todaysDate} />
        <CustomText label="Tasks:" />
      </View>
      <View style={styles.line} />
      <Pressable
        android_ripple={{
          color: Colors.grey,
        }}
        onPress={() => navigation.navigate('IncompleteTasks')}>
        <View style={styles.itemView}>
          <CustomText label="Incomplete Tasks" />
          <CustomText label={incompleteTasks} color={Colors.dangerRed} />
        </View>
      </Pressable>
      <View style={styles.line} />
      <Pressable
        android_ripple={{
          color: Colors.grey,
        }}
        onPress={() => navigation.navigate('CompleteTasks')}>
        <View style={styles.itemView}>
          <CustomText label="Completed Tasks" />
          <CustomText label={completeTasks} color={Colors.dangerRed} />
        </View>
      </Pressable>
      <View style={styles.line} />
    </View>
  );
};

export default TaskRunningPage;

const styles = StyleSheet.create({
  itemView: {
    ...GlobalStyles.row,
    ...GlobalStyles.paddingSpacing,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: Colors.borderColor,
  },
});
