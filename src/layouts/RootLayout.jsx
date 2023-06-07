import React from 'react'
import Navbar from '../shared-components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../shared-components/Footer/Footer'

const RootLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayout