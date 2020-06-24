import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Button, Fade, Modal, FormControl, InputLabel, Input, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    submitButton: {
        marginRight: theme.spacing(2)
    },
    submitContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(4)
    }
}));

export default function ModalButton(props: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setNameField] = React.useState("");
    const [file, setFileField] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLoading(false);
    };

    function handleNameChange(event:any) {
        setNameField(event.target.value);
    }

    const handleFileChange = (event: any) => {
        setFileField(event.target.files[0]);
    }

    const onSubmit = (event: any) => {
        setLoading(true);
        event.preventDefault();
        props.onSubmit({ name: name, file: file }, handleClose);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                <AddIcon />
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form name="itemForm" autoComplete="off" onSubmit={onSubmit}>
                            <h2>Create new item</h2>
                            <p>Please enter item name and upload an image</p>
                            <div>
                                <FormControl>
                                    <InputLabel htmlFor="itemName">Item name</InputLabel>
                                    <Input id="name" name="name" required={true} onChange={handleNameChange}/>
                                </FormControl>
                            </div>
                            <div>
                                <FormControl>
                                    <InputLabel htmlFor="itemName">Item image</InputLabel>
                                    <Input id="file" name="file" type="file" inputProps={{ accept: 'image/*' }} required={true} onChange={handleFileChange}/>
                                </FormControl>
                            </div>
                            <div className={classes.submitContainer}>
                                <Button variant="contained" color="primary" type="submit" disabled={loading} className={classes.submitButton}>
                                    Submit
                                </Button>
                                {loading ? <CircularProgress /> : null}
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}