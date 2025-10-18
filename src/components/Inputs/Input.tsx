import { Text, TextInput, View } from 'react-native';
import { FC, useRef } from 'react';
import * as S from './Input.style';
import { blackColor, errorColor, transparentBlack20Color } from 'constants/colors';
import { InputProps } from 'typescript/interfaces';
import WarningFill from 'assets/images/icons/warning-fill.svg'

const Input: FC<InputProps> = ({
  errorText,
  onChange,
  onBlur,
  onPressFocus,
  containerStyle,
  inputStyle,
  containerInnerStyle,
  labelStyle,
  isError = false,
  placeholder,
  placeholderTextColor = transparentBlack20Color,
  value,
  label,
  keyboardType = 'default',
  secureTextEntry = false,
  InputIcon,
  required,
  disabled,
  editable = true,
  testID,
}) => {
  const inputRef = useRef<TextInput>(null);

  const handleOnChange = (text: string): void => {
    onChange(text);
  };

  const onPress = (): void => {
    onPressFocus && onPressFocus();
    inputRef.current?.focus();
  };

  return (
    <View style={containerStyle}>
      {label && (
        <S.TitleText style={labelStyle}>
          {label} {required && <Text style={{color: errorColor}}>*</Text>}
        </S.TitleText>
      )}
      <S.InputTouchableWrappper activeOpacity={1} onPress={onPress} style={containerInnerStyle}>
        <S.InputField
          testID={testID}
          ref={inputRef}
          onFocus={onPress}
          keyboardType={keyboardType}
          onBlur={onBlur}
          placeholder={placeholder}
          style={[inputStyle, {width: InputIcon ? '90%' : '100%', color: isError ? errorColor : blackColor}]}
          placeholderTextColor={placeholderTextColor}
          keyboardAppearance="dark"
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={handleOnChange}
          onSubmitEditing={() => console.warn('Not implemented??')}
          blurOnSubmit={false}
          editable={editable}
          autoComplete={'off'}
          autoCorrect={false}
          autoCapitalize={'none'}
          textAlignVertical={'center'}
        />
        {InputIcon && <S.WrapperInputIcon>{InputIcon}</S.WrapperInputIcon>}
      </S.InputTouchableWrappper>
      <S.WrapperErrorText>
        <WarningFill width={16} height={16} color={isError ? errorColor : 'transparent'} />
        <S.ErrorText>{isError ? errorText : ' '}</S.ErrorText>
      </S.WrapperErrorText>
    </View>
  );
};

export default Input;
