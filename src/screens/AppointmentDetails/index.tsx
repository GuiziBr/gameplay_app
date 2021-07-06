import { Fontisto } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { FlatList, ImageBackground, Text, View, Alert, Share, Platform } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import BannerImg from '../../assets/banner.png'
import { AppointmentProps } from '../../components/Appointment'
import { Background } from '../../components/Background'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Header } from '../../components/Header'
import { ListDivider } from '../../components/ListDivider'
import { ListHeader } from '../../components/ListHeader'
import { Member, MemberProps } from '../../components/Member'
import { theme } from '../../global/styles/theme'
import { api } from '../../services/api'
import { styles } from './styles'
import { Load } from '../../components/Loading'
import * as Linking from 'expo-linking'

type Params = {
  selectedGuild: AppointmentProps
}

type GuildWidget = {
  id: string
  name: string
  instant_invite: string
  members: MemberProps[]
  presence_count: number
}

export function AppointmentDetails() {
  const route = useRoute()
  const [loading, setLoading] = useState(true)
  const { selectedGuild } = route.params as Params
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${selectedGuild.guild.id}/widget.json`)
      setWidget(response.data)
    } catch {
      Alert.alert('Verifique as configurações do servidor')
    } finally {
      setLoading(false)
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${selectedGuild.guild.name}`
      : widget.instant_invite
    Share.share({ message, url: widget.instant_invite })
  }

  useEffect(() => {
    fetchGuildWidget()
  }, [])

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite)
  }

  return (
    <Background>
      <Header title='Detalhes'
        action={
          selectedGuild.guild.owner &&
          <BorderlessButton onPress={handleShareInvitation}>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }
      />
      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{selectedGuild.guild.name}</Text>
          <Text style={styles.subtitle}>{selectedGuild.description}</Text>
        </View>
      </ImageBackground>
      {
        loading
          ? <Load />
          :
          <>
            <ListHeader title="Jogadores" subtitle={`Total ${widget.members ? widget.members.length : 0}`} />
            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
          </>
      }
      {
        selectedGuild.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon onPress={handleOpenGuild} title="Entrar na partida" />
        </View>
      }
    </Background>
  )
}