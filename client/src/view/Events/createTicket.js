import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Segment, Grid, Confirm } from "semantic-ui-react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { config } from "../../common/config/config";

const CreateTicket = (props) => {
  //event id got from the response from create event page
  const { state } = props.location;
  const path = config();
  console.log(state);
  const event_id = state[0];
  // console.log(state[1]);

  const [event, setEvent] = useState({
    name: state ? state[1].name.html : "",
    start: state ? state[1].start.utc : "",
    end: state ? state[1].end.utc : "",
    currency: state ? state[1].currency : "",
    online_event: state ? state[1].online_event : false,
    description: state ? state[1].description.html : "",
    ticketInfo: {},
  });

  const [isDisable, setDisable] = useState(true);

  const [ticket, setTicket] = useState({
    name: "General Entry",
    free: true,
    quantity_total: 5,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const ticket_data = { ticket_class: ticket };

    setEvent({
      ...event,
      ticketInfo: ticket,
    });

    console.log(ticket_data);
    axios
      .post(
        `https://www.eventbriteapi.com/v3/events/${event_id}/ticket_classes/?token=2SWITQPH72SPNCSRK7OW`,
        ticket_data
      )
      .then((response) => {
        console.log(response);
        alert("tickets information saved!");
      })
      .catch((error) => {
        console.log(error.response);
      });
    setDisable(!isDisable);
  };

  const publish = () => {
    console.log(event);
    axios
      .post(path + "event", event)
      .then((res) => {
        res.send("stored data");
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .post(
        `https://www.eventbriteapi.com/v3/events/${event_id}/publish/?token=2SWITQPH72SPNCSRK7OW`
      )
      .then((response) => {
        console.log(response);
        alert("Event has been pushlished!");
      })
      .catch((error) => {
        console.log(error.response);
      });
    props.history.push("/events");
  };

  const handleFormChange = ({ target: { name, value } }) => {
    setTicket({
      ...ticket,
      [name]: value,
    });
  };

  const handleFormCancel = () => {
    props.history.push("/events");
  };

  return (
    <div>
      <Helmet>
        <title>Create Ticket | Professional Development Club</title>
      </Helmet>
      <Segment>
        <Form onSubmit={handleFormSubmit} autoComplete="off">
          <Form.Field>
            <h3>Number of Tickets</h3>
            <input
              name="quantity_total"
              value={ticket.quantity_total}
              onChange={handleFormChange}
              placeholder="Please Enter Number Of Tickets"
              type="number"
              style={{ borderColor: "#000" }}
            />
          </Form.Field>
          <Button positive type="submit">
            Save and Continue
            {/* {state ? "Update" : "Submit"} */}
          </Button>
          <Button onClick={handleFormCancel} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
      <Button disabled={isDisable} onClick={publish} positive>
        Publish
      </Button>
    </div>
  );
};

export default CreateTicket;
