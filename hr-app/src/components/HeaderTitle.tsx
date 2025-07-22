import { LuMoveLeft } from 'react-icons/lu';

export default function HeaderTitle({ title }: { title: string }) {
  return (
    <div className='flex items-center bg-green-500 text-white p-4'>
      <LuMoveLeft />
      <h1 className='mx-auto font-bold'>{title}</h1>
    </div>
  );
}
