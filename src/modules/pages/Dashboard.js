import React, { useState, useMemo } from "react"
import TopNav from "../views/TopNav"
import { Carousel } from "3d-react-carousal"
import Button from "@material-ui/core/Button"
import * as values from "../../constants"
import AddOrModifyItem from "../views/AddOrModifyItem"

let slides = [
  <img
    src="https://progameguides.com/wp-content/uploads/2019/10/fortnite-outfit-scratch.jpg"
    alt="1"
    height={300}
    width={800}
  />,
  <img
    src="https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png"
    alt="2"
    height={300}
    width={800}
  />,
  <img
    src="https://progameguides.com/wp-content/uploads/2019/10/fortnite-outfit-scratch.jpg"
    alt="3"
    height={300}
    width={800}
  />,
  <img
    src="https://images5.alphacoders.com/690/thumb-1920-690653.png"
    alt="4"
    height={300}
    width={800}
  />,
  <img
    src="https://www.itp.net/public/styles/full_img_sml/public/images/2019/05/27/44485-pubg_base1.jpg?itok=EF911Xan"
    alt="5"
    height={300}
    width={800}
  />,
]

function Dashboard(props) {
  const [showModal, setShowModal] = useState(false)
  const memoisedCarousel = useMemo(() => {
    return <Carousel slides={slides} />
  }, [])

  return (
    <div>
      <TopNav auth={props.auth} />
      <div
        style={{
          display: "block",
          height: "400px",
          marginTop: 80,
        }}
      >
        {memoisedCarousel}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          color="secondary"
          size="large"
          onClick={() => props.history.push("/games")}
        >
          {values.VIEW_COMPLETE_LIST}
        </Button>
        <Button color="primary" onClick={() => setShowModal(true)}>
          {values.ADD_ITEM}
        </Button>
        <AddOrModifyItem showModal={showModal} setShowModal={setShowModal} />
      </div>
    </div>
  )
}

export default Dashboard
