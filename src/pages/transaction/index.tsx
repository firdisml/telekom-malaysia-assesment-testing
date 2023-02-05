import React, { useState } from 'react';
import PrimaryLayout from "layout/PrimaryLayout";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CheckCircleIcon, UserIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { DateTime } from 'luxon'
import Skeleton from 'components/skeleton';
import Link from 'next/link';
const fetch_transactions = async (
    user_id: string,
) => {
    if (user_id === null) {
        return [];
    } else {
        const fetch_transactions = await axios.get(
            `https://web-assessment.apps.ocp.tmrnd.com.my/api/transactions/${user_id}`,
            {
                headers: { "Content-Type": "application/json", "API-KEY": "firdausfitri010199@gmail.com" },
            }
        );
        return fetch_transactions.data;
    }
};

/* @ts-ignore */
function Index(props) {

    const [transactions, set_transactions] = useState()

    const _ = useQuery(
        ["transactions", props?.user?.id],
        () => fetch_transactions(props?.user?.id)
        , {
            onSuccess: (data) => {

                set_transactions(data)

            }
        });

    return (
        <div>
            <ul role="list" className="divide-y divide-gray-200">
                {/* @ts-ignore */}
                {!transactions ? (<div className='p-5 bg-gray-200'>

                    <label htmlFor="first-name" className="mb-3 mt-3 flex block text-sm font-medium text-gray-700">
                        
                        <div className='flex mx-auto'>
                        <span>
                            <svg
                                id="confirm-tooltip"
                                data-tooltip-content="You can leave this form empty if you do not want to change your password"
                                data-tooltip-place="top"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="mr-2 h-5 w-5 text-gray-500 hover:text-black"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                />
                            </svg>
                        </span>
                        
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        You don't have any transactions
                        </div>

                    </label>
                    {/* @ts-ignore */}
                </div>) : transactions ? transactions.reverse().map((transaction, index) => (<li key={index}>
                    <Link
                        href={`/transaction/details/${transaction.id}`}
                        className="block hover:bg-gray-50"
                    >
                        <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="min-w-0 flex-1 flex items-center">
                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-indigo-600 truncate">
                                            {/* @ts-ignore */}
                                            Transaction {transactions.length - index}
                                        </p>
                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                            <UserIcon
                                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span className="truncate">
                                                {transaction?.recipient}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="hidden md:block">
                                        <div>
                                            <p className="text-sm font-normal text-gray-900 ">
                                                {(DateTime.fromISO(transaction?.datetime).toLocaleString(DateTime.DATE_FULL))}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500">
                                                <CheckCircleIcon
                                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                                    aria-hidden="true"
                                                />
                                                Transaction {transaction?.status ? "Unsuccessful" : "Successful"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ChevronRightIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </Link>
                </li>)) : <Skeleton />}</ul></div>
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