import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip/CustomTooltip";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { createPortal } from "react-dom";

const MonthlySoldStats = ({ data }) => {
  console.log(data);
  return (
    <div className="monthly-sold-stats-container">
      <div className="monthly-stats-desc-wrapper">
        <div className="monthly-stats-desc-left">
          <div>Monthly Report</div>
          <p>Class wise monthly sales report</p>
        </div>

        <div className="monthly-stats-desc-right">
          <div>
            <TrendingUpIcon sx={{ fontSize: 33, color: "#06b6d4" }} /> 37890.00
          </div>
          <div>
            {" "}
            <TrendingUpIcon sx={{ fontSize: 33, color: "#06b6d4" }} /> 70%
          </div>
        </div>
      </div>

      <div className="monthly-stats-percentage-container">
        <div>Total</div>
        <div className="monthly-stats-percentage-wrapper">
          <div> Drum 7021</div>
          <div> Guiter 7021</div>
          <div> Violin 7021</div>
          <div> Piano 7021</div>
        </div>
      </div>

      <div style={{ width: "100%", height: 250 }}>

        {/* gradient for svg */}
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
            <linearGradient id={`monthly-sold-stats-gradient-1`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-stop-1)" />
              {/* <stop offset="50%" stopColor="#224488" /> */}
              <stop offset="100%" stopColor="var(--color-stop-2)" />
            </linearGradient>
          </svg>,
          document.body
        )}

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
            <linearGradient id={`monthly-sold-stats-gradient-2`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-stop-1)" />
              {/* <stop offset="50%" stopColor="#224488" /> */}
              <stop offset="100%" stopColor="var(--color-stop-2)" />
            </linearGradient>
          </svg>,
          document.body
        )}
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
            <linearGradient id={`monthly-sold-stats-gradient-3`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-stop-1)" />
              {/* <stop offset="50%" stopColor="#224488" /> */}
              <stop offset="100%" stopColor="var(--color-stop-2)" />
            </linearGradient>
          </svg>,
          document.body
        )}
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
            <linearGradient id={`monthly-sold-stats-gradient-4`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--color-stop-1)" />
              {/* <stop offset="50%" stopColor="#224488" /> */}
              <stop offset="100%" stopColor="var(--color-stop-2)" />
            </linearGradient>
          </svg>,
          document.body
        )}
        {/* ------------------------ */}

        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <Tooltip content={<CustomTooltip data={data} />} />
            <Area
              type="monotone"
              dataKey="drum"
              stackId="1"
              stroke="#06b6d4"
              fill={`url(#monthly-sold-stats-gradient-1) #447799`}
            />
            <Area
              type="monotone"
              dataKey="guiter"
              stackId="1"
              stroke="#ec4899"
              fill={`url(#monthly-sold-stats-gradient-2) #447799`}
            />
            <Area
              type="monotone"
              dataKey="violin"
              stackId="1"
              stroke="#14b8a6"
              fill={`url(#monthly-sold-stats-gradient-3) #447799`}
            />
            <Area
              type="monotone"
              dataKey="piano"
              stackId="1"
              stroke="#3b82f6"
              fill={`url(#monthly-sold-stats-gradient-4) #447799`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlySoldStats;
