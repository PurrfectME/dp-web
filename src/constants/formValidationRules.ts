import { SpecialSymbols } from './specialSymbols';

export const PasswordRules = [
  {
    pattern: /.*\d.*/,
    message: 'Password must contain at least one digit'
  },
  {
    pattern: /.*[a-z].*/,
    message: 'Password must contain at least one lowercase character'
  },
  {
    pattern: /.*[A-Z].*/,
    message: 'Password must contain at least one uppercase character'
  },
  {
    pattern: /^(?=.{8,}$)/,
    message: 'Minimal password length is 8 characters'
  },
  {
    validator: (_: any, value: string) => {
      const includesAnySpecialSymbol = SpecialSymbols
        .map(symbol => value.includes(symbol))
        .some(v => v);

      return includesAnySpecialSymbol
        ? Promise.resolve()
        : Promise.reject();
    },
    message: 'Password must contain one of the following symbols: !"#$%&\'()*+,,-./:;<=>?@[\\]^_`{|}'
  }
];

export const PasswordConfirmationRules = (passwordFieldName: string = 'password') => [
  ({ getFieldValue }: any) => ({
    validator(_: any, value: string) {
      if (!value || getFieldValue(passwordFieldName) === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The two passwords that you entered do not match!'));
    },
  }),
];

export const Required = (message: string = 'This field should be populated!') => [
  { required: true, message },
];