import { Avatar } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

const Chat = ({ id, users }) => {
  const router = useRouter()
  const [user] = useAuthState(auth)

  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(users, user))
  )

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data()
  const RecipientEmail = getRecipientEmail(users, user)

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{RecipientEmail[0]}</UserAvatar>
      )}

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
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
  margin-left: 10px;
`
