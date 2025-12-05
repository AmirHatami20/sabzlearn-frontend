import {FaRegUser} from "react-icons/fa";
import {useAuth} from "../../context/AuthContext.jsx";
import {useState} from "react";
import {USER_PROFILE_MENU} from "../../utils/data.js";
import {GrUserAdmin} from "react-icons/gr";

import noProfile from "../../assets/images/no-profile.jpg";
import NavbarButton from "./NavbarButton.jsx";
import {Link} from "react-router-dom";
import {IoLogOutOutline} from "react-icons/io5";
import Overlay from "../../components/Overlay.jsx";

function NavbarUserProfile({user}) {
    const {logout} = useAuth();
    const [showUserProfile, setShowUserProfile] = useState(false);

    const toggleUserProfile = () => {
        setShowUserProfile(prev => !prev);
    }

    if (!user) return null;

    return (
        <>
            <NavbarButton
                icon={FaRegUser}
                onClick={toggleUserProfile}
                haveZIndex={showUserProfile}
            />

            <div
                className={`hidden md:block absolute shadow-md left-0 top-full w-[278px] bg-white dark:bg-primary-dark dark:text-white p-5 pb-3.5 rounded-lg transition ${
                    !showUserProfile ? 'opacity-0 invisible' : 'opacity-100 visible z-30'
                }`}
            >
                <div className="flex border-b border-gray-300 gap-x-4">
                    <div className="flex pb-3 mb-1">
                        <img
                            className="w-13 h-13 rounded-full"
                            src={noProfile}
                            alt="noProfile"
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <span className="text-sm font-bold">{user.username}</span>
                        <span className="text-primary text-xs font-semibold">موجودی : 0تومان</span>
                    </div>
                </div>

                <ul className="border-b border-gray-300 pb-3 mb-1">
                    {user.role === "ADMIN" && (
                        <li>
                            <Link to={"/admin"}
                                  className="flex items-center gap-x-3 px-2.5 h-12 rounded-xl hover:text-white hover:bg-primary transition-colors"
                            >
                                <GrUserAdmin className="text-2xl"/>
                                <span className="text-base">ادمین پنل</span>
                            </Link>
                        </li>
                    )}

                    {USER_PROFILE_MENU.map((item) => (
                        <li key={item.id}>
                            <Link to={item.href}
                                  className="flex items-center gap-x-3 px-2.5 h-12 rounded-xl hover:text-white hover:bg-primary transition-colors"
                            >
                                <item.icon className="text-2xl"/>
                                <span className="text-base">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    className="flex w-full items-center gap-x-3 px-2.5 h-12 rounded-xl hover:text-white hover:bg-red-500 transition-colors"
                    onClick={logout}
                >
                    <IoLogOutOutline className="text-2xl"/>
                    <span className="text-base">خروج</span>
                </button>
            </div>

            {showUserProfile && (
                <Overlay closeOverlay={toggleUserProfile}/>
            )}
        </>
    );
}

export default NavbarUserProfile;
