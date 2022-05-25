import Image from 'next/image'

const Loading = () => {
  return (
    <center>
      <div>
        <Image
          src="/1.png"
          height={200}
          width={200}
          style={{ marginBottom: 10 }}
        />
      </div>
    </center>
  )
}

export default Loading
