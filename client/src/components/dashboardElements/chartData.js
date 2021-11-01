export const barChartData = [
  {
    name: "Weight",
    data: [210, 205, 207, 201, 195, 190, 187, 180, 182],
  },
]
export const barChartOptions = {
  chart: {
    toolbar: {
      show: true,
    },
  },
  tooltip: {
    style: {
      backgroundColor: "dark",
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        backgroundColor: "dark",
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    show: true,
    labels: {
      show: true,
      style: {
        colors: "teal",
        fontSize: "12px",
      },
    },
    axisBorder: {
      show: true,
    },
    axisTicks: {
      show: true,
    },
  },
  yaxis: {
    show: true,
    color: "teal",
    labels: {
      show: true,
      style: {
        colors: "teal",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: true,
  },
  fill: {
    colors: "##00",
  },
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "30px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
}