import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth } from '../firebase'
import { useRouter } from 'next/router'
import { Avatar, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import MicIcon from '@mui/icons-material/Mic'

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [messagesSnapShot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  const showMessages = () => {
    if (messagesSnapShot) {
      return messagesSnapShot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))
    }
  }

  return (
    <Container>
      <Header>
        <Avatar />
        <HeaderInformation>
          <h3>Recipient Email</h3>
          <p>Last seen ...</p>
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input />
      </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Input = styled.input`
  flex: 1;
  border: none;
  outline: 0;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`

const Container = styled.div``

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`

const HeaderIcons = styled.div``

const MessageContainer = styled.div``

const EndOfMessage = styled.div``
