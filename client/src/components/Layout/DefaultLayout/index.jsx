import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
function DefaultLayout({children, user}) {
    return (
        <div>
            <Header user={user}/>
            <container>
                <Sidebar />
                <div className='content'>
                    {children}
                </div>
            </container>
        </div>
    );
}

export default DefaultLayout;