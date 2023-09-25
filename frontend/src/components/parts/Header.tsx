import React from 'react'
import { useRouter } from 'next/router'
import { IoMdSettings } from 'react-icons/io'

export const Header = () => {
  const router = useRouter()
  return (
    <div className='flex items-center h-[8vh] justify-between px-10 border-b-2 border-black'>
      <p className='text-3xl text-black' onClick={() => router.push('/')}>nkt scholar</p>
      <div className='flex'>
        <div 
          onClick={() => router.push('/edit_consts')}
        >
          <IoMdSettings size={30}/>
        </div>
      </div>
    </div>
  )
}