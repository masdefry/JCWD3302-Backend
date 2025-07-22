'use client';
import HeaderTitle from '@/components/HeaderTitle';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { IoCalendarOutline } from 'react-icons/io5';
export default function Page() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <>
      <HeaderTitle title='Attendance Log' />
      <div className='flex mt-3 border-b-1 border-gray-300'>
        <h1 className='flex-1 text-center border-b-3 border-gray-300 pb-1'>
          Logs
        </h1>
        <h1 className='flex-1 text-center'>Attendance</h1>
        <h1 className='flex-1 text-center'>Shift</h1>
      </div>
      <div className='p-4'>
        <div className='flex items-center gap-3 mt-3'>
          <IoCalendarOutline className='text-2xl' />
          <button
            popoverTarget='rdp-popover'
            className='input input-border w-full bg-gray-100'
            style={{ anchorName: '--rdp' } as React.CSSProperties}
          >
            {date ? date.toLocaleDateString() : 'July 2025'}
          </button>
          <div
            popover='auto'
            id='rdp-popover'
            className='dropdown mt-3'
            style={{ positionAnchor: '--rdp' } as React.CSSProperties}
          >
            <DayPicker
              className='react-day-picker'
              mode='single'
              selected={date}
              onSelect={setDate}
            />
          </div>
        </div>
        <div className='border border-gray-300 mt-3 rounded-md grid grid-cols-3 py-3 gap-3'>
          <div className='col-span-1 text-center'>
            <h1 className='text-xs'>Absent</h1>
            <p className='font-bold'>0</p>
          </div>
          <div className='col-span-1 text-center'>
            <h1 className='text-xs'>Late Clock-out</h1>
            <p className='font-bold'>0</p>
          </div>
          <div className='col-span-1 text-center'>
            <h1 className='text-xs'>Late Clock-in</h1>
            <p className='font-bold'>0</p>
          </div>
          <div className='col-span-1 text-center'>
            <h1 className='text-xs'>Underworked</h1>
            <p className='font-bold'>0</p>
          </div>
        </div>
        <div>
          <div className='flex justify-between items-center px-4 mt-3 border-b-1 border-gray-300 py-1'>
            <div>
              <h1 className='font-bold'>24 July</h1>
              <p className='text-xs text-gray-500'>Work shift</p>
            </div>
            <h1 className=' text-gray-500'>09:00</h1>
            <h1 className=' text-gray-500'>18:01</h1>
          </div>
          <div className='flex justify-between items-center px-4 mt-3 border-b-1 border-gray-300 py-1'>
            <div>
              <h1 className='font-bold'>24 July</h1>
              <p className='text-xs text-gray-500'>Work shift</p>
            </div>
            <h1 className=' text-gray-500'>09:00</h1>
            <h1 className=' text-gray-500'>18:01</h1>
          </div>
          <div className='flex justify-between items-center px-4 mt-3 border-b-1 border-gray-300 py-1'>
            <div>
              <h1 className='font-bold'>24 July</h1>
              <p className='text-xs text-gray-500'>Work shift</p>
            </div>
            <h1 className=' text-gray-500'>09:00</h1>
            <h1 className=' text-gray-500'>18:01</h1>
          </div>
        </div>
      </div>
    </>
  );
}
