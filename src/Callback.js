import React, { Component } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"

class Callback extends Component {
  componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication()
    } else {
      throw new Error("Invalid Callback URL.")
    }
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          marginTop: "25%",
          marginLeft: "50%",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    )
  }
}

export default Callback
