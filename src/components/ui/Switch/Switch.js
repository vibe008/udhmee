"use client"
import Switch from "react-switch";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { toggleTheme } from '@/Redux/store/uiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
export default function toggleswitch() {
    const [thememode, setThemeMode] = useState(true);
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.ui);

        useEffect(() => {
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }, [theme]);
    return (
        < div className="fixed right-5 top-[90%] ">
            <Switch
                handleDiameter={20}
                // offColor={"#39393d"}
                onColor={"#36454F"}
                offHandleColor={"#ffff"}
                onHandleColor={"#00000"}
                uncheckedIcon={<DarkModeIcon className="p-0.5" />}
                checkedIcon={<LightModeIcon className="p-0.5 text-white  " />}
                checked={thememode}
                value={thememode}
                onChange={() => {
                    dispatch(toggleTheme()),
                    setThemeMode(!thememode)
                }}
            // className="p-1"
            />
        </div>
    );
}
