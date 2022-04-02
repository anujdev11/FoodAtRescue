import React from 'react';
import NavigationBar from "../NavigationBar/Navbar";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, Select } from '@mui/material';
import { TextField, Box, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from "antd";
import { ROUTES } from '../../common/constants';


const { Title } = Typography;

function AddFood() {
    const values = {
        name: "",
        type: "",
        servings: "",
        pickUpLocation: "",
    };

    const [formErrors, setFormErrors] = useState(values);
    const [formValues, setFormValues] = useState(values);
    const [isSubmit, setIsSubmit] = useState(false);
    const [api_url, setAPIUrl] = useState('http://localhost:3000/addFood');

    // const foodType = [
    //     { value:"vegetarian", label:"Vegetarian" },
    //     { value: "nonVegetarian", label: "Non-Vegetarian" },
    //     { value: "vegan", label: "Vegan"},
    // ]

    const navigate = useNavigate();

    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            navigate(ROUTES.FOOD_LISTING, { state: { formValues } });
        }
    }, [formErrors]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setFormValues(formValues);
        setIsSubmit(true);

        fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                formValues
            }),
        })
            .then((res) => res.json())
            .then((result) => setFormValues(result.rows))
            .catch((formErrors) => console.log('error'))

    };

    const REGEX = {
        NAME: /^[a-zA-Z ,.'-]+$/,
        SERVINGS: /^([0-9])$/,
    };

    const validate = (value) => {
        const errors = {};
        if (!value.name) {
            errors.name = "Food Name is Required!";
        } else if (!REGEX.NAME.test(value.name)) {
            errors.name = "Enter valid Food Name";
        }
        if (!value.servings) {
            errors.servings = "Servings is Required!";
        } else if (!REGEX.SERVINGS.test(value.servings)) {
            errors.servings = "Enter valid Servings";
        }
        if (!value.pickUpLocation) {
            errors.pickUpLocation = "Food Pick Up Location is Required!";
        }
        return errors;
    };

    return (
        <div>
            <NavigationBar />
            <Paper
                elevation={3}
                sx={{
                    width: "60%",
                    marginTop: "auto",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <Box
                    textAlign="center"
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "70%",
                        justifyContent: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "50px",
                        marginBottom: "50px"
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <Title level={1} className="title">
                            Add Food Details
                        </Title>
                        {/* <label> Food Name </label> */}
                        <TextField
                            fullWidth
                            required
                            name="name"
                            id="outlined-required"
                            label="Food Name"
                            placeholder="Enter Food Name"
                            margin="normal"
                            value={formValues.name}
                            onChange={handleChange}
                            error={!!formErrors.name}
                            helperText={formErrors.name ? formErrors.name : ""}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">Food Type</InputLabel>
                            <Select
                                fullWidth
                                required
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                name="type"
                                label="Food Type"
                                placeholder="Food Type"
                                margin="normal"
                                value={formValues.type}
                                onChange={handleChange}
                                error={!!formErrors.type}
                                helperText={formErrors.type ? formErrors.type : ""}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Vegetarian}">Vegetarian</MenuItem>
                                <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                                <MenuItem value="Vegan">Vegan</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            name="servings"
                            label="Servings"
                            placeholder="Enter Servings"
                            margin="normal"
                            value={formValues.servings}
                            onChange={handleChange}
                            error={!!formErrors.servings}
                            helperText={formErrors.servings ? formErrors.servings : ""}
                        />
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            name="pickUpLocation"
                            label="Food Pick-Up Location"
                            placeholder="Enter Pick Up Location"
                            margin="normal"
                            value={formValues.pickUpLocation}
                            onChange={handleChange}
                            error={!!formErrors.pickUpLocation}
                            helperText={formErrors.pickUpLocation ? formErrors.pickUpLocation : ""}
                        />
                        {/* <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            name="apartmentNumber"
                            label="Apartment No."
                            placeholder="Enter Apartment No."
                            margin="normal"
                            value={formValues.apartmentNumber}
                            onChange={handleChange}
                            error={!!formErrors.apartmentNumber}
                            helperText={formErrors.apartmentNumber ? formErrors.apartmentNumber : ""}
                        />
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            name="city"
                            label="City"
                            placeholder="Enter City"
                            margin="normal"
                            value={formValues.city}
                            onChange={handleChange}
                            error={!!formErrors.city}
                            helperText={formErrors.city ? formErrors.city : ""}
                        />
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            name="province"
                            label="Province"
                            placeholder="Enter Province"
                            margin="normal"
                            value={formValues.province}
                            onChange={handleChange}
                            error={!!formErrors.province}
                            helperText={formErrors.province ? formErrors.province : ""}
                        />
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            name="postal"
                            label="Postal Code"
                            placeholder="Enter Postal Code"
                            margin="normal"
                            value={formValues.postal}
                            onChange={handleChange}
                            error={!!formErrors.postal}
                            helperText={formErrors.postal ? formErrors.postal : ""}
                        />
                        <TextField
                            fullWidth
                            required
                            id="outlined-required"
                            name="number"
                            label="Phone Number"
                            placeholder="Enter Phone Number"
                            margin="normal"
                            value={formValues.number}
                            onChange={handleChange}
                            error={!!formErrors.number}
                            helperText={formErrors.number ? formErrors.number : ""}
                        />
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            name="instructions"
                            label="Instructions for Delivery"
                            multiline
                            rows={4}
                            placeholder="Enter Descriptions"
                            margin="normal"
                            value={formValues.instructions}
                            onChange={handleChange}
                        /> */}

                    </div>
                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Post Food
                        </Button>
                        {/* <AppButton color="secondary"
                            onClick={handleSubmit} >
                            Submit
                        </AppButton> */}
                    </div>
                </Box>
            </Paper>
            <Footer />
        </div>
    );
}

export default AddFood;