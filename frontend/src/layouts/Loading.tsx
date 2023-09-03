import React from 'react';

const Loading = () => {
    return (
        // rectangle animation
        <div className="animate-pulse flex space-x-4 h-[calc(100vh-14rem)] overflow-y-scroll overflow-visible">
            <div className="flex-1 space-y-6 py-1">
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
                <div className="h-4 bg-gray-400 rounded mr-10"></div>
            </div>
        </div>
    );
};

export default Loading;