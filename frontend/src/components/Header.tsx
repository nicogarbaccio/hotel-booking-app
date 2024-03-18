import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-[#14213d] py-6">
      <div className="container mx-auto flex justify-between">
        <span
          className="text-3xl text-white hover:text-[#f4f1de] font-bold tracking-tight"
          data-testid="logo"
        >
          <Link to="/">LetMeBook.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:rounded-md hover:bg-[#003049]"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:rounded-md hover:bg-[#003049]"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center rounded-md text-[#14213d] px-3 font-bold hover:bg-[#f4f1de]"
              data-testid="header-sign-in-button"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
