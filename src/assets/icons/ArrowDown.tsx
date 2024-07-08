import React from 'react';

const ArrowDown = ({ className = '', fill = '#757776', width = 24, height = 24 }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill={fill}
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M16.59 8.29492L12 12.8749L7.41 8.29492L6 9.70492L12 15.7049L18 9.70492L16.59 8.29492Z"
                fill={fill}
            />
        </svg>
    );
};
export default ArrowDown;
