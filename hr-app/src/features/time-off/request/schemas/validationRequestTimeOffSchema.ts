import * as Yup from 'yup';

export const validationRequestTimeOffSchema = Yup.object().shape({
  timeOffType: Yup.string().required('Time off type is required'),
  reason: Yup.string().required('Reason is required'),
  date: Yup.string().required('Date is required'),
  files: Yup.array().of(
    Yup.mixed<File>()
      .test('limitFileSize', 'Maximum file size is 2mb', (file) => {
        const limitFileSize = 2 * 1024 * 1024;
        return file && file.size < limitFileSize;
      })
      .test('formatFileAccepted', 'File format not accepted', (file) => {
        const formatFileAccepted = ['jpg', 'jpeg', 'png'];
        return file && formatFileAccepted.includes(file?.type.split('/')[1]);
      })
  ),
});
