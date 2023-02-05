import React, { useState } from "react";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import PrimaryLayout from "layout/PrimaryLayout";
import { useQuery } from "@tanstack/react-query";
import { CheckCircleIcon, ChevronRightIcon, UserIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Skeleton from "components/skeleton";
import { DateTime } from 'luxon'
import { useRouter } from "next/router";
import { ScaleIcon, CurrencyDollarIcon, CalculatorIcon } from '@heroicons/react/outline'


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

const cards = [
    { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    { name: 'Account balance', href: '#', icon: ScaleIcon, amount: '$30,659.45' },
    // More items...
]

{/* @ts-ignore */ }
function Index(props) {

    const router = useRouter()
    const [transactions, set_transactions] = useState()

    const _ = useQuery(
        ["transactions", props?.user?.id],
        () => fetch_transactions(props?.user?.id)
        , {
            onSuccess: (data) => {

                set_transactions(data)

            }
        });

    return (<>
        <div className="p-5 bg-gray-200"> 
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <CalculatorIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Transactions</dt>
                                        <dd>
                                            {/* @ts-ignore */}
                                            <div className="text-lg font-medium text-gray-900">{transactions?.length}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <Link href={"/transaction"} scroll={false} className="font-medium text-cyan-700 hover:text-cyan-900">
                                    Check Transactions
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CurrencyDollarIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">Account Balance</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">MYR {props?.user?.bankAccountBalance.toFixed(2)}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <Link href={"/transfer"} scroll={false} className="font-medium text-cyan-700 hover:text-cyan-900">
                                Transfer Money
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-5">
                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="ml-4 mt-2">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => { router.push('/transaction') }}
                                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                All Transactions
                            </button>
                        </div>
                    </div>
                </div>
                <ul role="list" className="divide-y divide-gray-200 rounded-md">
                    {/* @ts-ignore */}
                    {!transactions ? null : transactions ? transactions.slice(0, 4).reverse().map((transaction, index) => (<li key={index}>
                        <Link
                            href={`/transaction/details/${transaction.id}`}
                            className="block hover:bg-gray-50 rounded-md"
                        >
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600 truncate">
                                                {/* @ts-ignore */}
                                                Transaction {transactions ? transactions?.length - index : 0}
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
                    </li>)) : <Skeleton />}</ul>
            </div>
        </div>
    </>)
}

export default Index;

Index.PageLayout = PrimaryLayout;

export const getServerSideProps: GetServerSideProps = async (
    ctx: GetServerSidePropsContext
) => {

    const {
        req,
        res,
    } = ctx;
    

    res.setHeader(
        "Cache-Control",
        "public, s-maxage=10, stale-while-revalidate=120"
      );

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
