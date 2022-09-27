import React from 'react'

export default function LoadingModal () {
  return (
        <div className="modalCard-bg">
            <div className="z-50 fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
              <div className='loader'/>
            </div>
        </div>
  )
}
