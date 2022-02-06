import React from 'react'

const SecondaryButton = React.forwardRef(
  ({ className, width, height, onClick, href, children }, ref) => {
    return (
      <button
        type='button'
        className={`${className} rounded`}
        style={{
          width: width,
          height: height,
          backgroundColor: '#8756bd',
          color: '#ffffff',
        }}
        href={href}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

export default SecondaryButton
