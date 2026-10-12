export const PASSWORD = 'secret_sauce';

export const validUser = { username: 'standard_user', password: PASSWORD };

export const invalidLogins = [
  {
    name: 'password salah',
    username: 'standard_user',
    password: 'wrong_password',
    error: 'Epic sadface: Username and password do not match any user in this service',
  },
  {
    name: 'username kosong',
    username: '',
    password: PASSWORD,
    error: 'Epic sadface: Username is required',
  },
  {
    name: 'password kosong',
    username: 'standard_user',
    password: '',
    error: 'Epic sadface: Password is required',
  },
  {
    name: 'locked_out_user',
    username: 'locked_out_user',
    password: PASSWORD,
    error: 'Epic sadface: Sorry, this user has been locked out.',
  },
];
