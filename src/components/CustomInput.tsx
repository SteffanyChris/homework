import React from 'react';
import {KeyboardTypeOptions, StyleSheet} from 'react-native';
import {Input} from '@rneui/themed';

interface CustomInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  errorMessage?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  errorMessage,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  return (
    <Input
      inputContainerStyle={[
        styles.inputContainer,
        label === 'Port' && {width: 70},
      ]}
      rightIconContainerStyle={styles.rightIconStyles}
      inputStyle={styles.input}
      label={`${label}:`}
      placeholder={placeholder}
      labelStyle={styles.inlineLabel}
      value={value}
      onChangeText={onChangeText}
      errorStyle={{color: 'red'}}
      errorMessage={errorMessage}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 15,
    borderBottomWidth: 1,
    borderWidth: 1,
    marginStart: 98,
    height: 24,
  },
  rightIconStyles: {
    marginStart: 8,
    marginEnd: 16,
  },
  input: {
    fontSize: 16,
    letterSpacing: 2,
    borderBottomWidth: 0,
    borderRadius: 15,
    color: 'rgba(0,0,0, .5)',
    paddingHorizontal: 8,
  },
  inlineLabel: {
    position: 'absolute',
    right: 256,
    top: 4,
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    flex: 1,
  },
});
