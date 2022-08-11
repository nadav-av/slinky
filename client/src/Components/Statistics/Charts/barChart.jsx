import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';
import { Container, Grid } from "@mui/material";

const BarChart = ({chartData}) => {

return (
    <Container>
    <Grid container>
      <Grid item xs={12} justifyContent={"center"}>
  <div style={{width:500, margin:20}}>
      <Bar data={chartData}/>
  </div>
      </Grid>
    </Grid>
  </Container>
  );
};
export default BarChart;