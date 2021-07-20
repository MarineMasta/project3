import React from "react"
import Typography from "@material-ui/core/Typography"
import CardActionArea from "@material-ui/core/CardActionArea"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree"

const CustomCard = ({ classes, image, title, subtitle, onClickHandler }) => {
  const mediaStyles = useFourThreeCardMediaStyles()
  return (
    <CardActionArea className={classes.actionArea} onClick={onClickHandler}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={"h2"}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>{subtitle}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}

export default CustomCard
