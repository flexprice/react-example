import { Outlet } from 'react-router';
import { Sidebar, BreadCrumbs, DebugMenu } from '@/components/molecules';

const MainLayout: React.FC = () => {
    return (
        <div className='flex h-screen bg-gray-100'>
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content Area */}
            <div className='flex-1 flex flex-col bg-white'>
                <BreadCrumbs />
                {/* Main Content */}
                <main className='flex-1 px-6 py-6 relative overflow-y-auto'>
                    <Outlet />
                    <DebugMenu />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
