import { LockClosedIcon } from '@heroicons/react/solid'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from '../../Components/ErrorModal';
import { UserData, ResponseData } from '../../features/types';
import { registerUserAsync } from '../../features/user/userSlice';
import { selectUserState, useAppDispatch, useAppSelector } from '../../hooks';
import logo from '../../icons/eyekontact-icon.png';
import { AppStateMachine, HTTPCode } from '../../Utils';
import toast from "react-hot-toast"


const SignUp = () => {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const [error, setError] = useState({ errorCode: 200, message: "" });
    const userState = useAppSelector(selectUserState);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            if (userState.registerState == AppStateMachine.Pending)
                return;
            const formElem = event.target as HTMLFormElement;

            const userData: UserData = {
                firstname: (formElem.querySelector("#first-name") as HTMLInputElement).value as string,
                lastname: (formElem.querySelector("#last-name") as HTMLInputElement).value as string,
                email: (formElem.querySelector("#email-address") as HTMLInputElement).value as string,
                phone: (formElem.querySelector("#phone-number") as HTMLInputElement).value as string,
                password: (formElem.querySelector("#password") as HTMLInputElement).value as string,
                role: "user"
            }

            const result = await dispatch(registerUserAsync(userData));
            let responseData = result.payload as ResponseData;

            if (responseData.code == HTTPCode.CONFLICT || responseData.code == HTTPCode.SERVER_ERROR) {
                toast.error(responseData.message);
                return setError({ errorCode: responseData.code, message: responseData.message });

            }

            toast.success("Sign successful");

            navigate("/login");
        } catch (err) {
            toast.error("Error in signing up");
        }
    }

    return (
        <>
            {/* <ErrorModal show={userState.registerState == AppStateMachine.Error} /> */}
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className='bg-slate-100'></div>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto"
                                src={logo}
                                alt="Workflow"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">Register for an account</h2>
                    </div>
                    <form className="mt-8 space-y-6" action="http://localhost:5000/register" method="post" onSubmit={handleRegister}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="first-name" className="sr-only">
                                    First Name
                                </label>
                                <input
                                    id="first-name"
                                    name="firstname"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="First Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="last-Name" className="sr-only">
                                    Last Name
                                </label>
                                <input
                                    id="last-name"
                                    name="lastname"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md mb-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="phone-number"
                                    name="phone"
                                    type="number"
                                    autoComplete="phone"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Phone Number"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    minLength={5}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none  ${userState.registerState == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""}`}>
                                Sign Up
                            </button>
                        </div>

                        <p className='error-msg text-e_red text-center'>
                            {error.message}
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;