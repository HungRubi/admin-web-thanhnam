import {Header,Footer,Navbar} from '../components';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const Public = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className='w-full h-screen relative'>  
            <div className="w-full h-screen ">
                <div className="w-full fixed h-[60px] sm:h-[70px] border-b-custom z-20">
                    <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>
                </div>
                <div className="w-full h-full flex flex-col sm:flex-row pt-[60px] sm:pt-[70px] z-10">
                    {/* Mobile Overlay */}
                    {isMobileMenuOpen && (
                        <div 
                            className="fixed inset-0 bg-[#00000023] bg-opacity-50 z-30 sm:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        ></div>
                    )}
                    {/* Navbar - Ẩn trên mobile, hiện dạng drawer khi mở */}
                    <div className={`
                        fixed sm:relative top-[60px] sm:top-0 left-0 h-[calc(100vh-60px)] sm:h-full
                        flex-none transition-all duration-300 ease-in-out z-40
                        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
                        w-[248px] ${isCollapsed ? 'sm:w-[70px]' : 'sm:w-62'}
                    `}>
                        <Navbar 
                            isCollapsed={isCollapsed} 
                            setIsCollapsed={setIsCollapsed}
                            setIsMobileMenuOpen={setIsMobileMenuOpen}
                        />
                    </div>
                    <div className="h-full flex-1 bg-div min-w-0 md:min-w-[1500px] overflow-y-auto 
                        [&::-webkit-scrollbar]:w-2.5 relative
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-[#74717171]
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <Outlet/>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
export default Public