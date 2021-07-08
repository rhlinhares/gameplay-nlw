import React, { useCallback, useState } from 'react';

import { TextInput, TextInputProps } from 'react-native';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

export function SmallInput({ ...rest }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <TextInput
      style={[
        styles.container,
        isFocused && { borderColor: theme.colors.heading },
      ]}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      keyboardType="numeric"
      {...rest}
    />
  );
}
