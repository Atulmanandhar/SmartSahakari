import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Applogo from '../assets/images/logo.png';
import Applogo2 from '../assets/images/mainlogo.png';
import NepaliLogo from '../assets/images/nepalilogo.png';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import {Colors, EMAIL_REGEX, GlobalStyles} from '../constants';
import {appStackNavProps, appStackParams} from '../navigation/navigationParams';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {signin} from '../redux/actions/authAction';

const Login = ({navigation}: appStackNavProps<'Login'>) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const usernameRef = React.createRef<TextInput>();
  const passwordRef = React.createRef<TextInput>();
  // const emailRef = useRef<React.MutableRefObject<undefined | null>>(null);
  // const passwordRef = useRef<React.MutableRefObject<undefined | null>>(null);

  const dispatch = useDispatch();

  const handleSuccess = () => {
    // setIsSubmitting(false);
    console.log('success');
  };
  const handleFailure = () => {
    setIsSubmitting(false);
    console.log('handleFailure');
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    setIsSubmitting(true);
    dispatch(signin(data, handleSuccess, handleFailure));

    // reset({email: '', password: ''});
    // navigation.navigate('Home');
  };

  return (
    <ScrollView
      style={[GlobalStyles.screen]}
      contentContainerStyle={[styles.screen, GlobalStyles.paddingSpacing]}
      keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
   
        <View style={styles.imageContainer}>
          <Image source={Applogo2} style={styles.image} />
        </View>
        <View style={styles.inputView}>
          <Controller
            control={control}
            name="username"
            defaultValue=""
            rules={{
              required: {
                value: true,
                message: 'Username is required',
              },
              // pattern: {
              //   value: EMAIL_REGEX,
              //   message: 'Please enter a valid email',
              // },
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {isTouched},
            }) => (
              <CustomTextInput
                ref={usernameRef}
                placeholder="Enter your username"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                error={errors.username}
                errorText={errors?.username?.message}
                isTouched={isTouched}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              minLength: {
                value: 6,
                message: 'Password should be a minimum of 6 characters',
              },
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
            render={({field: {onBlur, onChange, value}}) => (
              <CustomTextInput
                ref={passwordRef}
                placeholder="Enter your password"
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                error={errors.password}
                errorText={errors?.password?.message}
                onSubmitEditing={handleSubmit(onSubmit)}
                passwordType
              />
            )}
          />
        </View>
      </View>

      <View>
        <CustomButton
          label="Login"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        />
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  inputView: {
    width: '100%',
  },
  imageContainer: {
    height: hp('15'),
    width: wp(60),
    // backgroundColor: 'red',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    // tintColor: Colors.primaryDarkBlue,
  },
});
