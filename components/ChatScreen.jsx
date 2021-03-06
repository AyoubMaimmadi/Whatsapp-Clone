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
import { useRef, useState } from 'react'
import firebase from 'firebase'
import getRecipientEmail from '../utils/getRecipientEmail'
import TimeAgo from 'timeago-react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth)
  const [input, setInput] = useState('')
  const endOfMessageRef = useRef(null)
  const router = useRouter()

  const [messagesSnapShot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  const [recipientSnapshot] = useCollection(
    db
      .collection('users')
      .where('email', '==', getRecipientEmail(chat.users, user))
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
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  const scrollToBottom = () => {
    endOfMessageRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const sendMessage = (e) => {
    e.preventDefault()

    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    })

    setInput('')
    scrollToBottom()
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data()

  const recipientEmail = getRecipientEmail(chat.users, user)

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar style={{ marginLeft: '20px' }} src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot ? (
            <p>
              Last Active:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Unavailable'
              )}
            </p>
          ) : (
            <p>Loading last active ...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton style={{ color: 'white' }}>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton style={{ color: 'white' }}>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessage ref={endOfMessageRef} />
      </MessageContainer>
      <InputContainer>
        <IconButton style={{ color: 'white' }}>
          <InsertEmoticonIcon />
        </IconButton>
        <IconButton style={{ color: 'white' }}>
          <AttachFileIcon />
        </IconButton>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <IconButton style={{ color: 'white' }}>
          <MicIcon />
        </IconButton>
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
  background-color: #aaaaaa;
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
  background-color: #5d5d5d;
  z-index: 100;
`

const Header = styled.div`
  position: sticky;
  background-color: #aaaaaa;
  z-index: 100;
  top: 0;
  display: flex;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  color: black;
`

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    margin-top: 3px;
    font-size: 14px;
    color: #363537;
  }
`

const HeaderIcons = styled.div`
  color: white;
`

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #2c302e;
  min-height: 90vh;
`

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`
