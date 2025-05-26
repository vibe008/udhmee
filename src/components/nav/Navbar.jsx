"use client"
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image"
import Logo from "@/icons/logo"
import { useSelector, useDispatch } from 'react-redux';
import { togglemenu } from '@/Redux/store/uiSlice';
import { clearSearchResults, setSearchresult ,setSearchQuery} from '@/Redux/store/searchresSlider';
import SearchIcon from '@mui/icons-material/Search';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useEffect, useState } from "react";
import { GetPostbysearch } from "../../services/searchservices"
import Tost from "../../components/ui/tost/Tost";
import { toast } from 'react-toastify';
export default function Navbar() {

    const dispatch = useDispatch();
    const { theme, ismobile, ismenuClose } = useSelector((state) => state.ui);
    const [value, setValuse] = useState("");
    const [searchbarshow, SetSearchBarShow] = useState(false)
    const [menutoggle, setMenuToggle] = useState(false)
    const [allPost, setAllPOst] = useState([])
    useMobileDetection();
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);
    const fillsvg = theme === 'dark' ? '#ffffff' : '#000000';
    const Onvaluechange = async (e) => {
        setValuse(e.target.value);
        try {
            const searchitem = e.target.value
            dispatch(setSearchQuery(searchitem))
                if (searchitem.trim() === "") {
                        dispatch(clearSearchResults());
                       return;
                               }
            const res = await GetPostbysearch(searchitem)
                 if (res.status === 200) {
                // setAllPOst(res.data)
                           dispatch(setSearchresult(res.data))

                        }
                  else {
                         console.log("no Post Found")
                          toast.error(res.data.message);
                          dispatch(clearSearchResults());
                         }
        } catch (error) {
            dispatch(clearSearchResults());
            console.log("error in search", error)
            toast.error(error)

        }
    }
    return (
        <div>
            <Tost />
            <div className={`${ismenuClose ? "w-[60%] sm:w-[60%] lg:w-[85%]" : "w-full"} fixed top-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md  transition-all duration-300 flex items-center`}>
                <div className='cursor-pointer' onClick={() => {
                    setMenuToggle(!menutoggle)
                    dispatch(togglemenu(!menutoggle))
                }}>
                    <MenuIcon style={{ fontSize: "45px" }} className=' text-black  dark:text-white' />
                </div>
                <div className={`${ismobile ? "w-full flex m-auto justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-mdk p-2" : "w-[85%] flex m-auto justify-between p-2"}`}>

                    <div className={`${ismobile ? "w-[40%]  " : " w-[60%]"}`} >
                        <Logo bgcolor={fillsvg} mobilesize={ismobile} />
                    </div>

                    <div className={`${ismobile ? "w-[40%] flex justify-end " : "w-[20%] flex justify-end"}`}>
                        <div className={` transition-all duration-300 ease-in-out ${searchbarshow ? "w-full" : "hidden"} rounded-full border border-solid border-black dark:border-white transition-colors flex items-center justify-center font-medium text-sm sm:text-base p-0.5 dark:text-white text-black  `}>
                            <input
                                placeholder="Search"
                                className="outline-none p-2 w-[100%] "
                                type="search"
                                value={value}
                                onChange={(e) => {
                                    Onvaluechange(e)
                                }}

                            />
                        </div>
                        {!searchbarshow && <div className="p-2 cursor-pointer" onClick={() => {
                            SetSearchBarShow(!searchbarshow)
                        }}>
                            <SearchIcon className={`${theme === 'dark' ? "text-white" : "text-black"} `} />
                        </div>}
                    </div>
                </div>
            </div>
        </div>

    )
}