import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import MyEditor from '../components/editor'

const Home = () => (
  <div className='main'>
    <Head title='Home' />
    <MyEditor />
    <style jsx>{`
      .main {
        padding: 10px 50px;
      }
    `}</style>
  </div>
)

export default Home
