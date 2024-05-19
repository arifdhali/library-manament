import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-footer p-6 mt-auto'>
            <div className="container">
                <div className='text-center'>

                    <p><span className='text-blue-600'>{new Date().getFullYear()}</span>  Copyright, Work in progress</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
