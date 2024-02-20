"use client";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

const StyledText = styled("text")(({ theme }) => ({
  fill: "white",
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
    justifyContent: "center",
  };

function DonutChart({wins, losses, goals1, goals2}: {wins: number, losses: number, goals1: number, goals2: number}){
    return (
    <Stack direction="row" width="100%" textAlign="center" spacing={20} className="justify-center mb-10">
      <Box>
      <PieChart
        series={[
          {
            data: [
              { label: "Hieu", value: wins },
              { label: "Kuba", value: losses },
            ],
            innerRadius: 80,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        {...sizing}
      >
        <PieCenterLabel>Wins</PieCenterLabel>
      </PieChart>
      </Box>
      <Box>
      <PieChart
        series={[
          {
            data: [
              { label: "Hieu", value: goals1 },
              { label: "Kuba", value: goals2 },
            ],
            innerRadius: 80,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
          },
        ]}
        {...sizing}
      >
        <PieCenterLabel>Goals</PieCenterLabel>
      </PieChart>
      </Box>
      </Stack>
    )
}

export default DonutChart;