import styled from 'styled-components'
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const Sidebar = () => {
  return (
    <Container>
      <Header>
        <UserAvatar />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
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

const IconsContainer = styled.div``
