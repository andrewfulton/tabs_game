import  * as React from 'react';

const Browser:React.FC = ({ children }) => {
  return (
    <div
      style={{
        width: '600px',
        height:'300px',
        backgroundColor: 'white',
        border: '5px solid #eee',
        borderRadius: ' 0 0 10px 10px'
      }}
    >
      <div
        style={{
          borderBottom: '5px solid #eee',
          fontFamily: 'monospace',
          padding: '3px'
        }}
      >
        &#128274; https://cool.browser
      </div>
      <div
        style={{
          padding: '5px'
        }}
      >
        { children }
      </div>
    </div>
  )
}

export default Browser;