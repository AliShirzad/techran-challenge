import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";

import AdapterJalali from "@date-io/date-fns-jalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import { addData, editData, getData } from "../utils";
import { UserType } from "../types/global";

const UserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter name"),
  lastName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter name"),
  age: Yup.number()
    .min(18, "Too Young!")
    .max(100, "Too Old!")
    .required("Please enter age"),
  birthdate: Yup.string().required("Please enter birthdate"),
  country: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter country"),
  city: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter city"),
  jobTitle: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter job title"),
  phoneNumber: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter phone number"),
  workType: Yup.string().min(3, "Too Short!").max(50, "Too Long!").nullable(),
  description: Yup.string()
    .min(10, "Too Short!")
    .max(500, "Too Long!")
    .required("Please enter description"),
});

const FormPage = () => {
  let navigate = useNavigate();
  let location = useLocation();

  let initialValue = {} as UserType | undefined;

  const searchUrl = location.search;
  if (searchUrl) {
    const data = getData();
    initialValue = data?.find(
      (user: any) => user.firstName === searchUrl.slice(1)
    );
  }

  const onFormSubmit = (values: UserType) => {
    if (searchUrl) {
      editData(values);
    } else {
      addData(values);
    }
    setTimeout(() => navigate("/table-page"), 300);
  };

  console.log("initialValue", initialValue);
  return (
    <Container>
      <Formik
        initialValues={
          initialValue && Object.keys(initialValue).length > 0
            ? initialValue
            : {
                firstName: "",
                lastName: "",
                age: 0,
                gender: true,
                birthdate: "",
                country: "",
                city: "",
                jobTitle: "",
                phoneNumber: "",
                workType: "",
                description: "",
              }
        }
        validationSchema={UserSchema}
        onSubmit={(values, { setSubmitting }) => {
          onFormSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          resetForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              disabled={!!searchUrl}
            />

            {/* lastName */}
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />

            {/* age */}
            <TextField
              fullWidth
              id="age"
              name="age"
              label="Age"
              type="number"
              value={values.age}
              onChange={handleChange}
              error={touched.age && Boolean(errors.age)}
              helperText={touched.age && errors.age}
            />

            {/* gender */}

            <FormControl onClick={() => console.log(values)}>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="gender"
                onChange={handleChange}
              >
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>

            {errors.gender && touched.gender && errors.gender}

            {/* birthdate */}
            <LocalizationProvider dateAdapter={AdapterJalali}>
              <Stack spacing={3}>
                <DatePicker
                  label="Date desktop"
                  inputFormat="dd/MM/yyyy"
                  value={values.birthdate}
                  onChange={(date) => setFieldValue("birthdate", date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            {errors.birthdate && touched.birthdate && errors.birthdate}

            {/* City */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="city"
                id="city"
                value={values.city}
                label="city"
                onChange={(name) => setFieldValue("city", name.target.value)}
              >
                <MenuItem value="Tehran">Tehran</MenuItem>
                <MenuItem value="New york">New york</MenuItem>
                <MenuItem value="Toronto">Toronto</MenuItem>
                <MenuItem value="Dehli">Dehli</MenuItem>
                <MenuItem value="Beijing">Beijing</MenuItem>
              </Select>
            </FormControl>

            {errors.city && touched.city && errors.city}

            {/* Country */}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="Country"
                id="country"
                value={values.country}
                label="Country"
                onChange={(name) => setFieldValue("country", name.target.value)}
              >
                <MenuItem value="Iran">Iran</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="China">China</MenuItem>
              </Select>
            </FormControl>

            {errors.country && touched.country && errors.country}

            {/* jobTitle */}

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">jobTitle</InputLabel>
              <Select
                labelId="jobTitle"
                id="jobTitle"
                value={values.jobTitle}
                label="jobTitle"
                onChange={(name) =>
                  setFieldValue("jobTitle", name.target.value)
                }
              >
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </Select>
            </FormControl>

            {errors.jobTitle && touched.jobTitle && errors.jobTitle}

            {/* workType */}
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    name="workType"
                    onChange={() => setFieldValue("workType", "Full-Time")}
                    checked={values.workType === "Full-Time"}
                  />
                }
                label="Full time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="workType"
                    onChange={() => setFieldValue("workType", "Part-Time")}
                    checked={values.workType === "Part-Time"}
                  />
                }
                label="Part time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="workType"
                    onChange={() => setFieldValue("workType", "Freelance")}
                    checked={values.workType === "Freelance"}
                  />
                }
                label="Freelance"
              />
            </FormGroup>

            {errors.workType && touched.workType && errors.workType}

            {/* Description */}
            <TextField
              fullWidth
              id="Description"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />

            {errors.description && touched.description && errors.description}

            <Container
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Submit
              </Button>

              <Button
                variant="contained"
                type="button"
                onClick={(e) => resetForm()}
                disabled={isSubmitting}
              >
                Clear
              </Button>
            </Container>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FormPage;
