import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip/CustomTooltip";
import { createPortal } from "react-dom";

const TopStats = ({ data, title, gradient }) => {
  return (
    <>
      <div className="overview-top-stat-container">
        <div className="overview-info-wrapper">
          <div className="overview-stat-count">
            <div className="overview-num">
              {data.reduce((acc, c) => acc + c.class_sold, 0).toLocaleString()}
            </div>
            <div className="overview-num-msg">{title}</div>
          </div>
          <div className="overview-stat-percentage">50%</div>
        </div>

        <div
          className="top-stat-chart-container"
          style={{ width: "100%", height: 100 }}
        >
          {/* linear gradient for chart */}
          {createPortal(
            <svg
              style={{
                width: 0,
                height: 0,
                position: "absolute",
              }}
              aria-hidden="true"
              focusable="false"
            >
              <linearGradient
                id={`my-cool-${gradient}-gradient`}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="0%" stopColor="var(--color-stop-1)" />
                {/* <stop offset="50%" stopColor="#224488" /> */}
                <stop offset="100%" stopColor="var(--color-stop-2)" />
              </linearGradient>
            </svg>,
            document.body
          )}
          {/* --------------------------- */}

          <ResponsiveContainer>
            <AreaChart
              data={data}
              style={{ borderRadius: "1rem" }}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <Tooltip content={<CustomTooltip data={data} />} />
              <Area
                className="area-chart-component"
                type="monotone"
                dataKey="class_sold"
                stroke={`url(#my-cool-${gradient}-gradient) #447799`}
                fill={`url(#my-cool-${gradient}-gradient) #447799`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default TopStats;
