export const barChartData1 = [
    {
      name: "Weight",
      data: [100, 105, 120, 130, 150, 155, 155, 160, 162],
    },
  ]
  export const barChartOptions1 = {
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