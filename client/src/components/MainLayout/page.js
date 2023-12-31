import Nav from '../NavBar/page';
import Footer from '../Footer/page';

import React from 'react';

function page({children}) {
  return (
    <div>
        <Nav/>
        {children}
        <Footer/>
    </div>
  )
}

export default page;