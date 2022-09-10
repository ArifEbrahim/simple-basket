import React from 'react'
import MainHeader from "./MainHeader";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <MainHeader />
      <main>
        {props.children}
      </main>
    </>
  )
}

export default Layout