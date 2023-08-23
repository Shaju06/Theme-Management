import React from 'react'
import Header from './Header'
import { useAppContext } from '../ContextStore'


function Home() {

const {primaryColor } = useAppContext()



console.log(primaryColor, 'primaryColor')

const sectionStyle = {
    backgroundColor: primaryColor,
    padding: '20px',
    color: 'white',
  };

  return (
    <>
    <Header />
    <div style={sectionStyle}>
      <h2>Section Body</h2>
      <p>This is the content of the section body.</p>
    </div>
    </>
  )
}

export default Home