'use client';
import { useDispatch, useSelector } from 'react-redux';
import { togglemenu } from '@/Redux/store/uiSlice'
import SidebarMenu from '@/components/ui/sidebar/SidebarMenu';
import Navbar from '@/components/nav/Navbar';
import Breadcrumb from "@/components/ui/Breadcrumb/Breadcrumb";
import SideCategory from "@/components/ui/catagory/Catagory";
import PostMember from "@/components/ui/member/PostMember";
import SideTags from "@/components/ui/tags/tags";
import Footer from '../ui/Footer/Footer';
import Searchres from "@/components/screens/searchContainer/Sreachres"
export default function LayoutWrapper({ children }) {
  const { ismenuClose } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <div className="flex relative  h-full">
      {/* Backdrop */}
      {ismenuClose && (
        <div
          className="fixed inset-0 bg-black/40 z-10 lg:hidden" // Only show on small screens
          onClick={() => dispatch(togglemenu())}
        />
      )}

      {/* Sidebar */}
      {ismenuClose && (
        <div className="fixed left-0 top-0 h-screen w-[70%] sm:w-[60%] lg:w-[15%] backdrop-blur shadow-md z-20">
          <SidebarMenu />
        </div>
      )}

      {/* Main Content */}
      <div
        className={`
          relative
          transition-all duration-300 
          flex flex-col
          
          ${!ismenuClose ? 'w-[100%]' : 'w-[80%] sm:w-[80%] lg:w-[90%]'}
          ml-auto
        `}
      >
        <Navbar />
        <div className="transition-all duration-300 w-full ">
          <div className="mt-[70px] sm:mt-[20px] lg:mt-[90px]   w-full lg:w-[80%] m-auto flex justify-between it">
            <div className="w-[95%] mx-auto sm:w-full lg:w-[70%] h-full ">
              {/* <Breadcrumb /> */}
              <Searchres/>
              <main>{children}</main>
            </div>
            <div className="w-[30%] hidden sm:hidden lg:block h-screen">
              <PostMember />
              <SideCategory />
              <SideTags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
