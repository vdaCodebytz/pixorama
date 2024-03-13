import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      <ul className="flex gap-4 w-full justify-evenly">
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <li
              key={link.label}
              className={`leftsidebar-link group ${
                isActive && "bg-primary-500"
              }`}
            >
              <Link
                to={link.route}
                className={`flex flex-col transition gap-1 p-2 items-center justify-center ${
                  isActive && "invert-white rounded-[10px]"
                }`}
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className="group-hover:invert-white h-4 w-4"
                />
                <p className="tiny-medium text-light-2">{link.label}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default BottomBar;
