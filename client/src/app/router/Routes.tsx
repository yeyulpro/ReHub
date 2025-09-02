import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/form/EventForm";
import EventDetailPage from "../../features/events/details/EventDetailPage";
// import MainHome from "../layout/MainHome";
import ErrorStatus from "../../features/errors/ErrorStatus";
import { LoginForm } from "../../account/LoginForm";
import RequireAuth from "./RequireAuth";
import { RegisterForm } from "../../account/RegisterForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
   
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "events", element: <EventDashboard /> },
          { path: "events/:id", element: <EventDetailPage /> },
          { path: "createEvent", element: <EventForm key={"create"} /> },
          { path: "manage/:id", element: <EventForm /> },
        ],
      },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      
    ],
  },

  { path: "bad-request", element: <ErrorStatus /> },
  { path: "unauthorized", element: <ErrorStatus /> },
  { path: "forbidden", element: <ErrorStatus /> },
  { path: "not-found", element: <ErrorStatus /> },
  { path: "server-error", element: <ErrorStatus /> },
  { path: "*", element: <ErrorStatus /> },
]);
