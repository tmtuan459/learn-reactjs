import { AccountCircle, Close } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ProgressBar from "Components/ProgressBarScroll";
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { logout } from "features/Auth/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./styles.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { cartItemsCountSelector } from "features/Cart/selectors";
import { useHistory } from "react-router-dom";

const MODE = {
  REGISTER: "register",
  LOGIN: "login",
};

export default function Header() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state1) => state1.user.current);
  const cartItemCount = useSelector(cartItemsCountSelector); // lấy data từ selector
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const user = localStorage.getItem("user");
  const userName = user ? JSON.parse(user).email.split("@gmail.com") : "";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  const handleCartOnClick = () => {
    history.push(`/cart`);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="header">
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

          {!isLoggedIn && (
            <Button color="inherit" onClick={handleClickOpen}>
              {mode === MODE.LOGIN ? "Login" : "Register"}
            </Button>
          )}
          {isLoggedIn && (
            <IconButton color="inherit" onClick={handleUserClick}>
              <div style={{ marginRight: "10px" }}>{userName}</div>

              <AccountCircle />
            </IconButton>
          )}

          <IconButton
            size="large"
            aria-label="show new notifications"
            color="inherit"
            onClick={handleCartOnClick}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>

        <ProgressBar />
      </AppBar>
      {isLoggedIn && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            // search trên MUI config ưng ý và dán
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
          <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
        </Menu>
      )}

      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog disableEscapeKeyDown={true} open={open}>
        <IconButton className="close-btn" onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          {mode === MODE.LOGIN && (
            <>
              <Login closeDialog={handleClose} />

              <Box textAlign="Center">
                <Button
                  onClick={() => {
                    setMode(MODE.REGISTER);
                  }}
                >
                  Don't have an account. Register Here
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign="Center">
                <Button
                  onClick={() => {
                    setMode(MODE.LOGIN);
                  }}
                >
                  Already have an account. Login Here
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
