import styled from 'styled-components'
import Head from 'next/head'

const Login = () => {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="./1.png" />
      </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div``
const LoginContainer = styled.div``
const Logo = styled.img``
