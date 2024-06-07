import React from "react";

function NoData() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "60vh",
      }}
    >
      <img
        src="/assets/no-data.png"
        alt="no-data-image"
        height={200}
        width={200}
      />
      <p>No Data Found</p>
    </div>
  );
}

export default NoData;
