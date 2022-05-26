import Image from 'next/image'
import { Circle } from 'better-react-spinkit'

const Loading = () => {
  return (
    <center style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <div>
        <Image
          src="/logo.png"
          height={200}
          width={200}
          style={{ marginBottom: 10 }}
        />
      </div>
      <Circle color="#3CBC2B" size={60} />
    </center>
  )
}

export default Loading
