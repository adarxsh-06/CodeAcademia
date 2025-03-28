import * as Icons from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";

import { resetCourseState } from "../../../slices/courseSlice";
import { setOpenSideMenu } from "../../../slices/sidebarSlice";

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName];
  const location = useLocation();
  const dispatch = useDispatch();

  const { openSideMenu, screenSize } = useSelector((state) => state.sidebar);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const handleClick = () => {
    dispatch(resetCourseState());
    if (openSideMenu && screenSize <= 640) dispatch(setOpenSideMenu(false));
  };

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-[#3D2A01] text-[#FFF970]"
          : "text-[#838894] hover:bg-[#2C333F] duration-200"
      } transition-all `}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-[#FFF970] ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

      <div className="flex items-center gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
}
