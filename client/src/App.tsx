import React from "react";
import "./App.scss";
import { createApiClient, Ticket } from "./api";
import { Badge, Dropdown, DropdownButton } from "react-bootstrap";
import { BsFillPinAngleFill, BsFillPinFill } from "react-icons/bs";

export type AppState = {
  tickets?: Ticket[];
  search: string;
  pinTickets: Ticket[];
  sortedTickets?: Ticket[];
};

const api = createApiClient();

export class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    search: "",
    pinTickets: [],
  };

  searchDebounce: any = null;

  async componentDidMount() {
    this.setState({
      tickets: await api.getTickets(""),
    });
  }

  //Sort the tickets by title, content or unsort
  sortTickets = (sortTxt: string) => {
    let temp = this.state.tickets ? [...this.state.tickets] : null;
    if (temp) {
      switch (sortTxt) {
        case "title":
          temp.sort((t1, t2) =>
            t1["title"].toLowerCase() > t2["title"].toLowerCase()
              ? 1
              : t2["title"].toLowerCase() > t1["title"].toLowerCase()
                ? -1
                : 0
          );
          this.setState({ sortedTickets: temp });
          break;
        case "content":
          temp.sort((t1, t2) =>
            t1["content"].toLowerCase() > t2["content"].toLowerCase()
              ? 1
              : t2["content"].toLowerCase() > t1["content"].toLowerCase()
                ? -1
                : 0
          );
          this.setState({ sortedTickets: temp });
          break;
        default:
          this.setState({ sortedTickets: undefined });
      }
    }
  };

  renderTickets = (tickets: Ticket[]) => {
    // let showMore = false;

    // Display one ticket:
    const displayTicket = (ticket: Ticket, isPin: boolean) => {
      return (
        <li key={ticket.id} className="ticket">
          <div>
            <h5 className="title">{ticket.title}</h5>
            {!isPin ? (
              <BsFillPinAngleFill
                onClick={() => {
                  this.setState({
                    pinTickets: [...this.state.pinTickets, ticket],
                  });
                }}
              >
                Pin
              </BsFillPinAngleFill>
            ) : (
                <BsFillPinFill
                  onClick={() => {
                    this.setState({
                      pinTickets: this.state.pinTickets.filter(
                        (t) => t !== ticket
                      ),
                    });
                  }}
                >
                  Unpin
                </BsFillPinFill>
              )}
          </div>
          <section>{ticket.content}</section>
          <footer>
            <div className="meta-data">
              By {ticket.userEmail} |{" "}
              {new Date(ticket.creationTime).toLocaleString()}
            </div>
            <div>
              {ticket.labels &&
                ticket.labels.map((l) => (
                  <span style={{ marginLeft: "3px" }}>
                    <Badge bg="info">{l}</Badge>
                  </span>
                ))}
            </div>
          </footer>
        </li>
      );
    };

    return (
      <ul className="tickets">
        {/* Display the Pin tickets first: */}
        {this.state.pinTickets
          .slice(0)
          .reverse()
          .map((ticket) => (
            <>{displayTicket(ticket, true)}</>
          ))}
        {/* Display the other tickets, which not exists in the Pin array: */}
        {tickets.map((ticket) => (
          <>
            {!this.state.pinTickets.find((t) => t === ticket) ? (
              displayTicket(ticket, false)
            ) : (
                <></>
              )}
          </>
        ))}
      </ul>
    );
  };

  onSearch = async (val: string, newPage?: number) => {
    clearTimeout(this.searchDebounce);

    this.searchDebounce = setTimeout(async () => {
      this.setState({
        tickets: await api.getTickets(val),
      });
      this.setState({ search: val, });
    }, 300);
  };

  render() {
    const tickets = this.state.sortedTickets || this.state.tickets;
    return (
      <main>
        <h1>Tickets List</h1>
        <header>
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => this.onSearch(e.target.value)}
          />
        </header>
        <div>
          <DropdownButton id="dropdown-basic-button" title="Sort by">
            <Dropdown.Item
              onClick={() => {
                this.sortTickets("title");
              }} >  Title
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                this.sortTickets("content");
              }} > Content
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => {
              this.sortTickets("");
            }} >
              No sort
            </Dropdown.Item>
          </DropdownButton>
        </div>
        {tickets ? (
          <div className="results">Showing {tickets.length} results</div>
        ) : null}
        {tickets ? this.renderTickets(tickets) : <h2>Loading..</h2>}
      </main>
    );
  }
}

export default App;
