import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Fragment } from 'react';
function DefaultLayout({children, user}) {
    return (
        <Fragment>
            <Sidebar />
            <container id="container"  style={{ width: 'calc(100% - 78px)', position: 'relative', left: '78px', display: 'block' }}>
                <Header user={user}/>
                <div className='content'>
                    {children}
                </div>
            </container>
        </Fragment>
    );
}

export default DefaultLayout;