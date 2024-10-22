import { GymTheme } from "@/MUITheme/GymTheme";
import "../MyProfile.scss";
import { Avatar, Stack, Button, TextField, ThemeProvider } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

interface ProfileUpdateProps {
    cancelAction: () => void,
    updateAction: (field: string, value: string) => void,
    saveAction: () => void,
    profile: {
        fullname: string,
        email: string,
        bio: string,
        location: string,
    }
}

const ProfileUpdate = (props: ProfileUpdateProps) => {
    
        return <ThemeProvider theme={GymTheme}>
            <form className="container">
                <Avatar src="https://www.fit.pl/img/2007/02/_max/arnie.jpg" className="avatar-image" sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
                <Stack direction="column" spacing={1} alignItems="stretch" justifyContent="space-around"></Stack>
                
                    <TextField
                        label="Full Name"
                        fullWidth
                        className="form-field"
                        variant="filled"
                        value={props.profile.fullname}
                        onChange={(e) => props.updateAction('fullname', e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        className="form-field"
                        variant="filled"
                        value={props.profile.email}
                        onChange={(e) => props.updateAction('email', e.target.value)}
                    />
                    <TextField
                        label="Location"
                        fullWidth
                        className="form-field"
                        variant="filled"
                        value={props.profile.location}
                        onChange={(e) => props.updateAction('location', e.target.value)}
                    />
                    <TextField
                        label="Bio"
                        fullWidth
                        multiline
                        rows={4}
                        className="form-field"
                        variant="filled"
                        value={props.profile.bio}
                        onChange={(e) => props.updateAction('bio', e.target.value)}
                    />

                <Stack spacing={2} direction="row" margin={1}>
                    <Button variant="outlined" color="info" onClick={props.saveAction}>Save</Button>
                    <Button variant="outlined" color="error" onClick={props.cancelAction}>Cancel</Button>
                </Stack>
            </form>
        </ThemeProvider>;
}

export default ProfileUpdate;