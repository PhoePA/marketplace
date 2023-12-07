import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  EnvelopeOpenIcon,
  IdentificationIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { setUser } from "../../store/slices/userSlice";

const General = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, name, role } = useSelector((state) => state.reducer.user.user);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <section>
      <h1 className="text-center text-2xl p-4 font-semibold">Details</h1>
      <ul>
        <li className="flex items-center text-base font-bold">
          <EnvelopeOpenIcon width={18} />
          <span className="m-2 text-blue-700">Email</span> - {email}
        </li>
        <li className="flex items-center text-base font-bold">
          <IdentificationIcon width={20} />
          <span className="m-2 text-blue-700">Name</span>- {name}
        </li>
        <li className="flex items-center text-base font-bold">
          <UserCircleIcon width={20} />
          <span className="m-2 text-blue-700">Role</span>- {role}
        </li>
      </ul>
      <button
        type="submit"
        className="text-white bg-red-500 font-medium p-1 rounded-md hover:text-base duration-500"
        onClick={logoutHandler}
      >
        Log out
      </button>
    </section>
  );
};

export default General;
