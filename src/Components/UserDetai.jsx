import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography, Button } from "@material-ui/core";
import { CardContent } from "@material-ui/core";

import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import {
  amber,
  green,
  indigo,
  lightGreen,
  red,
} from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import { useStyles } from "./BodyComponent/BodyStyles";
import { fakeArrayDataGenerator, randomValueGenerator } from "../utils/fakeArrayDataGenetator";
import { getUser } from "../api/auth";
import { DisplayCardGraph } from "./Common/GraphComponent";
import { GetPost, GetUser } from "../utils/blogRequest";
import { PageHeader } from "./Common/CommonComponent";
import UserOverviewComponent from "./BodyComponent/Dashboard/UserOverviewComponent";

export default function UserDetail() {
  const classes = useStyles();
  const [fetched, setFetched] = useState(false);
  const [posts, setPosts] = useState([]);
  const [authors, setauthors] = useState([]);

const hs=  fakeArrayDataGenerator({ count: 9, digit: 100 });
console.log(hs);
  const DisplayData = [
    {
      label: "Gained Subscribers",
      value: randomValueGenerator({ digit: 1000 }),
      icon: <ArrowDropUpIcon />,
      iconLabel: "4%",
    },
    {
      label: "Drop Subscribers",
      value: randomValueGenerator({ digit: 100 }),
      icon: <ArrowDropUpIcon />,
      iconLabel: "9%",
    },
    {
      label: "Posts",
      value: randomValueGenerator({ digit: 100 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: "23%",
    },
    {
      label: "Earning",
      value: randomValueGenerator({ digit: 1000 }),
      icon: <ArrowDropDownIcon />,
      iconLabel: "30%",
    },
  ];

  const GraphCardData = [
    {
      id: "Gained Subscribers",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: blue[500],
      bgColor: blue[50],
    },
    {
      id: "Drop Subscribers",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: indigo[500],
      bgColor: indigo[50],
    },
    {
      id: "Posts",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: lightGreen[500],
      bgColor: lightGreen[50],
    },
    {
      id: "Earning",
      data: fakeArrayDataGenerator({ count: 9, digit: 100 }),
      brColor: amber[500],
      bgColor: amber[50],
    },
  ];

  useEffect(() => {
    console.log(getUser());
    if (!fetched) {
      GraphCardData.map((item, i) =>
        DisplayCardGraph({
          id: item.id,
          data: item.data,
          brColor: item.brColor,
          bgColor: item.bgColor,
        })
      );
      setFetched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched]);

  // for api calling
  useEffect(() => {
    if (!fetched) {
      GetPost({ limit: 5 }).then(({ data: { data } }) => {
        setPosts(data);
      });
      GetUser({ limit: 5 }).then(({ data: { data } }) => {
        setauthors(data);
      });
      setFetched(true);
    }
  }, [fetched]);
  return (
    <Box>
      <PageHeader label='Detail' pageTitle={`Analytics of ${'Abdulrehman'}`} />
      <Grid container spacing={1}>
        {DisplayData.map((item, i) => (
          <Grid item xs={6} sm={3} key={i}>
            <Card>
              <CardContent className={classes.cardContent}>
                <canvas
                  id={item.label}
                  className={classes.displayCardGraph}></canvas>
                <Typography variant='body2' className={classes.cardLabel}>
                  {item.label}
                </Typography>
                <Typography
                  variant='h5'
                  component='h6'
                  className={classes.cardTitle}>
                  {item.value}
                </Typography>
                <Typography
                  component='p'
                  style={{
                    textAlign: "center",
                    marginBottom: "0px",
                  }}>
                  <Button
                    size='small'
                    className={classes.ratioBtn}
                    startIcon={item.icon}
                    style={{
                      color: item.label[0] === "P" ? green[600] : red[500],
                    }}>
                    {item.iconLabel}
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <UserOverviewComponent />
    </Box>

  );
}
