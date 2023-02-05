import { useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const router = useRouter()
  const login_id = useRef()
  const password = useRef()

  {/* @ts-ignore*/ }
  const submit_login = async (e) => {

    e.preventDefault();

    const id = toast.loading('Logging in')

    try {
      await axios.post('/api/login', {
        /* @ts-ignore*/
        "login_id": login_id?.current?.value,
        /* @ts-ignore*/
        "password": password?.current?.value,
      },
        {
          headers: { "Content-Type": "application/json" },
        })

      toast.update(id, {
        render: "Success", type: "success", isLoading: false, position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      await router.push('/dashboard')

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

  return (
    <>
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <picture>
                <img
                  className="h-12 w-auto mx-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </picture>
              <h2 className="mt-6 text-center text-3xl font-medium text-gray-900">Welcome, Savvy</h2>
              <p className="mt-2 text-center text-md font-normal text-gray-900">Log in to your account</p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={submit_login} method="POST" className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-normal text-gray-700">
                      Credential
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        /* @ts-ignore*/
                        ref={login_id}
                        type="string"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-normal text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        /* @ts-ignore*/
                        ref={password}
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <picture>
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
              alt=""
            />
          </picture>
        </div>
      </div>
    </>
  )
}
