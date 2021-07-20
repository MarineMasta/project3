import React from "react"
import AppFooter from "../views/AppFooter"
import ProductHero from "../views/ProductHero"
import TopNav from "../views/TopNav"

function Home(props) {
  return (
    <div>
      <TopNav auth={props.auth} noProfile />
      <ProductHero />
      <AppFooter />
    </div>
  )
}

export default Home
