import React from "react"
import Routes from "../../services/router";
import { useHistory } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
    const history = useHistory();
    return (
        <div className="logo" onClick={() => history.push(Routes.getHomeRoute())}>
            <img src={process.env.PUBLIC_URL + "/logo.svg"}/>
            <div className="logo_detail">
                <h1>Seta</h1>
            </div>
        </div>
    );
};

export default Logo;