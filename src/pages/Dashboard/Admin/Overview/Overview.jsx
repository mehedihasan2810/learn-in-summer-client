import "./Overview.css";
import MonthlySoldStats from "./components/MonthlySoldStats/MonthlySoldStats";
import CustomerSatisfactionStats from "./components/CustomerSatisfactionStats/CustomerSatisfactionStats";
import TopStats from "./components/TopStats/TopStats";
import {
  Bar,
  BarChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

/**
 * The function `makeStatsDataRandom` takes an array of data and randomly generates new values for
 * certain properties within a specified range.
 * @returns The function `makeStatsDataRandom` returns an array `randomData` which contains the
 * modified data with random values.
 */
const makeStatsDataRandom = (data, max, min) => {
  let randomData = [];
  for (let i = 0; i < data.length; i++) {
    let singleData = {};

    // generate random data for top stats
    if (data[i].class_sold) {
      const randomSales = Math.floor(Math.random() * (max - min + 1)) + min;
      singleData = { ...data[i], class_sold: randomSales };
    }
    // --------------------------------------------

    // generate random data for month sales stats
    if (data[i].drum && data[i].guiter && data[i].violin && data[i].piano) {
      const randomDrum = Math.floor(Math.random() * (max - min + 1)) + min;
      const randomGuiter = Math.floor(Math.random() * (max - min + 1)) + min;
      const randomViolin = Math.floor(Math.random() * (max - min + 1)) + min;
      const randomPiano = Math.floor(Math.random() * (max - min + 1)) + min;
      singleData = {
        ...data[i],
        drum: randomDrum,
        guiter: randomGuiter,
        violin: randomViolin,
        piano: randomPiano,
      };
    }
    // --------------------------------------------
    randomData.push(singleData);
  }
  return randomData;
};
// ------------------------------------------
const data = [
  {
    month: "Jan",
    class_sold: 2400,
  },
  {
    month: "Feb",
    class_sold: 1398,
  },
  {
    month: "Mar",
    class_sold: 9800,
  },
  {
    month: "Apr",
    class_sold: 3908,
  },
  {
    month: "May",
    class_sold: 4800,
  },
  {
    month: "Jun",
    class_sold: 3800,
  },
];

const monthlySoldData = [
  {
    month: "Jan",
    drum: 4000,
    guiter: 2400,
    violin: 2400,
    piano: 2400,
  },
  {
    month: "Feb",
    drum: 3000,
    guiter: 1398,
    violin: 2210,
    piano: 2210,
  },
  {
    month: "Mar",
    drum: 2000,
    guiter: 9800,
    violin: 2290,
    piano: 2290,
  },
  {
    month: "Apr",
    drum: 2780,
    guiter: 3908,
    violin: 2000,
    piano: 2000,
  },
  {
    month: "May",
    drum: 1890,
    guiter: 4800,
    violin: 2181,
    piano: 2181,
  },
  {
    month: "Jun",
    drum: 2390,
    guiter: 3800,
    violin: 2500,
    piano: 2500,
  },
];

const barChartData = [
  {
    month: "Jan",
    profit: 4000,
    investment: 2400,
    loss: 2400,
  },
  {
    month: "Feb",
    profit: 3000,
    investment: 1398,
    loss: 2210,
  },
  {
    month: "Mar",
    profit: 2000,
    investment: 9800,
    loss: 2290,
  },
  {
    month: "Apr",
    profit: 2780,
    investment: 3908,
    loss: 5000,
  },
  {
    month: "May",
    profit: 1890,
    investment: 4800,
    loss: 2181,
  },
  {
    month: "Jun",
    profit: 2390,
    investment: 3800,
    loss: 2500,
  },
  {
    month: "Jul",
    profit: 5000,
    investment: 2400,
    loss: 2400,
  },
  {
    month: "Aug",
    profit: 3000,
    investment: 1398,
    loss: 2210,
  },
  {
    month: "Sep",
    profit: 2000,
    investment: 9800,
    loss: 2290,
  },
  {
    month: "Oct",
    profit: 2780,
    investment: 3908,
    loss: 2000,
  },
  {
    month: "Nov",
    profit: 1890,
    investment: 6800,
    loss: 2181,
  },
  {
    month: "Dec",
    profit: 2390,
    investment: 3800,
    loss: 2500,
  },
];

const visitUserData = [
  {
    name: "Page A",
    users: 10,
    visits: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    users: 300,
    visits: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    users: 100,
    visits: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    users: 280,
    visits: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    users: 190,
    visits: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    users: 290,
    visits: 3800,
    amt: 2500,
  }
];

/* The `barChartTooltip` function is a custom tooltip component for the BarChart in the Overview
component. It takes two parameters, `active` and `payload`, which are provided by the BarChart
component. */
const barChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.4rem",
          overflow: "hidden",
          fontWeight: "500",
          paddingBlockEnd: "0.2rem",
        }}
      >
        <p
          style={{
            backgroundColor: "#eceff1",
            padding: "0.4rem 1rem",
          }}
        >
          {payload[0].payload.month}
        </p>
        {payload.reverse().map((obj, index) => (
          <p
            key={index}
            style={{
              color: payload[index].fill,
              padding: "0.2rem 1rem",
            }}
          >{`${payload[index].dataKey} : ${obj.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};
// ------------------------------------------------------

/**
 * The `renderLegend` function renders a legend component in a React application, displaying a list of
 * items with different colors and values.
 * @returns The function `renderLegend` returns a JSX element, specifically an unordered list (`<ul>`)
 * with a list item (`<li>`) for each item in the `payload` array. Each list item displays the `value`
 * property of the corresponding item in the `payload` array. The list items have various styles
 * applied to them, including color, background color, padding, and border radius
 */
const renderLegend = ({ payload }) => {
  return (
    <ul
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {payload.map((entry, index) => (
        <li
          className={`revenue-growth-legend-item-${index + 1}`}
          style={{
            color: payload[index].color,
            fontWeight: "600",
            backgroundColor: `${payload[index].color}30`,
            padding: "0.3rem 1rem 0.3rem 2rem",
            borderRadius: "4rem",
          }}
          key={`item-${index}`}
        >
          {entry.value}
        </li>
      ))}
    </ul>
  );
};
// -----------------------------------------------






const Overview = () => {
  return (
    <div className="dashboard-overview-container">
      <div className="top-stats-grid">
        <TopStats
          data={makeStatsDataRandom(data, 8000, 4000)}
          title="Total Class Sold"
          percent="45%"
          gradient="blue" 

        />
        <TopStats
          data={makeStatsDataRandom(data, 8000, 4000)}
          title="Visited Last Month"
          percent="65%"
          gradient="sky"
        />
        <TopStats
          data={makeStatsDataRandom(data, 8000, 4000)}
          title="Total Revenue"
          percent="30%"
          gradient="teal"
        />
        <TopStats
          data={makeStatsDataRandom(data, 8000, 4000)}
          title="Total Comment"
          percent="25%"
          gradient="amber"
        />
      </div>

      <div className="bottom-stats-grid">
        <div className="monthly-stats-wrapper">
          <MonthlySoldStats
            data={makeStatsDataRandom(monthlySoldData, 8000, 2000)}
          />
        </div>
        <div className="customer-satisfaction-stats-wrapper">
          <CustomerSatisfactionStats />
        </div>
        <div className="user-activity-stats-wrapper">
          <div className="user-activity-stats-1">
            <div className="user-activity-stats-1-info">
              <div>{visitUserData.reduce((acc, c) => acc + c.visits, 0).toLocaleString()}</div>
              <div>Visits</div>
            </div>

            <div style={{ width: "100%", height: 80 }}>
              <ResponsiveContainer>
                <LineChart margin={{ top: 20 }} data={visitUserData}>
                  <Tooltip 
                  cursor={{fill: 'none'}}
                  />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="user-activity-stats-2">
            <div className="user-activity-stats-2-info">
              <div>{visitUserData.reduce((acc, c) => acc + c.users, 0).toLocaleString()}</div>
              <div>Users</div>
            </div>

            <div style={{ width: "100%", height: 80 }}>
              <ResponsiveContainer>
                <LineChart margin={{ top: 20 }} data={visitUserData}>
                  <Tooltip 
                  cursor={{fill: 'none'}}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>


          </div>
        </div>
        <div className="revenue-stats-wrapper">
          <div className="revenue-stats-info-wrapper">
            <div className="revenue-stats-info-growth">
              <div>Total Growth This Year</div>
              <div>$89122.00</div>
            </div>
            <div className="revenue-stats-info-growth-percentage">
              <TrendingUpIcon sx={{ fontSize: "30px", color: "#06b6d4" }} />{" "}
              <div>41%</div>
            </div>
          </div>

          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={barChartData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}
              >
                <Tooltip cursor={{ fill: "none" }} content={barChartTooltip} />
                <Legend
                  verticalAlign="top"
                  iconType="circle"
                  content={renderLegend}
                />
                <Bar
                  width="20px"
                  dataKey="investment"
                  stackId="a"
                  fill="#96B6C5"
                />
                <Bar
                  style={{ width: "20px" }}
                  dataKey="profit"
                  stackId="a"
                  fill="#ADC4CE"
                />
                <Bar
                  style={{ width: "20px" }}
                  dataKey="loss"
                  stackId="a"
                  fill="#EEE0C9"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
