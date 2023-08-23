import "./CustomTooltip.css";

const CustomTooltip = ({ active, payload, label, data }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.4rem",
          overflow: "hidden",
          fontWeight: "500",
          paddingBlockEnd: '0.2rem'
        }}
      >
        <p
          style={{
            backgroundColor: "#eceff1",
            padding: "0.4rem 1rem",
           
          }}
        >
          {data[label].month}
        </p>
        {payload.reverse().map((obj, index) => (
          <p
            key={index}
            style={{
              color: payload[index].stroke,
              padding: "0.2rem 1rem",
            }}
          >{`${payload[index].dataKey} : ${obj.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
