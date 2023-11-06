import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  const { user } = useSelector((state) => state.reducer.user);
  // console.log(user);
  return (
    <nav className="flex items-center justify-between p-4 rounded text-white bg-blue-500">
      <Link to={"/"} className=" font-bold text-4xl">
        Point.IO
      </Link>
      {user ? (
        <div className="  flex items-center gap-3 text-base font-medium ">
          <Link to={"/profile"} className="flex items-center">
            <UserIcon width={21} /> Profile
          </Link>
          {/* <Link to={"/logout"} className="flex items-center">
            Logout <ArrowRightOnRectangleIcon width={20} />
          </Link> */}
        </div>
      ) : (
        <div className="  flex items-center gap-3 text-base font-medium ">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
