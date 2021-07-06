import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import React, { useState, useCallback } from 'react'
import { FlatList, View } from 'react-native'
import { Appointment, AppointmentProps } from '../../components/Appointment'
import { Background } from '../../components/Background'
import { ButtonAdd } from "../../components/ButtonAdd"
import { CategorySelect } from '../../components/CategorySelect'
import { ListDivider } from '../../components/ListDivider'
import { ListHeader } from '../../components/ListHeader'
import { Profile } from '../../components/Profile'
import { COLLECTION_APPOINTMENTS } from '../../configs/database'
import { styles } from './styles'
import { Load } from '../../components/Loading'

export function Home() {
  const [category, setCategory] = useState('false')
  const navigation = useNavigation()
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])
  const [loading, setLoading] = useState(true)

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId)
  }

  function handleAppointmentDetails(selectedGuild: AppointmentProps) {
    navigation.navigate('AppointmentDetails', { selectedGuild })
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const storedAppointments: AppointmentProps[] = storage ? JSON.parse(storage) : []
    setAppointments(
      category
        ? storedAppointments.filter(item => item.category === category)
        : storedAppointments
    )
    setLoading(false)
  }

  useFocusEffect(useCallback(() => {
    loadAppointments()
  }, [category]))

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      {
        loading
          ? <Load />
          :
          <>
            <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`} />
            <FlatList
              data={appointments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Appointment data={item} onPress={() => handleAppointmentDetails(item)} />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 69 }}
            />
          </>
      }
    </Background>
  )
} 5