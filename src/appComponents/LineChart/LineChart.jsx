import React, { useMemo } from "react";
import { Chart } from "react-charts";

export const LineChart = (props) => {
  const data = [
    {
      label: "Price History",
      data: props.data.slice().sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      }),
    },
  ];

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.date.split("-").reverse().join("-"),
      elementType: "line",
    }),
    []
  );
  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.price,
        elementType: "line",
      },
    ],
    []
  );
  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
};
