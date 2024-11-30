import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import AuthService from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = () => {
    // TODO: check if the user is logged in
    setIsLoggedIn(AuthService.loggedIn());
  };

  const fetchTickets = async () => {
    try {
      // TODO: retrieve tickets from the server
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      // TODO: delete the ticket and refresh the ticket list
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      console.error('Failed to delete ticket:', err);
      return Promise.reject(err);
    }
  };

  useEffect(() => {
    // TODO: check login status on component mount
    checkLogin();
  }, []);

  useEffect(() => {
    // TODO: fetch tickets if the user is logged in
    if (isLoggedIn) {
      fetchTickets();
    }
  }, [isLoggedIn]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!isLoggedIn ? (
        <div className="login-notice">
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className="board">
          <button type="button" id="create-ticket-link">
            <Link to="/create">New Ticket</Link>
          </button>
          <div className="board-display">
            {boardStates.map((status) => {
              const filteredTickets = tickets.filter(
                (ticket) => ticket.status === status
              );
              return (
                <Swimlane
                  title={status}
                  key={status}
                  tickets={filteredTickets}
                  deleteTicket={deleteIndvTicket}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;


