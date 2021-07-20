import React, { useState } from "react"
import Color from "color"
import { makeStyles } from "@material-ui/core/styles"

import Grid from "@material-ui/core/Grid"
import CustomCard from "../components/CustomCard"
import CardModal from "./CardModal"
import AddOrModifyItem from "./AddOrModifyItem"

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
}))

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,
    boxShadow: "none",
    "&:hover": {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: "1rem 1.5rem 1.5rem",
    }
  },
  title: {
    fontFamily: "Keania One",
    fontSize: "2rem",
    color: "#fff",
    textTransform: "uppercase",
  },
  subtitle: {
    fontFamily: "Montserrat",
    color: "#fff",
    opacity: 0.87,
    marginTop: "2rem",
    fontWeight: 500,
    fontSize: 14,
  },
}))

const StaticImageView = React.memo(function SolidGameCard({ editModeEnabled }) {
  const gridStyles = useGridStyles()
  const [clickedCard, setClickedCard] = useState({})
  const [showCard, setShowCard] = useState(false)
  const gamesList = [
    {
      id: 1,
      title: "Dota 2",
      subtitle: "Be a legend",
      image:
        "https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png",
      color: "#203f52",
      styles: useStyles({ color: "#203f52" }),
      highestScore: 2090,
      timesPlayed: 9,
    },
    {
      id: 2,
      title: "Fortnite",
      subtitle: "Time to choose a side!",
      image:
        "https://progameguides.com/wp-content/uploads/2019/10/fortnite-outfit-scratch.jpg",
      color: "#4d137f",
      styles: useStyles({ color: "#4d137f" }),
      highestScore: 84933,
      timesPlayed: 233,
    },
    {
      id: 3,
      title: "Overwatch",
      subtitle: "What are you waiting?",
      image: "https://images5.alphacoders.com/690/thumb-1920-690653.png",
      color: "#ff9900",
      styles: useStyles({ color: "#ff9900" }),
      highestScore: 1201,
      timesPlayed: 129,
    },
    {
      id: 4,
      title: "PubG",
      subtitle: "Are you ready?",
      image:
        "https://www.itp.net/public/styles/full_img_sml/public/images/2019/05/27/44485-pubg_base1.jpg?itok=EF911Xan",
      color: "#34241e",
      styles: useStyles({ color: "#34241e" }),
      highestScore: 947923,
      timesPlayed: 2102,
    },
  ]

  const cardClickHandler = (gameCard) => {
    setClickedCard(gameCard)
    setShowCard(true)
  }

  return (
    <>
      <Grid classes={gridStyles} container spacing={4}>
        {gamesList.map((gameCard) => {
          const { id, title, subtitle, image, styles } = gameCard
          return (
            <Grid item key={`${id}_${title}`}>
              <CustomCard
                classes={styles}
                title={title}
                subtitle={subtitle}
                image={image}
                onClickHandler={() => cardClickHandler(gameCard)}
              />
            </Grid>
          )
        })}
      </Grid>
      {editModeEnabled ? (
        <AddOrModifyItem
          showModal={showCard}
          setShowModal={setShowCard}
          editModeEnabled={editModeEnabled}
        />
      ) : (
        <CardModal
          showCard={showCard}
          setShowCard={setShowCard}
          gameCard={clickedCard}
        />
      )}
    </>
  )
})

export default StaticImageView
