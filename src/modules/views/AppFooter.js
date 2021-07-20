import React from "react"
import Link from "@material-ui/core/Link"
import TwitterIcon from "@material-ui/icons/Twitter"
import FacebookIcon from "@material-ui/icons/Facebook"
import * as values from "../../constants"

export default function AppFooter() {
  function Copyright() {
    return (
      <React.Fragment>
        {"© "}
        <Link color="inherit" href={values.PERSONAL_WEBSITE_URL}>
          {values.PERSONAL_WEBSITE}
        </Link>{" "}
        {new Date().getFullYear()}
      </React.Fragment>
    )
  }

  return (
    <>
      <div
        style={{
          marginTop: 32,
          marginLeft: 32,
          display: "flex",
        }}
      >
        <a href={values.TWITTER_URL}>
          <TwitterIcon style={{ color: "#f50057", cursor: "pointer" }} />
        </a>

        <a href={values.FACEBOOK_URL}>
          <FacebookIcon
            style={{ marginLeft: 32, color: "#f50057", cursor: "pointer" }}
          />
        </a>
        <div style={{ marginLeft: "auto", marginRight: 32 }}>
          <Copyright />
        </div>
      </div>
    </>
  )
}
