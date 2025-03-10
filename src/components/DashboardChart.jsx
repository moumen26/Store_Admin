import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { TokenDecoder } from "../util/DecodeToken";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";

export default function DashboardChart() {
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedOption, setSelectedOption] = useState("daily");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Utility function to fetch data
  const fetchData = async (endpoint) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Dashboard/${endpoint}/${
        decodedToken.id
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.statusCode === 404) {
        return []; // Return an empty array if no data is found
      } else {
        throw new Error(`Error receiving data for ${endpoint}`);
      }
    }

    return await response.json(); // Return the data if the response is successful
  };

  // useQuery hook to fetch data dynamically
  const {
    data: chartApiData,
    error: chartApiError,
    isLoading: chartApiLoading,
  } = useQuery({
    queryKey: ["chartData", selectedOption, user?.token],
    queryFn: () => fetchData(`subscriptions/${selectedOption}`),
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: false, // Disable refetch on window focus (optional)
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 2, // Retry failed requests 2 times
    retryDelay: 1000, // Delay between retries (1 second)
  });
  
  // Update chart data based on the selected option and API response
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const getLabels = () => {
      if (!chartApiData || chartApiData.length === 0) return [];

      // Extract labels from the API response
      return chartApiData.map((item) => item._id);
    };

    const getDatasets = () => {
      if (!chartApiData) return [];

      return [
        {
          label: "Montant total",
          data: chartApiData.map((item) => item.totalProfit),
          fill: true,
          borderColor: documentStyle.getPropertyValue("--mainColor"),
          tension: 0.4,
        },
      ];
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

    setChartData({
      labels: getLabels(),
      datasets: getDatasets(),
    });
    setChartOptions(getOptions());
  }, [selectedOption, chartApiData]);

  // Handle loading and error states
  if (chartApiLoading) {
    return (
      <div className="dashboadChart">
        <div className="w-full h-full flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboadChart">
      <div className="w-full flex items-center justify-between ">
        <h3 className="dashboardTitleItem">Ventes au fil du temps</h3>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="cercleChartItemRevenue"></div>
              <span className="spanChartItemRevenue">Montant total</span>
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
              <option value="weekly">Semaine</option>
              <option value="monthly">Mois</option>
              <option value="yearly">Année</option>
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
