import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

import * as yup from 'yup';
import {Formik} from 'formik';

let passwordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .required('password length should be required')
    .min(4, 'length should be greater than 4')
    .max(30, 'length should be smaller than 30'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [specialCharacter, setspecialCharacter] = useState(false);

  let generatePasswordString = (passwordLength: number) => {
    let str = '';
    if (lowerCase) {
      str += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (upperCase) {
      str += 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    }
    if (numbers) {
      str += '0123456789';
    }
    if (specialCharacter) {
      str += '~!@#$%^&*()_+';
    }

    let resultantPassword = generatePassword(passwordLength, str);
    setPassword(resultantPassword);
    setIsPasswordGenerated(true);
    
    return str;
  };

  let generatePassword = (passwordLength: number, passwordString: string) => {
    let pass = '';

    for (let i = 0; i < passwordLength; i++) {
      let indexOfString = Math.round(Math.random() * passwordString.length);
      pass += passwordString.charAt(indexOfString);
    }
    return pass;
  };

  let resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setspecialCharacter(false);
  };

  return (
    <>
      <Formik
        initialValues={{passwordLength: ''}}
        validationSchema={passwordSchema}
        onSubmit={values => {
          console.log(values);
          generatePasswordString(+values.passwordLength);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleReset,
          handleSubmit,
          isValid,
          /* and other goodies */
        }) => (
          <>
            <View style={styles.container}>
              <View style={styles.passwordGeneratorHeadingBox}>
                <Text style={styles.passwordGeneratorHeadingText}>
                  Password Generator
                </Text>
              </View>
              <View style={styles.passwordTextWrapperBox}>
                <View>
                  <Text style={styles.passwordTextWrapperHeading}>
                    Password Text
                  </Text>
                </View>
                <View style={styles.passwordTextBox}>
                  {isPasswordGenerated ? (
                    <Text
                      style={{color: 'white', fontSize: 20, fontWeight: '500'}}>
                      {password}
                    </Text>
                  ) : (
                    <Text></Text>
                  )}
                </View>
              </View>
              <View style={styles.passwordInputBox}>
                <View>
                  <Text style={styles.customizePasswordHeading}>
                    Custom Password
                  </Text>
                </View>
                <View style={styles.lengthBox}>
                  <View>
                    <Text style={styles.lengthHeading}>password Length :</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={{color: 'red', fontSize: 14, marginTop: 2}}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <View>
                    <TextInput
                      style={styles.inputboxparameter}
                      placeholder="e.x.. 8"
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View style={styles.checkboxContainer}>
                  <View>
                    <Text style={styles.customizeHeading}>
                      Customize Buttons
                    </Text>
                  </View>
                  <View>
                    <View style={styles.checkboxWrapper}>
                      <Text style={styles.labelText}>Lower Case</Text>
                      <BouncyCheckbox
                        disableText
                        fillColor="#a63c06"
                        size={40}
                        useBuiltInState={false}
                        isChecked={lowerCase}
                        onPress={() => {
                          setLowerCase(!lowerCase);
                        }}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.checkboxWrapper}>
                      <Text style={styles.labelText}>Upper Case</Text>
                      <BouncyCheckbox
                        disableText
                        fillColor="#02c39a"
                        size={40}
                        useBuiltInState={false}
                        iconStyle={{borderColor: '#f00000'}}
                        isChecked={upperCase}
                        onPress={() => {
                          setUpperCase(!upperCase);
                        }}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.checkboxWrapper}>
                      <Text style={styles.labelText}>Numbers</Text>
                      <BouncyCheckbox
                        disableText
                        fillColor="#f6ad05"
                        size={40}
                        useBuiltInState={false}
                        iconStyle={{borderColor: '#ff0073'}}
                        isChecked={numbers}
                        onPress={() => {
                          setNumbers(!numbers);
                        }}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={styles.checkboxWrapper}>
                      <Text style={styles.labelText}>Special Character</Text>
                      <BouncyCheckbox
                        disableText
                        fillColor="#035e7b"
                        size={40}
                        useBuiltInState={false}
                        iconStyle={{borderColor: '#11296b'}}
                        isChecked={specialCharacter}
                        onPress={() => {
                          setspecialCharacter(!specialCharacter);
                        }}
                      />
                    </View>
                    {!lowerCase &&
                    !upperCase &&
                    !numbers &&
                    !specialCharacter ? (
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 16,
                          paddingHorizontal: 18,
                        }}>
                        atleat one Customize button should be checked
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                      disabled={!isValid}
                      style={styles.generateButton}
                      onPress={() => {
                        handleSubmit();
                      }}>
                      <Text style={styles.buttonText}>Generate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.resetButton}
                      onPress={() => {
                        handleReset();
                        resetPassword();
                      }}>
                      <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a98467',
  },
  passwordGeneratorHeadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordGeneratorHeadingText: {
    fontSize: 28,
    fontWeight: '700',
  },

  passwordTextWrapperBox: {
    flex: 3,
    backgroundColor: '#a98467',
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordTextWrapperHeading: {
    fontSize: 22,
    fontWeight: '500',
    paddingBottom: 7,
  },
  passwordTextBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 360,
    backgroundColor: '#a9927d',
    paddingHorizontal: 1,
    marginTop: 18,
  },
  passwordInputBox: {
    flex: 9,
  },
  customizePasswordHeading: {
    fontSize: 22,
    padding: 14,
    fontWeight: '500',
  },
  lengthBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 12,
    paddingHorizontal: 12,
  },
  lengthHeading: {
    fontSize: 20,
    fontWeight: '400',
  },
  inputboxparameter: {
    borderWidth: 1,
    borderColor: 'white',
    width: 115,
    height: 38,
  },
  checkboxContainer: {
    flex: 11,
  },
  customizeHeading: {
    fontSize: 22,
    fontWeight: '500',
    padding: 14,
  },
  checkboxWrapper: {
    flex: 0,
    margin: 6,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 22,
    fontWeight: '400',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 32,
  },
  generateButton: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 44,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: '#73ba9b',
  },
  resetButton: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 16,
    paddingHorizontal: 58,
    borderRadius: 8,
    backgroundColor: '#ee6055',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
