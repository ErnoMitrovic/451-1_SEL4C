import { Typography, Stack } from "@mui/material";
import { Sel4cCard } from "../components/Sel4cCard";

export default function ForgetPasswordSendEmail() {
    return (
        <Sel4cCard>
            <Stack minWidth='xs' width={0.8}>
                <Typography variant="h4" textAlign='center'>
                    Forget password?
                </Typography>
            </Stack>
        </Sel4cCard>
    );
}