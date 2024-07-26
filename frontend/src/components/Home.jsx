import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-16 w-full mt-60'>
            <Typography variant="h4">
                Welcome to our automated CRM system. Improve your workflow with our seamless features.
            </Typography>
            <Button color="secondary" component={Link} to="/allLead">Start by discovering Lead List</Button>
        </div>
    )
}

export default Home;