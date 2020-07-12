import spinner from "../../default_files/images/Spinner-1s-200px.svg";
import React from "react";

let Preloader = (props) => {
    return <div>
        <img src={spinner} alt="fetching"/>
    </div>
}

export default Preloader;