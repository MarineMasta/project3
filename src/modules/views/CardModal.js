import React from "react"
import Modal from "react-modal"
import Link from "@material-ui/core/Link"

import * as values from "../../constants"
import { CloseButton } from "react-bootstrap"

const customStyles = {
  content: {
    height: 400,
    width: 600,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

function CardModal({ showCard, setShowCard, gameCard }) {
  const closeCard = () => setShowCard(false)
  return (
    <Modal
      isOpen={showCard}
      onRequestClose={closeCard}
      style={customStyles}
      contentLabel="Display Game Card Modal"
    >
      <CloseButton
        onClick={closeCard}
        style={{
          background: "transparent",
          opacity: 0.5,
          cursor: "pointer",
        }}
      />
      <div
        style={{
          display: "flex",
          widht: "100%",
          height: 230,
          justifyContent: "center",
        }}
      >
        <img
          src={gameCard.image}
          alt={gameCard.title}
          style={{ height: "100%", width: "70%", borderRadius: 10 }}
        />
      </div>
      <h3>Highest Score : {gameCard.highestScore}</h3>
      <h3>Number of times Played: {gameCard.timesPlayed}</h3>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link variant="h6" underline="none">
          {values.DELETE}
        </Link>
      </div>
    </Modal>
  )
}

export default CardModal
