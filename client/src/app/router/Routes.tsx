import { createBrowserRouter } from "react-router";
import App from "../layout/App";

import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/form/EventForm";

import EventDetailPage from "../../features/events/details/EventDetailPage";
import MainHome from "../layout/MainHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainHome />,
    children: [{ path: "/", element: <HomePage /> }],
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "events", element: <EventDashboard /> },
      { path: "events/:id", element: <EventDetailPage /> },
      { path: "createEvent", element: <EventForm key={"create"} /> },
      { path: "manage/:id", element: <EventForm /> },
      { path: "about", element: <HomePage /> },
    ],
  },
]);
