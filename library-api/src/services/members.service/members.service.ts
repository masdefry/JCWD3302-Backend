import { format } from 'date-fns';
import { IMembersProps } from './types';
import pool from '../../db/connection';

export const createMemberService = async ({
  fullname,
  phonenumber,
}: Omit<IMembersProps, 'id'>) => {
  const memberId = `mmbr_${phonenumber}_${format(new Date(), 'yyyyMMdd')}`;

  // Checking existing phone number (already registered or not)
  const findMemberByPhoneNumber = await pool.query(
    `select * from members where phonenumber = $1`,
    [phonenumber]
  );

  // If phone number already registered, throw error (register failed)
  if(findMemberByPhoneNumber.rows.length > 0) throw new Error('Phone number already registered')

  await pool.query(
    `insert into members(id, fullname, phonenumber) values($1, $2, $3)`,
    [memberId, fullname, phonenumber]
  ); // SQL Injection

  return memberId;
};
