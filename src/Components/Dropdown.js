import React, { useState } from 'react';

// Couldn't implement this in the time frame, had to debug this

const Dropdown = ({ data, setData }) => { 
    const [isOpen, setIsOpen] = useState(false);
    const [groupingOption, setGroupingOption] = useState('');
    const [orderingOption, setOrderingOption] = useState('');

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleGroupingChange = (option) => {
        setGroupingOption(option);
        groupData(option);
        setIsOpen(false); 
    };

    const handleOrderingChange = (option) => {
        setOrderingOption(option);
        orderData(option);
        setIsOpen(false); 
    };

    const groupData = (groupBy) => {
        const groupedData = data.tickets.reduce((acc, ticket) => {
            const key = ticket[groupBy]; 
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(ticket);
            return acc;
        }, {});
        setData(groupedData);
    };

    const orderData = (orderBy) => {
        const sortedData = [...data.tickets].sort((a, b) => {
            if (orderBy === 'Priority') {
                return a.priority - b.priority;
            } else if (orderBy === 'User') {
                return a.userId.localeCompare(b.userId);
            } else if (orderBy === 'Status') {
                return a.status.localeCompare(b.status);
            }
            return 0;
        });

        setData(sortedData);
    };

    return (
        <div className="dropdown-container">
            <div className="dropdown-trigger" onClick={togglePopup}>
                <img src="./Display.svg" alt="Icon" className="dropdown-icon" />
                <span>{groupingOption || 'Select an option'}</span>
            </div>
            {isOpen && (
                <div className="popup">
                    <h3>Group By</h3>
                    <div className="grouping-options">
                        <div onClick={() => handleGroupingChange('priority')}>Priority</div>
                        <div onClick={() => handleGroupingChange('userId')}>User</div>
                        <div onClick={() => handleGroupingChange('status')}>Status</div>
                    </div>
                    <h3>Order By</h3>
                    <div className="ordering-options">
                        <div onClick={() => handleOrderingChange('Priority')}>Priority</div>
                        <div onClick={() => handleOrderingChange('User')}>User</div>
                        <div onClick={() => handleOrderingChange('Status')}>Status</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
