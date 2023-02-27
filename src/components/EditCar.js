import React, {useState} from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, TextField, Stack } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'

function EditCar(props) {

    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        year: '',
        price: ''
    });

    const handleClickOpen = () => {
        setCar({
            brand: props.data.row.brand,
            model: props.data.row.model,
            color: props.data.row.color,
            year: props.data.row.year,
            price: props.data.row.price
        });
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        props.updateCar(car, props.data.id);
        handleClose();
    }

    return(
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon color="primary" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Brand" name="brand" autoFocus variant="standard" value={car.brand} onChange={handleChange} /><br/>
                        <TextField label="Model" name="model" variant="standard" value={car.model} onChange={handleChange} /><br/>
                        <TextField label="Color" name="color" variant="standard" value={car.color} onChange={handleChange} /><br/>
                        <TextField label="Year" name="year" variant="standard" value={car.year} onChange={handleChange} /><br/>
                        <TextField label="Price" name="price" variant="standard" value={car.price} onChange={handleChange} /><br/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>

            </Dialog>
        </div>
    )
}

export default EditCar;