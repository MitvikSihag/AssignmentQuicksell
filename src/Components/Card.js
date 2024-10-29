import React from 'react';
import './card.css';

const Card = (props) => {
    const getInitials = (name) => {
        const names = name.split(' ');
        const initials = names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
        return initials.toUpperCase();
    };

    const priorityIcons = {
        4: "./UrgentPriorityColour.svg",
        3: "./PriorityHigh.svg",
        2: "./PriorityMedium.svg",
        1: "./PriorityLow.svg",
        0: "./NoPriority.svg"
    };

    const statusIcons = {
        "Todo": "./To-do.svg",
        "In Progress": "./inProgress.svg",
        "Backlog": "./Backlog.svg",
        "Done": "./Done.svg",
        "Cancelled": "./Cancelled.svg"
    };

    const priorityIcon = priorityIcons[props.Priority] || "./NoPriority.svg";
    const statusIcon = statusIcons[props.Status] || null;
    {console.log(props.Status)}

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-id">{props.ID}</span>
                {
                props.Method !== "User" &&
                <div className="user-initials">
                    {getInitials(props.User.name)} 
                </div>
                }
            </div>
            {/* <h2 className="card-title">{props.Title}</h2> */}
            <div className="card-title-container">
                {props.Method !== "Status" && statusIcon && <img src={statusIcon} alt={`${props.Status} Icon`} className="status-icon" />}
                <h2 className="card-title">{props.Title}</h2>
            </div>
            <div className="card-footer">
                {props.Method !== "Priority" &&
                <img src={priorityIcon} alt="Priority Icon" className="icon" /> }
                <img src = "./To-do.svg" className="icon"/> 
                <span className="feature-request">Feature Request</span>
            </div>
        </div>
    );
};

export default Card;
