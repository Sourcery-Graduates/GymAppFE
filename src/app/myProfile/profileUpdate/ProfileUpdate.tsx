import { GymTheme } from "@/MUITheme/GymTheme";
import "../MyProfile.scss";
import { Avatar, Stack, Button, TextField, ThemeProvider } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

export interface Profile {
    firstname: string;
    lastname: string;
    username: string;
    bio: string;
    location: string;
}

interface ProfileUpdateProps {
    cancelAction: () => void,
    saveAction: (profile: Profile) => void,
    profile: Profile
}

const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('Firstname is required')
        .min(3, 'Firstname must be at least 3 characters'),
    lastname: Yup.string()
        .required('Lastname is required')
        .min(3, 'Lastname must be at least 3 characters'),
    username: Yup.string()
        .required('Username is required'),
    location: Yup.string()
        .required('Location is required'),
    bio: Yup.string(),
});

const ProfileUpdate = (props: ProfileUpdateProps) => {
    

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: props.profile,
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data: Profile) => {
        props.saveAction(data);
    };

    const onCancel = () => {
        reset(props.profile);
        props.cancelAction();
    }
    
        return <ThemeProvider theme={GymTheme}>
            <form className="container" onSubmit={handleSubmit(onSubmit)}>
                <Avatar src="https://www.fit.pl/img/2007/02/_max/arnie.jpg" className="avatar-image" sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>                
                <TextField
                        label="Firstname"
                        fullWidth
                        className="form-field"
                        variant="filled"
                        {...register('firstname')}
                        error={!!errors.firstname}
                    />
                <TextField
                    label="Lastname"
                    fullWidth
                    className="form-field"
                    variant="filled"
                    {...register('lastname')}
                    error={!!errors.lastname}
                />
                    <TextField
                        label="Username"
                        fullWidth
                        className="form-field"
                        variant="filled"
                        {...register('username')}
                        error={!!errors.username}
                    />
                    <TextField
                        label="Location"
                        fullWidth
                        className="form-field"
                        variant="filled"
                        {...register('location')}
                        error={!!errors.location}
                    />
                    <TextField
                        label="Bio"
                        fullWidth
                        multiline
                        rows={4}
                        className="form-field"
                        variant="filled"
                        {...register('bio')}
                        error={!!errors.bio}
                    />

                <Stack spacing={2} direction="row" margin={1}>
                    <Button variant="outlined" color="info" type="submit">Save</Button>
                    <Button variant="outlined" color="error" onClick={onCancel}>Cancel</Button>
                </Stack>
            </form>
        </ThemeProvider>;
}

export default ProfileUpdate;
