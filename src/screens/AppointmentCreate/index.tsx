import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { Background } from '../../components/Background';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import { ModalView } from '../../components/ModalView';
import { GuildProps } from '../../components/Guild';
import { Guilds } from '../Guilds';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');

  const [openGuildsModal, setOpenGuildsModal] = useState(false);

  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const navigation = useNavigation();

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const noNullFields =
      !!category &&
      !!guild &&
      !!day &&
      !!month &&
      !!hour &&
      !!minute &&
      !!description;

    if (noNullFields) {
      setDisabled(false);
    } else setDisabled(true);
  }, [category, guild, day, month, hour, minute, description]);

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  async function handleSave() {
    if (disabled) {
      Alert.alert('Por favor, preencha todos os campos');
      return;
    }

    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );
    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar partida" />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setDay}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    keyboardType={
                      Platform.OS === 'ios' ? 'number-pad' : 'numeric'
                    }
                  />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMonth}
                    returnKeyType="next"
                    keyboardType={
                      Platform.OS === 'ios' ? 'number-pad' : 'numeric'
                    }
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setHour}
                    returnKeyType="next"
                    keyboardType={
                      Platform.OS === 'ios' ? 'number-pad' : 'numeric'
                    }
                  />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput
                    maxLength={2}
                    onChangeText={setMinute}
                    returnKeyType="next"
                    keyboardType={
                      Platform.OS === 'ios' ? 'number-pad' : 'numeric'
                    }
                  />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>

              <Text style={styles.charactersLimit}>Max 100 caracteres</Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              returnKeyType="send"
              onChangeText={setDescription}
            />
            <View style={styles.footer}>
              <Button
                title="Agendar"
                onPress={handleSave}
                isDisabled={disabled}
              />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView
        visible={openGuildsModal}
        closeModal={handleCloseGuilds}
        onRequestClose={handleCloseGuilds}
      >
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
