import { Box, Button } from '@mui/material'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function DeletePhoto() {
  return (
     <Box sx={{ position: "relative" }}>
      <Button sx={{cursor:'pointer', position:'relative'}}>
        <DeleteForeverOutlinedIcon
          sx={{ fontSize: 35, position:'absolute', color:'#DC143C'}}
        />
      </Button>
    </Box>
  )
}
