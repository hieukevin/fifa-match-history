'use client'
import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
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

function OverallStats() {
  return (
      <div className="fixed bottom-0 w-full flex flex-col items-center">
  <h1>All time record</h1>
  <p>9-0-6</p>
  <div className='flex ml-20'>

  <PieChart
  
  series={[
    {
      data: [
        { id: 0, value: 9},
        { id: 1, value:  6},
      ],
      innerRadius: 80,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,

    },
  ]}
  width={400}
  height={400}
>  <PieCenterLabel>Wins</PieCenterLabel>
</PieChart>
<PieChart
  series={[
    {
      data: [
        { id: 0, value: 30},
        { id: 1, value: 20 },
      ],
      innerRadius: 80,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
    },
  ]}
  width={400}
    height={400}
><PieCenterLabel>Gols</PieCenterLabel> </PieChart>
</div>

</div>


  )
}

export default OverallStats