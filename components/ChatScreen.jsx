import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth } from '../firebase'
import { useRouter } from 'next/router'
import { Avatar } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AttachFileIcon from '@mui/icons-material/AttachFile'

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Recipient Email</h3>
          <p>Last seen ...</p>
        </HeaderInformation>
      </Header>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div``

const Header = styled.div``

const HeaderInformation = styled.div``

const HeaderIcons = styled.div``
