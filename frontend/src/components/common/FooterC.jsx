import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function FooterC() {
  return (
    <MDBFooter style={{ marginTop: '80px'}} bgColor='dark' className='text-center text-lg-left'>
      <div style={{display:'flex', marginLeft:'40%'}} className='text-center p-1'>
        <p className='text-light'>
          ComplaintCare
        </p>
        <p className='text-light'>&copy; {new Date().getFullYear()}</p>
      </div>
    </MDBFooter>
  );
}
