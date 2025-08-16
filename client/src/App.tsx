import { useEffect, useState } from "react";
import { Event } from "./lib/types";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import axios from "axios";

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios.get<Event[]>("https://localhost:5002/api/events")
      .then((res) => setEvents(res.data));

    return () => {};
  }, []);
  console.log(events);
  return (
    <>
      <List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
        {events.map((evt) => (
          <React.Fragment key={evt.id}>
            <ListItem>
              <ListItemText primary={evt.title} secondary={evt.description} />
            </ListItem>
            {<Divider />}
          </React.Fragment>
        ))}
      </List>
    </>
  );
}

export default App;
