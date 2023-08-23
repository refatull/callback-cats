import React from "react";
import { useNavigate } from "react-router-dom";

function Errorpage() {
  interface Style {
    color: string;
    fontSize: string;
    marginLeft: string;
    marginRight: string;
    marginTop: string;
  }
  const errStyle: Style = {
    color: "red",
    fontSize: "72px",
    marginLeft: "400px",
    marginRight: "400px",
    marginTop: "50px",
  };

  const nav = useNavigate();

  const handleSubmit = () => {
    nav("/");
  };

  return (
    <>
      <h1 style={errStyle}>
        {" "}
        <strong>Error 404: Page NOT Found</strong>
      </h1>
      <button
        type="button"
        className="mx-[800px] my-[50px] w-[10%] rounded bg-red-300 py-5 text-white hover:bg-red-400 shadow-md"
        onClick={handleSubmit}
      >
        Go Back to Home
      </button>
    </>
  );
}

export default Errorpage;
