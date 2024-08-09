import { Outlet } from "react-router-dom";

// import { signOutUser } from "../../utils/firebase/firebase.utils";

import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { signOutStart } from "../../store/user/user.action";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component.jsx";
import CartIcon from "../../components/cart-icon/cart-icon.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./navigation.styles.jsx";

export default function Navigation() {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutUser = () => dispatch(signOutStart());

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <span onClick={signOutUser} style={{ cursor: "pointer" }}>
              SIGN OUT
            </span>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
          {isCartOpen && <CartDropdown />}
        </NavLinks>
      </NavigationContainer>
      <Outlet />
    </>
  );
}
