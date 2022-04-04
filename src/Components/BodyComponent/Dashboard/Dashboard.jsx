import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography, Button } from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { PageHeader } from "../../Common/CommonComponent";
// import { DisplayCardGraph } from "../../Common/GraphComponent";
import { CardContent } from "@material-ui/core";

// import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import {
//   fakeArrayDataGenerator,
//   randomValueGenerator,
// } from "../../../utils/fakeArrayDataGenetator";
// import {
//   amber,
//   green,
//   indigo,
//   lightGreen,
//   red,
// } from "@material-ui/core/colors";
// import { blue } from "@material-ui/core/colors";
import UserOverviewComponent from "./UserOverviewComponent";
// import { GetPost, GetUser } from "../../../utils/blogRequest";
import ListSection from "./ListSection";
// import { getUser } from "../../../api/auth";

import { fetchDashticks } from '../../../api/users';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const gainedOptions = {
  responsive: true,
  plugins: {
    legend: false,
  },
};

const LostOptions = {
  responsive: true,
  plugins: {
    legend: false,
  },
};


export default function Dashboard() {
  const classes = useStyles();
  const [fetched, setFetched] = useState(false);
  const [posts, setPosts] = useState([]);
  const [authors, setauthors] = useState([]);
  const [gainedSubscribersData , setGainedSubscribersData] = useState({
    labels: [],
    datasets: [
      {
        label: "Gained Subscribers",
        data: [0, 0, 0, 0, 0, 0],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]})
  const [lostSubscribersData, setLostSubscribersData] = useState({
    labels: [],
    datasets: [
      {
        label: "Lost Subscribers",
        data: [0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  })


//     {
//       label: "Posts",
//       value: randomValueGenerator({ digit: 100 }),
//       // icon: <ArrowDropDownIcon />,
//       // iconLabel: "23%",
//     },
//     {
//       label: "Earning",
//       value: randomValueGenerator({ digit: 1000 }),
//       // icon: <ArrowDropDownIcon />,
//       // iconLabel: "30%",
//     },
//   ];


  const Data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };


  useEffect(async() => {
    const {data} = await fetchDashticks()
    var gainedSubscribers = data.payload.gainedSubscribers[0];
    var lostSubscribers = data.payload.lostSubscribers[0];
    let totalgained = 0;
    let totalLost = 0
    


    if (!fetched) {

      var copyGainedSubscribersData = {...gainedSubscribersData}
      var copyLostSubscribersData = {...lostSubscribersData}
      
      copyGainedSubscribersData.datasets[0].data = gainedSubscribers.gainedSubscribers.map((item) => 
                // totalgained+=item.total;
               item.total
                // return totalgained
      )
      
      copyGainedSubscribersData.labels = gainedSubscribers.gainedSubscribers.map((item) => {
        // totalgained+=item.total;
        //  return item.total 
        return '' //item.date
      })

      copyLostSubscribersData.datasets[0].data = lostSubscribers.lostSubscribers.map((item) => 
                // totalgained+=item.total;
               item.total
                // return totalgained
      )
      
      copyLostSubscribersData.labels = lostSubscribers.lostSubscribers.map((item) => {
        // totalgained+=item.total;
        //  return item.total 
        return '' //item.date
      })
      setGainedSubscribersData({...copyGainedSubscribersData})
      setLostSubscribersData({...copyLostSubscribersData})


      setFetched(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched]);


  return (
    <Box>
      <PageHeader label='Dashboard' pageTitle='Analytics of All Owners' />
      <Grid container spacing={1}>

          {/* Drawing Gained Subscribers Graph */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Typography variant='h5' component='h6'>
                  Gained Suscribers
                </Typography>
                <Line  options={gainedOptions} data={ fetched ? gainedSubscribersData : Data} />
              </CardContent>
            </Card>
          </Grid>
          {/* Drawing gained Subscirbers Graph End */}
          {/* Drawing Lost Subscribers Graph */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Typography variant='h5' component='h6'>
                  Lost Suscribers
                </Typography>
                <Line  options={LostOptions} data={ fetched ? lostSubscribersData : Data} />
              </CardContent>
            </Card>
          </Grid>
          {/* Drawing Lost SUscriers Graph End */}
          
      </Grid>
      <UserOverviewComponent />
      <ListSection posts={posts} authors={authors} />
    </Box>
  );
}
