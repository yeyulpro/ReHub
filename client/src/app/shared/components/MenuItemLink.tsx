import { Typography } from '@mui/material'
import { ReactNode } from 'react'

import { NavLink } from 'react-router'

export default function MenuItemLink({children, to}:{children:ReactNode, to:string}) {
  return (
    <Typography
        component={NavLink}
        to={to}
        sx={{fontsiz:"1.6rem", textTransform:'uppercase', fondWeight:'bold', textDecoration: "none",color:'#555555' ,'&.active':{
            color:'#00BFFF'
        }}}
    >
        {children}
    </Typography>
  )
}
