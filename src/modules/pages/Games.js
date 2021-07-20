import React, { useState } from "react"
import StaticImageView from "../views/StaticImageView"
import TopNav from "../views/TopNav"
import Button from "@material-ui/core/Button"
import * as values from "../../constants"
import AddOrModifyItem from "../views/AddOrModifyItem"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"

function Games(props) {
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [editModeEnabled, setEditModeEnabled] = useState(false)

  const handleEditMode = () => {
    setEditModeEnabled(!editModeEnabled)
  }

  return (
    <>
      <TopNav auth={props.auth} />
      <div
        style={{
          backgroundColor: "black",
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button color="secondary" onClick={() => setShowAddItemModal(true)}>
          {values.ADD_ITEM}
        </Button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}
      >
        <FormControlLabel
          control={
            <Switch
              onChange={handleEditMode}
              style={{ display: "flex" }}
              name="checkedA"
            />
          }
          label={values.EDIT_MODE}
        />
      </div>
      <div style={{ marginTop: 32 }}>
        <StaticImageView editModeEnabled={editModeEnabled} />
      </div>
      <AddOrModifyItem
        showModal={showAddItemModal}
        setShowModal={setShowAddItemModal}
      />
    </>
  )
}

export default Games
