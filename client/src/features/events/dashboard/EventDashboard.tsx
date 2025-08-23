import DashboardFilter from "./DashboardFilter";
import DashboardList from "./DashboardList";
import Grid from "@mui/material/Grid";

export default function EventDashboard() {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8,  }}>
        <DashboardList />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardFilter/>
      </Grid>
    </Grid>
  );
}
