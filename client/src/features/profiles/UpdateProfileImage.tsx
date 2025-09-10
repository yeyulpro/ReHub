import { Box, Button } from "@mui/material";
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';

type Props = {
  selected: boolean;
};

export default function ButtonForProfileImage({ selected }: Props) {
  return (
    <Box sx={{ position: "relative" }}>
      <Button sx={{cursor:'pointer', position:'relative'}}>
        <PortraitOutlinedIcon 
          sx={{ fontSize: 35, color: selected ? "#E65100" : "#A9A9A9" , position:'absolute'}}
        />
      </Button>
    </Box>
  );
}
