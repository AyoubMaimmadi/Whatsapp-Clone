import styled from 'styled-components'
import { Avatar } from '@mui/material'

const Sidebar = () => {
  return (
    <Container>
      <Header>
        <UserAvatar />
      </Header>
    </Container>
  )
}

export default Sidebar

const Container = styled.div``

const Header = styled.div``

const UserAvatar = styled(Avatar)`
  margin: 10px;
`
