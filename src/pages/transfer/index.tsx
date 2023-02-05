import React, { useRef } from 'react'
import PrimaryLayout from "layout/PrimaryLayout";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';


{/* @ts-ignore */ }
function Index(props) {
    const router = useRouter()
    const recepient = useRef()
    const amount = useRef()
    /* @ts-ignore*/
    const handle_transfer = async (e) => {

        e.preventDefault()

        const transfer = await axios.post('https://web-assessment.apps.ocp.tmrnd.com.my/api/transaction',{
            /* @ts-ignore*/
            "recipient": recepient?.current?.value,
            /* @ts-ignore*/
            "sender": props?.user?.bankAccountNo,
            /* @ts-ignore*/
            "amount": amount?.current?.value
          },{
            headers: { "Content-Type": "application/json", "API-KEY": "firdausfitri010199@gmail.com" },
        })

        toast.success('Transfer Success', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        await router.push(`/transaction/details/${transfer.data.id}`)
    }
    return (
        <>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handle_transfer} method="POST">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label htmlFor="first-name" className="mb-3 flex block text-sm font-medium text-gray-700">
                                        <div className="relative mr-4 w-8 h-8 bg-indigo-200 rounded-full flex justify-center items-center text-center p-3 shadow-xl">
                                            <span className="absolute text-3xl left-0 top-0 text-indigo-800">
                                            </span>
                                            1.
                                        </div>
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <p className='mt-1' >Recepient's Account Number</p>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        /* @ts-ignore*/
                                        ref={recepient}
                                        autoComplete="given-name"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label htmlFor="first-name" className="mb-3 flex block text-sm font-medium text-gray-700">
                                        <div className="relative mr-4 w-8 h-8 bg-indigo-200 rounded-full flex justify-center items-center text-center p-3 shadow-xl">
                                            <span className="absolute text-3xl left-0 top-0 text-indigo-800">
                                            </span>
                                            2.
                                        </div>
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <p className='mt-1' >Sender's Account Number</p>
                                    </label>
                                    <input
                                        type="text"
                                        name="first-name"
                                        disabled
                                        value={props?.user?.bankAccountNo}
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="mt-1 bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>


                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6">
                                    <label htmlFor="first-name" className="mb-3 flex block text-sm font-medium text-gray-700">
                                        <div className="relative mr-4 w-8 h-8 bg-indigo-200 rounded-full flex justify-center items-center text-center p-3 shadow-xl">
                                            <span className="absolute text-3xl left-0 top-0 text-indigo-800">
                                            </span>
                                            3.
                                        </div>
                                        <p className='mt-1' >Transfer Amount</p>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        /* @ts-ignore*/
                                        ref={amount}
                                        autoComplete="given-name"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Transfer
                            </button>
                        </div>
                    </div>
                </form>
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