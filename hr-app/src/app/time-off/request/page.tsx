'use client';
import { PiClockCountdownDuotone } from 'react-icons/pi';
import { DayPicker } from 'react-day-picker';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiListPlusDuotone } from 'react-icons/pi';
import HeaderTitle from '@/components/HeaderTitle';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { useFormik } from 'formik';
import { validationRequestTimeOffSchema } from '@/features/time-off/request/schemas/validationRequestTimeOffSchema';
import axiosInstance from '@/utils/axiosInstance';
import useAuthStore from '@/stores/authStore';
import { format } from 'date-fns';

export default function Page() {
  const { token } = useAuthStore();

  const onHandleRequestTimeOff = async ({
    timeOffType,
    reason,
    date,
    files,
  }: any) => {
    try {
      const formData = new FormData();
      formData.append('timeOffType', timeOffType);
      formData.append('reason', reason);
      formData.append('date', date);

      files.forEach((file: File) => {
        formData.append('evidence', file);
      });

      await axiosInstance.post('/api/time-off/request', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      timeOffType: '',
      reason: '',
      date: '',
      files: [] as File[],
    },
    onSubmit: (values) => {
      onHandleRequestTimeOff({
        timeOffType: values?.timeOffType,
        reason: values?.reason,
        date: values?.date,
        files: values?.files,
      });
    },
    validationSchema: validationRequestTimeOffSchema,
  });

  return (
    <>
      <HeaderTitle title='Request Time Off' />

      {/* Form Request Time Off */}
      <form onSubmit={formik?.handleSubmit}>
        <div className='px-4 py-2'>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiClockCountdownDuotone className='text-2xl text-gray-500' />
            <select
              id='timeOffType'
              name='timeOffType'
              onChange={formik.handleChange}
              value={formik.values.timeOffType}
              className='select w-full bg-gray-100 text-gray-500 border-none'
            >
              <option>Time off type</option>
              <option value='IZIN_MENIKAH'>IZIN_MENIKAH</option>
            </select>
            {formik?.errors.timeOffType && formik?.touched?.timeOffType && (
              <div id='feedback'>{formik?.errors.timeOffType}</div>
            )}
          </div>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <IoCalendarOutline className='text-2xl text-gray-500' />
            <button
              type='button'
              popoverTarget='rdp-popover'
              className='input bg-gray-100 w-full border-none text-gray-500'
              style={{ anchorName: '--rdp' } as React.CSSProperties}
            >
              {formik?.values?.date
                ? formik.values.date.toString().split('T')[0]
                : 'Select date'}
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
                selected={
                  formik?.values?.date
                    ? new Date(formik?.values?.date)
                    : undefined
                }
                onSelect={(date) =>
                  formik?.setFieldValue('date', format(new Date(date!), 'yyyy-MM-dd'))
                }
              />
            </div>
            {formik?.errors.date && formik?.touched?.date && (
              <div id='feedback'>{formik?.errors.date}</div>
            )}
          </div>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiListPlusDuotone className='text-2xl text-gray-500' />
            <input
              id='reason'
              name='reason'
              onChange={formik?.handleChange}
              value={formik?.values?.reason}
              type='text'
              placeholder='Reason'
              className='input border-none text-gray-500 bg-gray-100'
            />
            {formik?.errors.reason && formik?.touched?.reason && (
              <div id='feedback'>{formik?.errors.reason}</div>
            )}
          </div>
          <fieldset className='flex items-center gap-2 py-2 border-b-1 border-gray-300 mt-1'>
            <legend className='font-bold text-xs text-gray-500'>
              Upload File Evidence
            </legend>
            <MdOutlineDriveFolderUpload className='text-2xl text-gray-500' />
            <input
              id='files'
              name='files'
              onChange={(e) => {
                console.log(e.currentTarget.files);
                if (e?.currentTarget?.files) {
                  if (e.currentTarget.files) {
                    formik.setFieldValue(
                      'files',
                      Array.from(e.currentTarget.files)
                    );
                  }
                }
              }}
              type='file'
              className='file-input w-full'
              multiple
            />
          </fieldset>
          {formik.touched.files && Array.isArray(formik.errors.files) && (
            <div id='feedback'>{formik?.errors?.files.toString()}</div>
          )}
        </div>
        <div className='px-4 py-3 w-full border-gray-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto'>
          <button className='btn bg-green-500  hover:bg-green-600 text-white w-full'>
            Submit Request
          </button>
        </div>
      </form>
    </>
  );
}
