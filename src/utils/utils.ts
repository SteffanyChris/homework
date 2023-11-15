import {KeyboardTypeOptions} from 'react-native';

interface FieldConfigI {
  label: string;
  placeholder: string;
  key: string;
  secureTextEntry: boolean;
  keyboardType?: KeyboardTypeOptions;
}
interface FieldsConfI {
  [key: string]: FieldConfigI[];
}
const fieldsConfig: FieldsConfI = {
  Advanced: [
    {
      label: 'User Name',
      placeholder: 'name@example.com',
      key: 'username',
      secureTextEntry: false,
      keyboardType: 'email-address',
    },
    {
      label: 'Password',
      placeholder: 'Required',
      key: 'password',
      secureTextEntry: true,
      keyboardType: 'default',
    },
    {
      label: 'Server Address',
      placeholder: 'example.com',
      key: 'serverAddress',
      secureTextEntry: false,
      keyboardType: 'url',
    },
    {
      label: 'Server Path',
      placeholder: '/calendars/user',
      key: 'serverPath',
      secureTextEntry: false,
      keyboardType: 'default',
    },
    {
      label: 'Port',
      placeholder: '',
      key: 'port',
      secureTextEntry: false,
      keyboardType: 'numeric',
    },
  ],
  Manual: [
    {
      label: 'User Name',
      placeholder: 'name@example.com',
      key: 'username',
      secureTextEntry: false,
      keyboardType: 'email-address',
    },
    {
      label: 'Password',
      placeholder: 'Required',
      key: 'password',
      secureTextEntry: true,
      keyboardType: 'default',
    },
    {
      label: 'Server Address',
      placeholder: 'example.com',
      key: 'serverAddress',
      secureTextEntry: false,
      keyboardType: 'url',
    },
  ],
};

export const validationRules = {
  username: (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format.',
  password: (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value,
    )
      ? ''
      : 'Pass not strong enough',
  serverAddress: (value: string) =>
    /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)(\.[A-Za-z]{2,6})+$/.test(value)
      ? ''
      : 'Invalid server address.',
  serverPath: (value: string) =>
    /^[a-zA-Z0-9-/]+$/.test(value) ? '' : 'Invalid server path.',
  port: (value: string) =>
    /^\d+$/.test(value) && parseInt(value, 10) <= 65535
      ? ''
      : 'Invalid port number.',
};

export default fieldsConfig;
