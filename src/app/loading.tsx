import React from 'react'
import { PulseLoader } from 'react-spinners'

export default function loading() {
  return (
    <>
    <div className='h-screen flex items-center justify-center'  >
    <PulseLoader />
    </div>
    </>
  )
}
