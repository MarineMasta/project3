import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { withStyles } from "@material-ui/core/styles"
import Link from "@material-ui/core/Link"
import AppBar from "../components/AppBar"
import Toolbar, { styles as toolbarStyles } from "../components/Toolbar"
import * as values from "../../constants"

const styles = (theme) => ({
  title: {
    fontSize: 24,
    cursor: "default",
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
})

function TopNav(props) {
  const { classes } = props
  const { login, logout, isAuthenticated } = props.auth
  const isLoggedIn = isAuthenticated()
  const styleOfLog = isLoggedIn
    ? { cursor: "pointer", marginTop: 10 }
    : { cursor: "pointer" }

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!props?.noProfile)
      props.auth.getProfile((profile, error) => setProfile(profile))
  }, [])

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          {/* <text
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
          > */}
          <h1>{values.COMPANY_TITLE}</h1>
          {/* </text> */}

          <div className={classes.right}>
            {isLoggedIn && profile && (
              <div
                style={{
                  width: 50,
                  height: 40,
                  borderRadius: 10,
                  marginTop: 4,
                }}
              >
                <img
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  src={profile.picture}
                  alt="profile pic"
                />
              </div>
            )}
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              onClick={isLoggedIn ? logout : login}
              style={styleOfLog}
            >
              {isLoggedIn ? values.LOG_OUT : values.SIGN_IN}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  )
}

TopNav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TopNav)
