import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function DashboardChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedOption, setSelectedOption] = useState("day");

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const getData = (option) => {
      switch (option) {
        case "day":
          return {
            labels: [
              "00:00",
              "01:00",
              "02:00",
              "03:00",
              "04:00",
              "05:00",
              "06:00",
              "07:00",
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00",
              "22:00",
              "23:00",
            ],
            datasets: [
              {
                label: "Revenue",
                data: [
                  12, 15, 20, 25, 18, 12, 10, 8, 15, 30, 45, 60, 55, 50, 40, 30,
                  25, 20, 15, 10, 8, 5, 2, 0,
                ],
                fill: false,
                borderColor: documentStyle.getPropertyValue("--mainColor"),
                tension: 0.4,
              },
              {
                label: "Orders",
                data: [
                  5, 6, 7, 8, 6, 5, 4, 3, 6, 10, 12, 15, 14, 12, 10, 8, 7, 5, 4,
                  3, 2, 1, 0, 0,
                ],
                fill: false,
                borderColor: documentStyle.getPropertyValue("--darkColor"),
                tension: 0.4,
              },
            ],
          };
        case "week":
          return {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                label: "Revenue",
                data: [50, 60, 70, 80],
                fill: false,
                borderColor: documentStyle.getPropertyValue("--mainColor"),
                tension: 0.4,
              },
              {
                label: "Orders",
                data: [20, 40, 60, 80],
                fill: false,
                borderColor: documentStyle.getPropertyValue("--darkColor"),
                tension: 0.4,
              },
            ],
          };
        case "month":
          return {
            labels: Array.from({ length: 31 }, (_, i) => `${i + 1}`),
            datasets: [
              {
                label: "Revenue",
                data: Array.from({ length: 31 }, () =>
                  Math.floor(Math.random() * 100)
                ), // Example random data
                fill: false,
                borderColor: documentStyle.getPropertyValue("--mainColor"),
                tension: 0.4,
              },
              {
                label: "Orders",
                data: Array.from({ length: 31 }, () =>
                  Math.floor(Math.random() * 50)
                ), // Example random data
                fill: false,
                borderColor: documentStyle.getPropertyValue("--darkColor"),
                tension: 0.4,
              },
            ],
          };
        case "year":
          return {
            labels: ["2021", "2022", "2023", "2024"],
            datasets: [
              {
                label: "Revenue",
                data: [500, 600, 700, 800],
                fill: false,
                borderColor: documentStyle.getPropertyValue("--mainColor"),
                tension: 0.4,
              },
              {
                label: "Orders",
                data: [200, 400, 600, 800],
                fill: false,
                borderColor: documentStyle.getPropertyValue("--darkColor"),
                tension: 0.4,
              },
            ],
          };
        default:
          return {
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
            ],
            datasets: [
              {
                label: "Revenue",
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: documentStyle.getPropertyValue("--mainColor"),
                tension: 0.4,
              },
              {
                label: "Orders",
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: documentStyle.getPropertyValue("--darkColor"),
                tension: 0.4,
              },
            ],
          };
      }
    };

    const getOptions = () => {
      return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: () => "",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    };

    setChartData(getData(selectedOption));
    setChartOptions(getOptions());
  }, [selectedOption]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="dashboadChart">
      <div className="w-full flex items-center justify-between ">
        <h3 className="dashboardTitleItem">Sales Overtime</h3>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="cercleChartItemRevenue"></div>
              <span className="spanChartItemRevenue">Revenue</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="cercleChartItemOrder"></div>
              <span className="spanChartItemOrder">Order</span>
            </div>
          </div>
          <div className="selectOptionChartClass">
            <select
              className="selectOptionChart"
              name="selectOptionChart"
              id="selectOptionChart"
              value={selectedOption}
              onChange={handleChange}
            >
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <Chart
          type="line"
          data={chartData}
          options={chartOptions}
          height="420px"
        />
      </div>
    </div>
  );
}
