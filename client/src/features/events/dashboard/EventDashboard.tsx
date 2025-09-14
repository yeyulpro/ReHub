import { Button } from "@mui/material";
import { useEvents } from "../../../lib/hooks/useEvents";
import DashboardFilter from "./DashboardFilter";
import DashboardList from "./DashboardList";
import Grid from "@mui/material/Grid";

export default function EventDashboard() {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = useEvents();

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 8 }}>
        <DashboardList />
        <Button
          onClick={() => {
            fetchNextPage();
          }}
          sx={{ my: 2, float: "right" }}
          variant="contained"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          See More
        </Button>
      </Grid>
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{ position: "sticky", top: 110, alignSelf: "flex-start" }}
      >
        <DashboardFilter />
      </Grid>
    </Grid>
  );
}
