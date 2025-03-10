import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import DashboardSoonToExpireSubscription from "../components/DashboardSoonToExpireSubscription";
import DashboadStoreStatistic from "../components/DashboadStoreStatistic";
import DashboardNewCostumers from "../components/DashboardNewCostumers";
import DashboardChart from "../components/DashboardChart";
import DashboardCalendar from "../components/DashboardCalendar";
import { TokenDecoder } from "../util/DecodeToken";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { user } = useAuthContext();
  const decodedToken = TokenDecoder();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  //---------------------------------API calls---------------------------------\\

  //fetch data
  const fetchSubscriptionsStats = async () => {
    let response;
    if (dateRange.startDate && dateRange.endDate) {
      response = await fetch(
        `${import.meta.env.VITE_APP_URL_BASE}/Dashboard/subscriptions/${
          decodedToken.id
        }?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    } else {
      response = await fetch(
        `${import.meta.env.VITE_APP_URL_BASE}/Dashboard/subscriptions/all/${
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
    }

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.error.statusCode === 404) {
        return []; // Return an empty array if no data is found
      } else {
        throw new Error("Error receiving subscriptions stats data");
      }
    }

    return await response.json(); // Return the data if the response is successful
  };
  // useQuery hook to fetch data
  const {
    data: SubscriptionsStats,
    error: SubscriptionsStatsError,
    isLoading: SubscriptionsStatsLoading,
    refetch: refetchSubscriptionsStats,
  } = useQuery({
    queryKey: ["SubscriptionsStats", user?.token],
    queryFn: fetchSubscriptionsStats,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: false, // Disable refetch on window focus (optional)
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 2, // Retry failed requests 2 times
    retryDelay: 1000, // Delay between retries (1 second)
  });

  useEffect(() => {
    refetchSubscriptionsStats();
  }, [dateRange]);

  //fetch data
  const fetchStatsData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Dashboard/admin/stats/${decodedToken.id}`,
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
        throw new Error("Error receiving admin stats data");
      }
    }

    return await response.json(); // Return the data if the response is successful
  };
  // useQuery hook to fetch data
  const {
    data: StatsData,
    error: StatsDataError,
    isLoading: StatsDataLoading,
    refetch: refetchStatsData,
  } = useQuery({
    queryKey: ["StatsData", user?.token],
    queryFn: fetchStatsData,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: false, // Disable refetch on window focus (optional)
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 2, // Retry failed requests 2 times
    retryDelay: 1000, // Delay between retries (1 second)
  });

  //fetch data
  const fetchStoreAccessRequests = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_URL_BASE
      }/Dashboard/store-access-requests/${decodedToken.id}`,
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
        throw new Error("Error receiving store access requests data");
      }
    }

    return await response.json(); // Return the data if the response is successful
  };
  // useQuery hook to fetch data
  const {
    data: StoreAccessRequests,
    error: StoreAccessRequestsError,
    isLoading: StoreAccessRequestsLoading,
    refetch: refetchStoreAccessRequests,
  } = useQuery({
    queryKey: ["StoreAccessRequests", user?.token],
    queryFn: fetchStoreAccessRequests,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: false, // Disable refetch on window focus (optional)
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 2, // Retry failed requests 2 times
    retryDelay: 1000, // Delay between retries (1 second)
  });

  //fetch data
  const fetchSubscriptionSoonToExpire = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_URL_BASE}/Dashboard/subscription-soon-to-expire/${
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
        throw new Error("Error receiving subscription soon to expire data");
      }
    }

    return await response.json(); // Return the data if the response is successful
  };
  // useQuery hook to fetch data
  const {
    data: SubscriptionSoonToExpire,
    error: SubscriptionSoonToExpireError,
    isLoading: SubscriptionSoonToExpireLoading,
    refetch: refetchSubscriptionSoonToExpire,
  } = useQuery({
    queryKey: ["SubscriptionSoonToExpire", user?.token],
    queryFn: fetchSubscriptionSoonToExpire,
    enabled: !!user?.token, // Ensure the query runs only if the user is authenticated
    refetchOnWindowFocus: false, // Disable refetch on window focus (optional)
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 2, // Retry failed requests 2 times
    retryDelay: 1000, // Delay between retries (1 second)
  });
  
  return (
    <div className="pagesContainer scrollPage">
      <Header />
      <div className="w-full flex items-center justify-between">
        <div className="flex-col space-y-[6px]">
          <h2 className="pagesTitle">Bienvenue, Amine Faroukhi</h2>
          <span className="pagesSousTitle">
            Here's you current sales overview
          </span>
        </div>
        <DashboardCalendar
          onDateChange={(start, end) =>
            setDateRange({ startDate: start, endDate: end })
          }
        />
      </div>
      <div className="flex items-center space-x-6">
        <DashboardCard
          dashboardCardTitle="Montant total des abonnements"
          dashboardCardAmount={SubscriptionsStats?.totalAmount}
          OrdersStatsLoading={SubscriptionsStatsLoading}
        />
        <DashboardCard
          dashboardCardTitle="Total des abonnements"
          dashboardCardAmount={SubscriptionsStats?.totalSubscriptions}
          OrdersStatsLoading={SubscriptionsStatsLoading}
        />
        <DashboardCard 
          dashboardCardTitle="Montant des pertes" 
          dashboardCardAmount={SubscriptionsStats?.totalLosses}
          OrdersStatsLoading={SubscriptionsStatsLoading}
        />
      </div>
      <div className="flex items-center justify-between space-x-6">
        <DashboardChart />
        <DashboardNewCostumers 
          StoreAccessRequests={StoreAccessRequests}
          StoreAccessRequestsLoading={StoreAccessRequestsLoading}
        />
      </div>
      <DashboardSoonToExpireSubscription 
        data={SubscriptionSoonToExpire}
        loading={SubscriptionSoonToExpireLoading}
        handleRefetchDataChange={refetchSubscriptionSoonToExpire}
      />
      <div className="w-full flex justify-between space-x-6">
        <DashboadStoreStatistic 
          StatsData={StatsData}
          StatsDataLoading={StatsDataLoading}
        />
      </div>
    </div>
  );
}
