

/**
 * * Valid Errors
 */

export const errorUserPhoneInvalid = 'Phone number must be 10 or more digits long and contain only digits';
export const errorUserPasswordInvalid =
  'Invalid password must be at least 8 character long and should contain at least one Number, One Uppercase & One Special Character';
  export const errorUserNameInvalid =
  'Name must be at least 5 characters long and not contain any special characters or numbers.';
export const errorUserPasswordWrong = 'Incorrect password';

/**
 *
 * * Exist Errors
 */
export const errorEmailExist = 'Email already in use';
export const errorPhoneExist = 'Phone already in use';
export const errorMessageInvalidEmail = {
  message: 'Please enter valid email address.',
};
export const emailInUseError = {
  message: 'Email is already in use, please try another email.',
};