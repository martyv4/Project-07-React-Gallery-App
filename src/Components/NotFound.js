import React from 'react';

// NotFound component - reached if search returns 0 results
// this is stateless

const NotFound = () => {
    
    return (
        <li className="not-found">
            <h3>No Results Found</h3>
            <p>You search did not return any results.</p>
        </li>
    );
}

export default NotFound;