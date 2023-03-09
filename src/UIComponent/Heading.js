import React from "react";

function Heading(props) {
  return (
    <>
      <div className="container flex justify-center items-center text-3xl lg:text-5xl text-white">
        {props.heading}
      </div>
    </>
  );
}

export default Heading;
