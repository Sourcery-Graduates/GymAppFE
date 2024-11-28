import { AlertColor } from "@mui/material/Alert";

export interface AppAlertState {
    open: boolean;
    text: string;
    severity: AlertColor;
}