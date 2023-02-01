import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        itemAlign: 'center',
        marginTop: '100px',
        marginLeft: '346px',
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
