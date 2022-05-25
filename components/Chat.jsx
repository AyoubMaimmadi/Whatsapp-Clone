import { Avatar } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'
import { useCollection } from 'react-firebase-hooks/firestore'

const Chat = ({ id, users }) => {
  const [user] = useAuthState(auth)
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(users, user))
  )

  const RecipientEmail = getRecipientEmail(users, user)

  return (
    <Container>
      <UserAvatar />
      <p>{RecipientEmail}</p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`
