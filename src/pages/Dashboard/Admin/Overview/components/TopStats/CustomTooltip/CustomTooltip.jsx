// import './CustomTooltip.css';

const CustomTooltip = ({ active, payload, label, data }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.4rem",
          overflow: "hidden",
        }}
      >
        <p
          style={{
            backgroundColor: "#eceff1",
            padding: "0.3rem 1rem",
            fontWeight: "500",
          }}
        >
          {data[label].month}
        </p>
        <p
          style={{
            padding: "0.6rem 1rem",
          }}
        >{`Sold : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
