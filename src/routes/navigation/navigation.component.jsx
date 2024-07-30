import { Outlet } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector.js";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";

import { selectIsCartOpen } from "../../store/cart/cart.selector.js";
import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from "./navigation.styles.jsx";

export default function Navigation() {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
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
