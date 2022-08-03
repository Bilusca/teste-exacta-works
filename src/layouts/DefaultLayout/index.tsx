import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'
import { Subheader } from '@/components/Subheader'
import { LayoutContainer } from './styles'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <Subheader />
      <Outlet />
    </LayoutContainer>
  )
}
