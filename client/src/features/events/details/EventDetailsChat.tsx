import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Hub_Event } from "../../../lib/types";

type Props = {
  event: Hub_Event;
};
export default function EventDetailsChat({ event }: Props) {
  console.log(event)
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          bgcolor: "primary.main",
          color: "white",
          padding: 2,
        }}
      >
        <Typography variant="h6">Chat about this event</Typography>
      </Box>
      <Card>
        <CardContent>
          <Box>
            <Box component="form">
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
              />
            </Box>
          </Box>

          <Box>
            <Box sx={{ display: "flex", my: 2 }}>
              <Avatar
                src={"/images/user.png"}
                alt={"user image"}
                sx={{ mr: 2 }}
              />
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" gap={3}>
                  <Typography
                    component={Link}
                    to={`/profiles/username`}
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", textDecoration: "none" }}
                  >
                    Bob
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    2 hours ago
                  </Typography>
                </Box>

                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  Comment goes here
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
