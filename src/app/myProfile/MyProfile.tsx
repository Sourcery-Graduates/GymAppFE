import "./MyProfile.scss";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MyProfile = () => {
    return <div className='my_profile'>
        <div className="container">
            <Avatar src="https://www.fit.pl/img/2007/02/_max/arnie.jpg" className="avatar-image" sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
            <h3 className="fullname-text">John Doe</h3>
            <h4 className="username-text">john.doe.gym@gmail.com</h4>
        
            <Box display="flex" alignItems="center" my={2}>
                <LocationOnIcon sx={{ mr: 1}} />
                <Typography variant="body2">
                    Los Angeles, CA
                </Typography>
            </Box>

            <Box my={2}>
                <Typography variant="body2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur a totam eaque minima exercitationem sunt laudantium repudiandae esse ut assumenda! Consectetur doloremque, repellat soluta repudiandae quos delectus veritatis totam eius.
                </Typography>
            </Box>

            <Stack spacing={2} direction="row" margin={1}>
                <Button variant="outlined" color="error">Logout</Button>
                <Button variant="outlined" color="warning">Edit</Button>
            </Stack>

        </div>
    </div>;
}

export default MyProfile;