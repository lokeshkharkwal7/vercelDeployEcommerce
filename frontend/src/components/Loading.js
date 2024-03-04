import React from 'react'

function Loading() {
  return (
    <>
      
      <br /> <br />
      <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )
}

export default Loading
