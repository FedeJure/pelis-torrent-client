import React from "react"
import Routes from "../../services/router";
import { useHistory } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  
    const history = useHistory();
    return (
        <div className="logo" onClick={() => history.push(Routes.getHomeRoute())}>
            <img className="logoImage" src={process.env.PUBLIC_URL + "/logo.svg"}/>
            <img className="logoName" src={process.env.PUBLIC_URL + "/name.svg"}/>
        </div>
    );
};

export default Logo;