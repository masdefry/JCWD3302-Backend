'use client';
import { PiPasswordDuotone, PiPasswordFill } from 'react-icons/pi';
import HeaderTitle from '@/components/HeaderTitle';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';

export default function Page() {
  const { slug } = useParams();
  const inputPassword = useRef<HTMLInputElement>(null);

  const{ mutate: mutationResetPassword } = useMutation({
    mutationFn: async() => {
      await axiosInstance.patch('/api/auth/reset-password', {
        password: inputPassword?.current?.value
      }, {
        headers: {
          Authorization: `Bearer ${slug}`
        }
      })
    }
  })

  return (
    <>
      <HeaderTitle title='Reset Password' />

      {/* Form Reset Password */}
      <div className='px-4 py-2'>
        <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
          <PiPasswordDuotone className='text-2xl text-gray-500' />
          <input
            type='text'
            ref={inputPassword}
            placeholder='Type new password'
            className='input border-none text-gray-500 bg-gray-100 w-full'
          />
        </div>
        <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
          <PiPasswordFill className='text-2xl text-gray-500' />
          <input
            type='text'
            placeholder='Type confirmation password'
            className='input border-none text-gray-500 bg-gray-100 w-full'
          />
        </div>
      </div>
      <div className='px-4 py-3 w-full border-gray-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto'>
        <button onClick={() => mutationResetPassword()} className='btn bg-green-500  hover:bg-green-600 text-white w-full'>
          Submit Password
        </button>
      </div>
    </>
  );
}
