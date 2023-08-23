const CustomerSatisfactionTooltip = ({ active, payload }) => {
  console.log(payload);
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#f8fafc",
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
          {payload[0].name}
        </p>
        <p
          style={{
            padding: "0.6rem 1rem",
            fontWeight: "500",
          }}
        >{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomerSatisfactionTooltip;
