'use client';
import { PiIdentificationCardDuotone } from 'react-icons/pi';
import { PiPasswordDuotone } from 'react-icons/pi';
import { useRef } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';

export default function Page() {
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const onLoginAccount = async () => {
    const email = inputEmail?.current?.value;
    const password = inputPassword?.current?.value;
    try {
      const res: AxiosResponse = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });
      console.log(res?.data?.data?.token);
      setAuth({
        token: res?.data?.data?.token,
        name: res?.data?.data?.name,
        role: res?.data?.data?.role,
      });
      console.log('>>>');
      router.push('/');
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='p-10'>
        <div className='text-black'>
          <h1 className='text-3xl'>Welcome Back</h1>
          <p className='font-bold text-gray-500'>
            Your day starts here — let’s make it productive!
          </p>
        </div>

        <div className='mt-3'>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiIdentificationCardDuotone className='text-2xl text-gray-500' />
            <input
              ref={inputEmail}
              type='text'
              placeholder='Email or Username'
              className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
            />
          </div>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiPasswordDuotone className='text-2xl text-gray-500' />
            <input
              ref={inputPassword}
              type='password'
              placeholder='Password'
              className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
            />
          </div>
          <button
            onClick={onLoginAccount}
            className='btn bg-green-500  hover:bg-green-600 text-white w-full mt-5'
          >
            Sign in
          </button>
        </div>
      </div>
    </>
  );
}
