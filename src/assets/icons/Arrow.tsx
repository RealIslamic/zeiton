import React from 'react';
const Arrow = ({ width = 24, height = 24, className = '', fill = 'white' }) => {
    return (
        <svg
            fill={fill}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
        </svg>
    );
};

export default Arrow;
