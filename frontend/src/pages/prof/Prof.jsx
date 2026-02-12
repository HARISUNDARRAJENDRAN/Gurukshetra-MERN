import React from 'react';

const Prof = () => {
    return (
        <div>
            <h1>Professor page</h1>
            <div>
                {<Outlet/>}
            </div>
        </div>
    )
}

export default Prof;
