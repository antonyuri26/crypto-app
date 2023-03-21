import React from "react";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

function limit(string) {
  return string.substring(0, 150);
}

const NewsCard = (props) => {
  const phone = useMediaQuery("(min-width:450px)");
  return (
    <Grid item xs={12} md={6} lg={4}>
      <CardActionArea component="a" href={props.post.url}>
        <Card sx={{ display: "flex", height: "300px" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h6" sx={{ lineHeight: "1.2" }}>
              {phone
                ? props.post.title
                : props.post.title.substring(0, 30) + "..."}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              marginTop={"0.5rem"}
            >
              {props.post.date}
            </Typography>
            <Typography variant="body2" paragraph marginTop={"1rem"}>
              {limit(props.post.description)}
              {"..."}
            </Typography>
            <Typography variant="body2" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 180, display: { xs: "inline", sm: "block" } }}
            image={props.post.image}
            alt={props.post.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default NewsCard;
