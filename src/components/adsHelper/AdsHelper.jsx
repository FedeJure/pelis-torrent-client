import React, { useEffect } from 'react';
import "./AdsHelper.css";

const AdsHelper = () => {
    useEffect(() => {
        var uid = '281674';
        var wid = '578451';

    }, []);
    return (
        <div className="clickAds">
        <body>
            <script src="//cdn.popcash.net/show.js"></script>
            <img alt="Help me Grow!" src={process.env.PUBLIC_URL + "/grow.gif"}/>
        </body>
      </div>
    );
};

export default AdsHelper;