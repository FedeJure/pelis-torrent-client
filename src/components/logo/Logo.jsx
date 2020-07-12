import React from "react"
import Routes from "../../services/router";
import { useHistory } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
    const history = useHistory();
    return (
        <div className="logo" onClick={() => history.push(Routes.getHomeRoute())}>
            <h2>JeyDE</h2>
            <span>Just Digital Entertainment</span>
        </div>
    );
};

export default Logo;