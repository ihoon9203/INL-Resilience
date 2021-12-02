import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { purple } from "@mui/material/colors";


const ButtonSet = ({ }) => (

    <div className="App">
        <Container maxWidth="xs" >
        <Stack direction="row" spacing={2} >
                <Button variant="contained"
                 sx={{
                    backgroundColor: "primary",
                    borderRadius: '5px',
                    color: 'white',
                    fontWeight: 'medium',
                    display: 'flex',
                    fontSize: 12,
                    alignItems: 'center',
                    
                  }}>Yes</Button>
                <Button variant="contained">No</Button>
                <Button variant="contained">N/A</Button>
                </Stack>
        </Container>
    </div>

        
);

export default ButtonSet;