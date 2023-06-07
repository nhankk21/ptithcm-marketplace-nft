import { ContentCopy } from "@mui/icons-material";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
    Paper,
    IconButton,
    useTheme,
} from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
    secreteKey: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 *
 * @param {Props} props
 * @return {JSX.Element}
 */
function ConfirmDialog(props: Props): JSX.Element {
    const [activeStep, setActiveStep] = React.useState(0);
    const theme = useTheme();
    const handleClose = () => {
        props.setOpen(false);
    };
    const navigate = useNavigate();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                {"Complete your account"}
            </DialogTitle>
            <DialogContent>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Your secreate key</StepLabel>
                        <StepContent>
                            <Typography variant="h2" sx={{ fontSize: "small" }}>
                                This is your secrete key, plese save it some
                                where to reset your password if needed!
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color={theme.palette.success.light}
                            >
                                {props.secreteKey}{" "}
                                <IconButton
                                    color="primary"
                                    aria-label="copy to clipboard"
                                    component="label"
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            props.secreteKey
                                        );
                                        toast.success(
                                            "The private key is copied to your clipboard!"
                                        );
                                    }}
                                >
                                    <ContentCopy />
                                </IconButton>
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Next
                                    </Button>
                                    <Button
                                        disabled={true}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Privacy policy</StepLabel>
                        <StepContent>
                            <Typography variant="body1">
                                NFTs is committed to protecting your privacy. We
                                have prepared this Privacy Policy to describe to
                                you our practices regarding the Personal Data
                                (as defined below) we collect, use, and share in
                                connection with the OpenSea website, mobile app,
                                and other software provided on or in connection
                                with our services, as described in our Terms of
                                Service (collectively, the “Service”). “NFT” in
                                this Privacy Policy means a non-fungible token
                                or similar digital item implemented on a
                                blockchain (such as the Ethereum blockchain),
                                which uses smart contracts to link to or
                                otherwise be associated with certain content or
                                data.
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Next
                                    </Button>
                                    <Button
                                        disabled={false}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel
                            optional={
                                <Typography variant="caption">
                                    Last step
                                </Typography>
                            }
                        >
                            All done!
                        </StepLabel>
                        <StepContent>
                            <Typography variant="h2">
                                Contrgratulations
                            </Typography>
                            <Typography variant="subtitle1">
                                You account created successfully!
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Finish
                                    </Button>
                                    <Button
                                        disabled={false}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                </Stepper>
            </DialogContent>
            <DialogActions>
                {activeStep === 3 && (
                    <Paper square elevation={0} sx={{ p: 3, width: "100%" }}>
                        <Typography>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/")}
                            sx={{ mt: 1, mx: "auto" }}
                        >
                            Back to Home
                        </Button>
                    </Paper>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
