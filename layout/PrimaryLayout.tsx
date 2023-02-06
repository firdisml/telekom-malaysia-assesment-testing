import React from "react";
import axios from "axios";
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, InformationCircleIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";


const navigation = [
    { name: 'Home', href: '/dashboard', current: true },
    { name: 'Transaction', href: '/transaction', current: false },
    { name: 'Transfer', href: '/transfer', current: false },
    { name: 'Profile', href: '/profile', current: false },
] 

{/* @ts-ignore */ }
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

{/* @ts-ignore */ }
function PrimaryLayout(props) {

    const router = useRouter()



    /* @ts-ignore */
    const handle_logout = async (e) => {

        const id = toast.loading('Logging out')

        try {
            await axios.post('/api/logout', {
                /* @ts-ignore*/
                "login_id": props?.children?.props?.user?.id,
            },
                {
                    headers: { "Content-Type": "application/json" },
                })

            toast.update(id, {
                render: "Success", type: "success", isLoading: false, position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            await router.push('/')

        } catch (error) {

            toast.update(id, {
                render: "Invalid Credential", type: "error", isLoading: false,
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }

    }

    return (<>
        <div className="min-h-screen">
            <Popover as="header" className="pb-24 bg-indigo-600">
                {({ open }) => (
                    <>
                        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <div className="relative py-5 flex items-center justify-center lg:justify-between">
                                {/* Logo */}
                                <div className="absolute left-0 flex-shrink-0 lg:static">
                                    <a href="#">
                                        <svg fill="none" className="h-9 w-9 text-white mx-auto" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"></path>
                                        </svg>
                                    </a>
                                </div>

                                {/* Right section on desktop */}
                                <div className="hidden lg:ml-4 lg:flex lg:items-center lg:pr-0.5">
                                    <button
                                        type="button"
                                        onClick={handle_logout}
                                        className="flex-shrink-0 px-2 py-2 font-medium text-indigo-200 rounded-md hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white"
                                    >
                                        Logout

                                    </button>


                                </div>

                                {/* Search */}
                                <div className="flex-1 min-w-0 px-12 lg:hidden">
                                    <div className="max-w-xs w-full mx-auto">
                                        <label htmlFor="desktop-search" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative text-white focus-within:text-gray-600">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                                <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="desktop-search"
                                                className="block w-full bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                                                placeholder="Search"
                                                type="search"
                                                name="search"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Menu button */}
                                <div className="absolute right-0 flex-shrink-0 lg:hidden">
                                    {/* Mobile menu button */}
                                    <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="hidden lg:block border-t border-white border-opacity-20 py-5">
                                <div className="grid grid-cols-3 gap-8 items-center">
                                    <div className="col-span-2">
                                        <nav className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    scroll={false}
                                                    href={item.href}
                                                    className={classNames(
                                                        router.route.includes(item.href)
                                                            ? "text-white bg-opacity-10"
                                                            : "text-gray-200 bg-opacity-0 hover:bg-opacity-10",
                                                        "rounded-md bg-white px-3 py-2 text-sm font-medium "
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Transition.Root as={Fragment}>
                            <div className="lg:hidden">
                                <Transition.Child
                                    as={Fragment}
                                    enter="duration-150 ease-out"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="duration-150 ease-in"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                                </Transition.Child>

                                <Transition.Child
                                    as={Fragment}
                                    enter="duration-150 ease-out"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="duration-150 ease-in"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Popover.Panel
                                        focus
                                        className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                                    >
                                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                                            <div className="pt-3 pb-2">
                                                <div className="flex items-center justify-between px-4">
                                                    <div>
                                                        <svg fill="none" className="h-9 w-9 mx-auto" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"></path>
                                                        </svg>
                                                    </div>
                                                    <div className="-mr-2">
                                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                            <span className="sr-only">Close menu</span>
                                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                                <div className="mt-3 px-2 space-y-1">
                                                    <Link
                                                        href="/dashboard"
                                                        scroll={false}
                                                        className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                    >
                                                        Home
                                                    </Link>
                                                    <Link
                                                        href="/transaction"
                                                        scroll={false}
                                                        className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                    >
                                                        Transaction
                                                    </Link>
                                                    <Link
                                                        href="/transfer"
                                                        scroll={false}
                                                        className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                    >
                                                        Transfer
                                                    </Link>
                                                    <Link
                                                        href="/profile"
                                                        scroll={false}
                                                        className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                    >
                                                        Profile
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="pt-2 pb-2">
                                                <div className="px-2 space-y-1">
                                                <a
                                                            onClick={handle_logout}
                                                            className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                                                        >
                                                            Logout
                                                        </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition.Child>
                            </div>
                        </Transition.Root>
                    </>
                )}
            </Popover>
            <main className="-mt-24 pb-8">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="sr-only">Page title</h1>
                    {/* Main 3 column grid */}
                    <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
                        {/* Left column */}
                        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                            <section aria-labelledby="section-1-title">
                                <h2 className="sr-only" id="section-1-title">
                                    Section title
                                </h2>
                                <div className="rounded-lg bg-white overflow-hidden shadow">
                                    {props.children}
                                </div>
                            </section>
                        </div>

                        {/* Right column */}
                        <div className="grid grid-cols-1 gap-4">
                            <section aria-labelledby="section-2-title">
                                <h2 className="sr-only" id="section-2-title">
                                    Section title
                                </h2>
                                <div className="rounded-lg bg-white overflow-hidden shadow">
                                    <div className="p-6">
                                        <div className="w-full px-5 pb-8 pt-4 bg-gradient-to-r from-gray-600 to-black rounded-lg">
                                            <h1 className="text-3xl font-semibold text-gray-100 pb-7 italic underline">Savvy</h1>
                                            <div className="flex justify-between items-center">
                                                <span className="text-md font-medium italic text-gray-200 shadow-2xl">{props?.children?.props?.user?.name}</span>
                                                <picture className="mr-6">
                                                    <img src="https://img.icons8.com/offices/80/000000/sim-card-chip.png" alt="" width="48" />
                                                </picture>
                                            </div>
                                            <div className="flex justify-between items-center pt-4">
                                                <span className="text-3xl text-gray-300 font-bold">**** **** **** ****</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-md bg-blue-100 p-4 mt-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 flex-1 md:flex md:justify-between">
                                            <p className="text-sm text-blue-700">Last updated recently</p>
                                            <p className="mt-3 text-sm md:mt-0 md:ml-6">
                                                <Link href="/profile" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                                                    Details <span aria-hidden="true">&rarr;</span>
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="flex shadow-sm rounded-md">
                                <div
                                    className='flex-shrink-0 bg-indigo-500 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                                >
                                    <svg fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                    <div className="flex-1 px-4 py-2 text-sm truncate">
                                        <a href={""} className="text-gray-900 font-medium hover:text-gray-600">
                                            Account Balance
                                        </a>
                                        <p className="text-gray-500">MYR {props?.children?.props?.user?.bankAccountBalance.toFixed(2)}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="flex shadow-sm rounded-md">
                                <div
                                    className='flex-shrink-0 bg-indigo-500 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                                >
                                    <svg fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                    <div className="flex-1 px-4 py-2 text-sm truncate">
                                        <a href={""} className="text-gray-900 font-medium hover:text-gray-600">
                                            Account Number
                                        </a>
                                        <p className="text-gray-500"> {props?.children?.props?.user?.bankAccountNo}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                    <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
                        <span className="block sm:inline">&copy; 2023 Savvy Inc.</span>{' '}
                        <span className="block sm:inline">All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    </>)
}

export default PrimaryLayout;



