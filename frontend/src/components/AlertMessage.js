import React, { useEffect, useState } from "react";

function AlertMessage({ message }) {
  const [status, setStatus] = useState("Show");

  useEffect(() => {
    setTimeout(() => {
      setStatus("Not Show");
    }, 1000);
  });
  return (
    <div>
      {status === "Show" ? (
        <div
          className="alert alert-success fixed-top text-center fs-6"
          role="alert"
        >
          <i className="fa-solid fa-check mx-3"></i>
          {message}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AlertMessage;
