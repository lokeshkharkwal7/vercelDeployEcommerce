import React from "react";

function AdminProductCard({
  name,
  price,
  images,
  category,
  psubcategory,
  ptitle,
  pdescription,
  porigin,
}) {
  return (
    <div>
      <div
        className="card mb-3 text-sm bg-danger text-light mx-1"
        style={{ maxWidth: 400, borderRadius: "5%" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={images}
              className="img-fluid rounded-start mt-1 mx-1"
              alt="..."
              style={{
                borderRadius: "10%",
                maxHeight: "8rem",
                maxWidth: "10rem",
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text  ">{pdescription}</p>
              <p className="card-text">
                <small className="text-light">Rs {price}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductCard;
