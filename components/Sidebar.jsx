import styled from 'styled-components'
import { Avatar, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

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
      <Search>
        <SearchOutlinedIcon />
      </Search>
    </Container>
  )
}

export default Sidebar

const Container = styled.div``

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    opacity: 0.8;
  }
`

const IconsContainer = styled.div``

const Search = styled.div``