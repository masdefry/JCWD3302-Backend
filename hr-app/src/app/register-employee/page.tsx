'use client';
import HeaderTitle from '@/components/HeaderTitle';
import {
  PiIdentificationCardDuotone,
  PiPhoneListDuotone,
  PiClockAfternoonDuotone,
  PiUserCircleGearDuotone,
} from 'react-icons/pi';
import { AiTwotoneMail } from 'react-icons/ai';
import { useRef } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import useAuthStore from '@/stores/authStore';

export default function Page() {
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPhoneNumber = useRef<HTMLInputElement>(null);
  const inputSalary = useRef<HTMLInputElement>(null);
  const selectShift = useRef<HTMLSelectElement>(null);
  const selectRole = useRef<HTMLSelectElement>(null);
  const { token } = useAuthStore();

  const onRegisterAccount = async () => {
    const name = inputName?.current?.value;
    const email = inputEmail?.current?.value;
    const phoneNumber = inputPhoneNumber?.current?.value;
    const salary = inputSalary?.current?.value;
    const shiftId = selectShift?.current?.value;
    const role = selectRole?.current?.value;

    const res = await axiosInstance.post('/api/auth/register', {
      name,
      email,
      phoneNumber,
      salary,
      shiftId,
      role,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(res);
  };

  return (
    <>
      <HeaderTitle title='Register Employee' />

      <div className='p-4'>
        <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
          <PiIdentificationCardDuotone className='text-2xl text-gray-500' />
          <input
            type='text'
            ref={inputName}
            placeholder='Full Name'
            className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
          />
        </div>
        <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
          <AiTwotoneMail className='text-2xl text-gray-500' />
          <input
            type='text'
            ref={inputEmail}
            placeholder='Email'
            className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
          />
        </div>
        <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
          <PiPhoneListDuotone className='text-2xl text-gray-500' />
          <input
            type='text'
            ref={inputPhoneNumber}
            placeholder='Phone Number'
            className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
          />
        </div>
        <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
          <PiPhoneListDuotone className='text-2xl text-gray-500' />
          <input
            ref={inputSalary}
            type='text'
            placeholder='Salary'
            className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
          />
        </div>
        <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
          <PiClockAfternoonDuotone className='text-2xl text-gray-500' />
          <select
            ref={selectShift}
            className='select focus:outline-none focus:ring-0 bg-gray-100 border-none w-full text-gray-500'
          >
            <option>Employee Shift</option>
            <option value={1}>Shift-01 (09:00:00 - 18:00:00)</option>
            <option value={2}>Shift-02 (13:00:00 - 22:00:00)</option>
          </select>
        </div>
        <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
          <PiUserCircleGearDuotone className='text-2xl text-gray-500' />
          <select
            ref={selectRole}
            className='select focus:outline-none focus:ring-0 bg-gray-100 border-none w-full text-gray-500'
          >
            <option>Employee Role</option>
            <option value='HR'>HR</option>
            <option value='STAFF'>STAFF</option>
            <option value='MANAGER'>MANAGER</option>
          </select>
        </div>

        <div className='px-4 py-3 w-full border-gray-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto'>
          <button
            onClick={onRegisterAccount}
            className='btn bg-green-500  hover:bg-green-600 text-white w-full'
          >
            Create Employee
          </button>
        </div>
      </div>
    </>
  );
}
