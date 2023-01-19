import React from 'react';

function AdBanner({banner}) {
    
    return (
        <div>
            <div className="w-screen my-24">
                <img src={""+banner} alt="ad banner one" className="min-h-[300px] object-cover object-left"/>
            </div>
        </div>
    );
}

export default AdBanner;