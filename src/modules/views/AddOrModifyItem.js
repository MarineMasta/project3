import React, { useEffect, useState } from "react"
import Modal from "react-modal"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import CloseButton from "react-bootstrap/CloseButton"
import Link from "@material-ui/core/Link"
import Alert from "@material-ui/lab/Alert"
import IconButton from "@material-ui/core/IconButton"
import Collapse from "@material-ui/core/Collapse"
import CloseIcon from "@material-ui/icons/Close"

import * as values from "../../constants"
import { VideoLabelRounded } from "@material-ui/icons"
Modal.setAppElement("#root")

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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}))

//If editMode != {} this will just edit the card by checking id in the mongoDB, if not found it shall add the item.
//else , card shall be added into mongoDB, no id check reqd.

const AddOrModifyItem = ({ showModal, setShowModal, editModeEnabled }) => {
  const [gameCard, setGameCard] = useState({
    title: "",
    subtitle: "",
    timesPlayed: "0",
    highestScore: "0",
    imageURL: "",
  })
  const [openAlert, setOpenAlert] = useState(false)
  useEffect(() => setOpenAlert(false), [showModal])
  const closeModal = () => {
    setShowModal(false)
  }

  const handleSaveForm = () => {
    setOpenAlert(true)
  }

  const updateState = (value) => {
    const varType = Object.keys(value)[0]
    const tempObj = gameCard

    if (
      (varType === "timesPlayed" || varType === "highestScore") &&
      (!(value[varType] >= 0) || value[varType] === "")
    )
      tempObj[varType] = "0"
    else tempObj[varType] = value[varType]
    setGameCard(tempObj)
  }

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Game Card Modal"
    >
      <CloseButton
        onClick={closeModal}
        style={{
          background: "transparent",
          opacity: 0.5,
          cursor: "pointer",
        }}
      />

      <form style={{ marginTop: 16 }}>
        <TextField
          required
          id="outlined-basic"
          label={values.GAME_TITLE}
          variant="outlined"
          style={{ width: 500 }}
          onChange={(e) => updateState({ title: e.target.value })}
        />
        <TextField
          required
          id="outlined-basic"
          label={values.GAME_SUBTITLE}
          variant="outlined"
          style={{ width: 500, marginTop: 8 }}
          onChange={(e) => updateState({ subtitle: e.target.value })}
        />
        <TextField
          id="standard-number"
          label={values.TIMES_PLAYED}
          type="number"
          defaultValue={0}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ width: 500, marginTop: 32, marginLeft: 4 }}
          onChange={(e) => updateState({ timesPlayed: e.target.value })}
        />
        <TextField
          id="standard-basic"
          label={values.HIGHEST_SCORE}
          style={{ marginTop: 16 }}
          onChange={(e) => updateState({ highestScore: e.target.value })}
        />
        <TextField
          required
          id="standard-basic"
          label={values.ADD_IMAGE_URL}
          style={{ marginTop: 16, marginLeft: 64, width: 250 }}
          onChange={(e) => updateState({ imageURL: e.target.value })}
        />
      </form>
      <Collapse in={openAlert} style={{ marginTop: 8 }}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {editModeEnabled ? values.SUCCESS_EDIT : values.SUCCESS_SAVED}
        </Alert>
      </Collapse>

      <Link
        variant="h6"
        underline="none"
        onClick={handleSaveForm}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          cursor: "pointer",
          color: "#f50057",
        }}
      >
        {editModeEnabled ? values.EDIT : values.SAVE}
      </Link>
    </Modal>
  )
}

export default AddOrModifyItem
