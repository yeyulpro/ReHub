import {
  Box,
  Typography,
  Card,
  CardContent,

  Avatar,
 
  CircularProgress,
  TextField,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { ChatComment } from "../../../lib/types";
import { useComments } from "../../../lib/hooks/useComments";
import { FieldValues, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

const EventDetailsChat = observer(function EventDetailsChat() {
  const { id } = useParams();
  const { commentStore } = useComments(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const addComment = async (data: FieldValues) => {
    try {
      await commentStore.hubConnection?.invoke("SendComment", {
        eventId: id,
        body: data.body,
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(addComment)();
    }
  };
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
          <div>
            <form >
              <TextField
                {...register("body", { required: true })}
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                placeholder="Enter your comment (Enter to submit, SHIFT + Enter for new line)"
                onKeyDown={handleKeyPress}
                slotProps={{
                  input: {
                    endAdornment: isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : null,
                  },
                }}
              />
            
            </form>
          </div>

          <Box sx={{ height: 400, overflow: "auto" }}>
            {commentStore.comments.map((comment: ChatComment) => (
              <Box key={comment.id} sx={{ display: "flex", my: 2 }}>
                <Avatar
                  src={comment.imageUrl ?? "/images/person.png"}
                  alt={comment.displayName}
                  sx={{ mr: 2 }}
                />
                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center" gap={3}>
                    <Typography
                      component={Link}
                      to={`/profiles/${comment.userId}`}
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", textDecoration: "none" }}
                    >
                      {comment.displayName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(comment.createdAt).toLocaleString()}{" "}
                    </Typography>
                  </Box>

                  <Typography sx={{ whiteSpace: "pre-wrap" }}>
                    {comment.body}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
});
export default EventDetailsChat;
