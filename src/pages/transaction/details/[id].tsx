import React, { useState } from 'react';
import PrimaryLayout from "layout/PrimaryLayout";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from '@tanstack/react-query'
import { DateTime } from 'luxon'

const fetch_unique_employer_transaction = async (param: any) => {
  const fetch_transaction = await axios.get(
    `https://web-assessment.apps.ocp.tmrnd.com.my/api/transaction/${param}`, {
    headers: {
      "Content-Type": "application/json",
      "API-KEY": "firdausfitri010199@gmail.com",
    },
  }
  );
  return fetch_transaction.data;
};
function Index() {

  const router = useRouter();
  const param = router.query.id;
  const [date, set_date] = useState()

  const transaction = useQuery(
    ["transaction", param],
    () => fetch_unique_employer_transaction(param)
    , {
      onSuccess: (data) => {
        /* @ts-ignore */
        set_date((DateTime.fromISO(data.datetime).toLocaleString(DateTime.DATETIME_MED)).toUpperCase())
      }
    });

  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Transaction Details</h3>
          <p className="flex mt-1 max-w-2xl text-sm text-gray-500">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2 text-green-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className='mt-0.5'> Transaction {transaction?.data?.status ? "Unsuccessful" : "Successful"}</p>

          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Transaction ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{transaction?.data?.id}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <dt className="text-sm font-medium text-gray-500">Recipient's Account Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{transaction?.data?.recipient}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <dt className="text-sm font-medium text-gray-500">Sender's Account Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{transaction?.data?.sender}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Transaction Amount</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{transaction?.data?.value}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Transaction Amount</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{transaction?.data?.status ? "Unsuccessful" : "Successful"}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Transaction Time</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{date}</dd>
            </div>
          </dl>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            onClick={() => router.push('/transaction')}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back
          </button>
        </div>
      </div>
    </>
  )
}

export default Index

Index.PageLayout = PrimaryLayout

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {

  const {
    req,
    res,
  } = ctx;

  const id = req.cookies['auth']

  try {
    const fetch_user = await axios.get(
      `https://web-assessment.apps.ocp.tmrnd.com.my/api/user/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-KEY": "firdausfitri010199@gmail.com",
        },
      })

    return { props: { user: fetch_user.data } };
  } catch (error) {
    return { redirect: { statusCode: 307, destination: "/" } }
  }
};