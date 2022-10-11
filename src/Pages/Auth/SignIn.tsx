import { LockClosedIcon } from '@heroicons/react/solid'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from '../../Components/ErrorModal';
import { UserData, ResponseData } from '../../features/types';
import { loginUserAsync } from '../../features/user/userSlice';
import { selectUserState, useAppDispatch, useAppSelector } from '../../hooks';
import logo from '../../icons/eyekontact-icon.png';
import { AppStateMachine, HTTPCode } from '../../Utils';


const SignIn = () => {
    const dispatch = useAppDispatch();
    let navigate = useNavigate();

    const rootState = useAppSelector((state) => state.root);
    const userState = useAppSelector(selectUserState);
    const [error, setError] = useState({ errorCode: 200, message: "" });

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userState.loginState == AppStateMachine.Pending)
            return;
        const formElem = event.target as HTMLFormElement;

        const userData: UserData = {
            email: (formElem.querySelector("#email-address") as HTMLInputElement).value as string,
            password: (formElem.querySelector("#password") as HTMLInputElement).value as string,
        }

        const result = await dispatch(loginUserAsync(userData));
        let error = result.payload as ResponseData;

        if (error.code == HTTPCode.FORBIDDEN || error.code == HTTPCode.SERVER_ERROR)
            return setError({ errorCode: error.code, message: error.message });

        navigate("/");
    }

    return (
        <>
            <ErrorModal show={rootState.state === AppStateMachine.Error && rootState.category === "user"} />
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
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">Sign in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
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
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    minLength={5}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`group ${userState.loginState == AppStateMachine.Pending ? "cursor-wait opacity-40" : ""} relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600  hover:bg-rose-700 focus:outline-none`}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-rose-500 group-hover:text-rose-400" aria-hidden="true" />
                                </span>
                                Sign in
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

export default SignIn;