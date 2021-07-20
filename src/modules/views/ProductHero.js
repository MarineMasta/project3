import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Typography from "../components/Typography"
import ProductHeroLayout from "./ProductHeroLayout"
import * as values from "../../constants"

const backgroundImage = values.HOME_BACKGROUND_IMG

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
})

function ProductHero(props) {
  const { classes } = props

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        {values.HOME_TITLE}
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        {values.HOME_SUBTITLE}
      </Typography>
      <Typography variant="body2" color="inherit" className={classes.more}>
        {values.HOME_CAPTION}
      </Typography>
    </ProductHeroLayout>
  )
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductHero)
