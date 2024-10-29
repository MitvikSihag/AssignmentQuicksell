import React, { useState, useEffect } from 'react';
import './app.css';
import Card from './Components/Card';

function App() {
  const [data, setData] = useState({ tickets: [], users: [] });
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Priority');

  async function getProductList() {
    setLoading(true);
    const temp = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    const product = await temp.json();

    if (product) {
      setLoading(false);
      setData(product);
      console.log(product);
    }
  }

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    const savedOption = localStorage.getItem('selectedOption');
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, []);

  const statusIcons = {
    "Todo": "./To-do.svg",
    "In progress": "./inProgress.svg",
    "Backlog": "./Backlog.svg",
    "Done": "./Done.svg",
    "Cancelled": "./Cancelled.svg"
  };

  const priorityIcons = {
    4: "./UrgentPriorityColour.svg",
    3: "./PriorityHigh.svg",
    2: "./PriorityMedium.svg",
    1: "./PriorityLow.svg",
    0: "./NoPriority.svg"
  };

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
    localStorage.setItem('selectedOption', newValue);
  };

  const renderPriorityColumns = () => {
    const priorities = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No Priority'
    };

    return Object.entries(priorities).map(([priority, title]) => {
      const count = data.tickets.filter(ticket => ticket.priority === parseInt(priority)).length;
      const priorityIcon = priorityIcons[priority];

      return (
        <div className="column" key={priority}>
          <div className="columnContainer">
            <h2 className="column-heading">
              <img src={priorityIcon} alt={`${title} Icon`} className="icon" />
              {title} ({count})
            </h2>
            <div className="addContainer">
              <img src="./add.svg" alt="Add" />
              <img src="./3 dot menu.svg" alt="Menu" />
            </div>
          </div>
          {data.tickets
            .filter(ticket => ticket.priority === parseInt(priority))
            .map(ticket => (
              <div key={ticket.id}>
                <Card
                  ID={ticket.id}
                  Title={ticket.title}
                  Status={ticket.status}
                  Priority={ticket.priority}
                  User={data.users[parseInt(ticket.userId[ticket.userId.length - 1], 10) - 1]}
                  Method={"Priority"}
                />
              </div>
            ))}
        </div>
      );
    });
  };

  const renderUserColumns = () => {
    return data.users.map(user => {
      const userTasks = data.tickets.filter(ticket => ticket.userId === user.id);
      const count = userTasks.length;

      return (
        <div className="column" key={user.id}>
          <div className="columnContainer">
            <h2 className="column-heading">{user.name} ({count})</h2>
            <div className="addContainer">
              <img src="./add.svg" alt="Add" />
              <img src="./3 dot menu.svg" alt="Menu" />
            </div>
          </div>
          {userTasks.map(ticket => (
            <div key={ticket.id}>
              <Card
                ID={ticket.id}
                Title={ticket.title}
                Status={ticket.status}
                Priority={ticket.priority}
                User={user}
                Method={"User"}
              />
            </div>
          ))}
        </div>
      );
    });
  };

  const renderStatusColumns = () => {
    const statuses = ['Todo', 'In progress', 'Backlog', 'Done', 'Cancelled'];

    return statuses.map(status => {
      const count = data.tickets.filter(ticket => ticket.status === status).length;
      const statusIcon = statusIcons[status];

      return (
        <div className="column" key={status}>
          <div className="columnContainer">
            <h2 className="column-heading">
              <img src={statusIcon} alt={`${status} Icon`} className="icon" />
              {status} ({count})
            </h2>
            <div className="addContainer">
              <img src="./add.svg" alt="Add" />
              <img src="./3 dot menu.svg" alt="Menu" />
            </div>
          </div>
          {data.tickets
            .filter(ticket => ticket.status === status)
            .map(ticket => (
              <div key={ticket.id}>
                {console.log(status)}
                <Card
                  ID={ticket.id}
                  Title={ticket.title}
                  Status={ticket.status}
                  Priority={ticket.priority}
                  User={data.users[parseInt(ticket.userId[ticket.userId.length - 1], 10) - 1]}
                  Method={"Status"}
                />
              </div>
            ))}
        </div>
      );
    });
  };

  const renderColumns = () => {
    switch (selectedOption) {
      case 'Priority':
        return renderPriorityColumns();
      case 'User':
        return renderUserColumns();
      case 'Status':
        return renderStatusColumns();
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="dropdown-container">
          <img src="./Display.svg" alt="Icon" />
          <select value={selectedOption} onChange={handleSelectChange} className="dropdown">
            <option value="Priority">Priority</option>
            <option value="User">User</option>
            <option value="Status">Status</option>
          </select>
          <img src="./down.svg" alt="Icon" />
        </div>
      </header>

      <main className="main-content">
        {renderColumns()}
      </main>
    </div>
  );
}

export default App;
