import React from 'react';
import { View, FlatList, Text } from 'react-native';

import { Guild, GuildProps } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { styles } from './styles';

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: Props) {
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: null,
      owner: true,
    },
    {
      id: '2',
      name: 'Únicos',
      icon: null,
      owner: false,
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.guilds}
        data={guilds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
