import React from 'react'
import dynamic from 'next/dynamic'
import Head from '../components/head'

const MyEditor = dynamic(
  import('../components/editor'),
  {
    loading: () => (<p>loading...</p>),
    ssr: false
  }
)

const Home = () => (
  <div className='main'>
    <Head title='Home' />
    <MyEditor />
    <style jsx>{`
      .main {
        padding: 30px 342px 0 160px;
        font-family: 'Roboto', sans-serif;
        color: #203340;
        box-sizing: border-box;
      }
    `}</style>
  </div>
)

export default Home
