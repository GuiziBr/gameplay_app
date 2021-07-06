import React from 'react'
import { View, Text } from 'react-native'
import { styles } from "./styles"
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { theme } from "../../global/styles/theme"

type Props = RectButtonProps

export function ButtonAdd({ ...rest }: RectButtonProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <MaterialCommunityIcons
        name="plus"
        color={theme.colors.heading}
        size={24}
      >

      </MaterialCommunityIcons>
    </RectButton>
  )
}