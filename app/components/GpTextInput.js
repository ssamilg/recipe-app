import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import PropTypes from 'prop-types';

// Login ve Register ekrani için kullanacagimiz componenti tasarladik 
const GpTextInput = props => {
  const {
    style,
    inputStyle,
    required,
    error,
    errorMessage,
    value,
    ...inputProps
  } = props;
  const [isBlurred, setBlurred] = useState(false);
  const isHelperTextVisible = useMemo(() => {
    if (!isBlurred) {
      return false;
    } else if (required && !value) {
      return true;
    } else if (errorMessage) {
      return true;
    } else {
      return false;
    }
  }, [errorMessage, isBlurred, required, value]);

  return (
    // Componentin tasarimini yaptik 
    <View style={style}>
      <TextInput
        style={inputStyle}
        {...inputProps}
        value={value}
        error={(required && !value && isBlurred) || error}
        onBlur={() => setBlurred(true)}
      />

      {isHelperTextVisible && (
        <HelperText type="error" visible>
          {errorMessage ? errorMessage : 'This field is required'}
        </HelperText>
      )}
    </View>
  );
};

// Componentin alacagi proplari tanimladik 
GpTextInput.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.object,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  value: PropTypes.string.isRequired,
};

GpTextInput.defaultProps = {
  required: false,
};

// Componenti export ettik 
export default GpTextInput;
