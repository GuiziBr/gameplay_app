import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Guild, GuildProps } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'
import { Load } from '../../components/Loading'
import { api } from '../../services/api'
import { styles } from './styles'

type Props = {
  handleGuildsSelect: (guild: GuildProps) => void
}

export function Guilds({ handleGuildsSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchGuilds() {
    const response = await api.get('/users/@me/guilds')
    setGuilds(response.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchGuilds()
  }, [])

  return (
    <View style={styles.container}>

      {
        loading
          ? <Load />
          :
          <FlatList
            data={guilds}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Guild data={item} onPress={() => handleGuildsSelect(item)} />
            )}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            showsVerticalScrollIndicator={false}
            style={styles.guilds}
            contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
            ListHeaderComponent={() => <ListDivider isCentered />}
          />
      }
    </View>
  )
}