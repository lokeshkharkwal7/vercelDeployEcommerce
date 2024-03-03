import React from "react";

function ToastMessage({ message, title }) {
  return <div>
    <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div className="toast-header">
    <img src="..." className="rounded me-2" alt="..." />
    <strong className="me-auto">{title}</strong>
    <small>a second ago</small>
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="toast"
      aria-label="Close"
    />
  </div>
  <div className="toast-body">{message}</div>
</div>

  </div>;
}

export default ToastMessage;
