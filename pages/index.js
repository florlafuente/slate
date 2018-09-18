import React from 'react'
import Link from 'next/link'
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
        padding: 30px 150px;
      }
    `}</style>
  </div>
)

export default Home
