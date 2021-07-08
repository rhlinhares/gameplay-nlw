import React, { useCallback, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

export function TextArea({ ...rest }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <TextInput
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      style={[
        styles.container,
        isFocused && { borderColor: theme.colors.heading },
      ]}
      {...rest}
    />
  );
}
