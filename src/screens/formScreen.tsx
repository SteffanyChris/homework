import React, {useEffect, useState} from 'react';
import {CustomInput} from '../components/CustomInput';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectAccountType,
  setFieldValue,
  selectFormFields,
  AccountType,
  setAccountType,
} from '../store/formSlice';
import fieldsConfig, {validationRules} from '../utils/utils';
import RNPickerSelect from 'react-native-picker-select';
import {Button, CheckBox} from '@rneui/base';

const FormScreen = () => {
  const dispatch = useDispatch();
  const accountType = useSelector(selectAccountType); // Retrieve accountType from Redux store
  const formFieldsConfig = fieldsConfig[accountType] || []; // Retrieve form fields based on accountType
  const formFields = useSelector(selectFormFields); // Retrieve form fields from Redux store
  const [account, setAccount] = useState<AccountType>('Advanced');
  const [checked, setChecked] = useState<boolean>(true);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Update the form fields in Redux store when the account type changes
  useEffect(() => {
    formFieldsConfig.forEach(field => {
      dispatch(setFieldValue({key: field.key, value: ''}));
    });
  }, [accountType, dispatch, formFieldsConfig]);

  const handleInputChange = (key: string, value: string) => {
    dispatch(setFieldValue({key, value}));
    const errorMessage = validationRules[key]
      ? validationRules[key](value)
      : '';
    setErrors({...errors, [key]: errorMessage});
  };
  const handleAccountTypeChange = () => {
    dispatch(setAccountType(account));
  };

  const handleSubmitPress = () => {
    const jsonData = JSON.stringify(formFields);
    console.log(jsonData);
  };

  const handleSSLPress = () => [setChecked(!checked)];

  return (
    <View style={styles.container}>
      <View style={styles.accountCont}>
        <Text style={styles.text}>Account Type:</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onDonePress={handleAccountTypeChange}
            onValueChange={value => setAccount(value)}
            items={[
              {label: 'Advanced', value: 'Advanced'},
              {label: 'Manual', value: 'Manual'},
            ]}
          />
        </View>
      </View>
      {formFieldsConfig.map(field => (
        <View style={styles.row}>
          <CustomInput
            key={field.key}
            label={field.label}
            placeholder={field.placeholder}
            value={formFields[field.key] || ''}
            onChangeText={text => handleInputChange(field.key, text)}
            secureTextEntry={field.secureTextEntry}
            keyboardType={field.keyboardType}
            errorMessage={errors[field.key]}
          />
          {field.key === 'port' && (
            <View
              style={[styles.row, {position: 'absolute', right: 40, top: -16}]}>
              <CheckBox checked={checked} onPress={handleSSLPress} />
              <Text> Use SSL</Text>
            </View>
          )}
        </View>
      ))}
      <Button onPress={handleSubmitPress}>Submit</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  accountCont: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    borderBottomWidth: 1,
    borderWidth: 1,
    height: 24,
    borderColor: 'gray',
    flex: 1,
    marginStart: 8,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 12,
    color: 'black',
    marginStart: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FormScreen;
