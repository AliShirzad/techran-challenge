import * as React from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { deleteData, getData } from "../utils";
import { UserType } from "../types/global";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable() {
  const data = getData();
  const [modalOpen, setModalOpen] = React.useState<any>(false);
  const [selectedUser, setSelectedUser] = React.useState<UserType>();

  const navigate = useNavigate();

  const onEdit = (user: UserType) => {
    navigate(`/?${user.firstName}`);
  };

  const onDelete = (user: UserType) => {
    deleteData(user);
    window.location.reload();
  };

  return (
    <Container>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this user?
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                selectedUser && onDelete(selectedUser);
                setModalOpen(false);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Work Title</TableCell>
              <TableCell align="right">Job Title</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Birth</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((user: UserType) => (
              <TableRow
                key={user.firstName}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                    whiteSpace: "nowrap",
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell align="right">{user.workType}</TableCell>
                <TableCell align="right">{user.jobTitle}</TableCell>
                <TableCell align="right">{user.phoneNumber}</TableCell>
                <TableCell align="right">{user.country}</TableCell>
                <TableCell align="right">{user.city}</TableCell>
                <TableCell align="right">{user.birthdate}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => onEdit(user)}>Edit</Button>
                  <Button
                    onClick={() => {
                      setSelectedUser(user);
                      setModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
