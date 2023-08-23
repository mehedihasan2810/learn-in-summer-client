import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomerSatisfactionTooltip from "./CustomerSatisfactionTooltip";

const data01 = [
  { name: "E. Satisfied", value: 400 },
  { name: "Satisfied", value: 300 },
  { name: "Poor", value: 300 },
  { name: "Very Poor", value: 200 },
];

const COLORS = ["#22c55e", "#4ade80", "#fb7185", "#f43f5e"];

const renderCustomizedLabel = ({ percent }) => {
  return `${(percent * 100).toFixed(0)}%`;
};

const CustomerSatisfactionStats = () => {
  return (
    <div className="customer-satisfaction-stat-container">
      <div>Customer Satisfaction</div>
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#8884d8"
              label={renderCustomizedLabel}
            >
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip content={<CustomerSatisfactionTooltip/>} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="customer-satisfaction-stat-info-wrapper">
        <div>Extremely Satisfied</div>
        <div>Satisfied</div>
        <div>Poor</div>
        <div>Very Poor</div>
      </div>
    </div>
  );
};

export default CustomerSatisfactionStats;
