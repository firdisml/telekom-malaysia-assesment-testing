import React, { useState } from "react";
import PrimaryLayout from "layout/PrimaryLayout";
import { GetServerSidePropsContext, GetServerSideProps } from "next";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { InformationCircleIcon } from "@heroicons/react/outline";

{/* @ts-ignore */}
function Index(props) {
  const router = useRouter();
  const [name, set_name] = useState(props.user.name);
  const [id_number, set_id_number] = useState(props.user.idNo);
  const [email, set_email] = useState(props.user.email);
  const [password, set_password] = useState();
  const [password_confirm, set_password_confirm] = useState();
  const [address_1, set_address_1] = useState(props.user.address1);
  const [address_2, set_address_2] = useState(props.user.address2);
  const [city, set_city] = useState(props.user.city);
  const [postcode, set_postcode] = useState(props.user.postcode);
  const [state, set_state] = useState(props.user.postcode);
  const [country, set_country] = useState(props.user.postcode);

  /* @ts-ignore */
  const handle_update = async (e) => {
    e.preventDefault();

    if (password !== password_confirm) {
      return toast.error("Password Not Match", {
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

    await axios.put(
      `https://web-assessment.apps.ocp.tmrnd.com.my/api/user/${props?.user?.id}`,
      {
        name: name,
        idNo: id_number,
        bankAccountBalance: props?.user?.bankAccountBalance,
        password: password_confirm ? password_confirm : props?.user?.password,
        email: email,
        address1: address_1,
        address2: address_2,
        city: city,
        postcode: postcode,
        state: state,
        country: country,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "API-KEY": "firdausfitri010199@gmail.com",
        },
      }
    );

    toast.success("Update Success", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    await router.push(`/profile`);
  };

  return (
    <>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handle_update}>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="name"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    value={name ? name : null}
                    /* @ts-ignore */
                    onChange={(e) => {
                      set_name(e.currentTarget.value);
                    }}
                    autoComplete="name"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="email"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email ? email : null}
                    /* @ts-ignore */
                    onChange={(e) => {
                      set_email(e.currentTarget.value);
                    }}
                    id="email"
                    autoComplete="email"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="idnumber"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    ID Number
                  </label>
                  <input
                    required
                    type="text"
                    name="idnumber"
                    value={id_number ? id_number : null}
                    /* @ts-ignore */
                    onChange={(e) => {
                      set_id_number(e.currentTarget.value);
                    }}
                    id="idnumber"
                    autoComplete="idnumber"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="address_1"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    Adress 1
                  </label>
                  <input
                    required
                    type="text"
                    name="address_1"
                    value={address_1 ? address_1 : null}
                    /* @ts-ignore */
                    onChange={(e) => {
                      set_address_1(e.currentTarget.value);
                    }}
                    id="address_1"
                    autoComplete="address_1"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="address_2"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    Address 2
                  </label>
                  <input
                    required
                    type="text"
                    name="address_2"
                    id="address_2"
                    value={address_2 ? address_2 : null}
                    /* @ts-ignore */
                    onChange={(e) => {
                      set_address_2(e.currentTarget.value);
                    }}
                    autoComplete="address_2"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="city"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <input
                    required
                    type="text"
                    name="city"
                    value={city ? city : null}
                    /* @ts-ignore */
                    onChange={(e) => {
                      set_city(e.currentTarget.value);
                    }}
                    id="city"
                    autoComplete="city"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="postcode"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    Postcode
                  </label>
                  <input
                    required
                    type="text"
                    name="postcode"
                    value={postcode ? postcode : null}
                    /* @ts-ignore */
                    onChange={(e) => {
                      set_postcode(e.currentTarget.value);
                    }}
                    id="postcode"
                    autoComplete="postcode"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="state"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    State
                  </label>
                  <input
                    required
                    type="text"
                    name="state"
                    id="state"
                    value={state ? state : null}
                    /* @ts-ignore */
                    onChange={(e) => {
                      set_state(e.currentTarget.value);
                    }}
                    autoComplete="state"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-3">
                  <label
                    htmlFor="country"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <input
                    required
                    type="text"
                    name="country"
                    id="country"
                    value={country ? country : null}
                    /* @ts-ignore */
                    onChange={(e) => {
                      set_country(e.currentTarget.value);
                    }}
                    autoComplete="country"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon
                      className="h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      You can leave the password boxes empty if you don't want to
                      change your password.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="password"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                     /* @ts-ignore */
                      set_password(e.currentTarget.value);
                    }}
                    id="password"
                    autoComplete="password"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="confirm-password"
                    className="mb-3 flex block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    value={password_confirm}
                    onChange={(e) => {
                        /* @ts-ignore */
                      set_password_confirm(e.currentTarget.value);
                    }}
                    id="confirm-password"
                    autoComplete="confirm-password"
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Index;

Index.PageLayout = PrimaryLayout;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { req, res } = ctx;

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=120"
  );

  const id = req.cookies["auth"];

  try {
    const fetch_user = await axios.get(
      `https://web-assessment.apps.ocp.tmrnd.com.my/api/user/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-KEY": "firdausfitri010199@gmail.com",
        },
      }
    );

    return { props: { user: fetch_user.data } };
  } catch (error) {
    return { redirect: { statusCode: 307, destination: "/" } };
  }
};
