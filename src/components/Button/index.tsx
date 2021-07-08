import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
  isDisabled?: boolean;
};

export function Button({ isDisabled = false, title, ...rest }: Props) {
  return (
    <RectButton
      style={[
        styles.container,
        isDisabled && { backgroundColor: theme.colors.highlight },
      ]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
