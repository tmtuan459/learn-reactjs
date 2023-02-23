import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ProgressBar from "Components/ProgressBarScroll";
import Register from "features/Auth/components/Register";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "rgb(40,44,52)" }}>
        <Toolbar>
          <Link to="/" style={{ color: "white" }}>
            <HomeIcon />
          </Link>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "unset" }}>
              TT Shop
            </Link>
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>
            Register
          </Button>
        </Toolbar>

        <ProgressBar />
      </AppBar>

      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog disableEscapeKeyDown={true} open={open}>
        <DialogContent>
          <Register />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
