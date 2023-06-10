import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const NavbarWrapper = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  // Define an array of paths where the Navbar should be hidden
  const hiddenPaths = ['/LoginPage', '/RegisterPage'];

  // Check if the current path is in the hiddenPaths array
  const shouldShowNavbar = !hiddenPaths.includes(pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar username="JohnDoe" email="johndoe@example.com" balance={100000} />}
      {children}
    </>
  );
};
