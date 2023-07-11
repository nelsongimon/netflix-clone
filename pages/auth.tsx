import { useCallback, useState } from 'react';
import Input from "@/components/Input";
import axios from 'axios';
import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';


const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [variant, setVariant] = useState('login');
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])

    const login = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await signIn('credentials', {
                email,
                password,
                callbackUrl: '/profiles'
            });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [email, password]);

    const register = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/register', {
                email,
                name,
                password
            });
            login();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }

    }, [email, name, password, login]);



    return (
        <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 self-center p-16 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input
                                    label="Name"
                                    onChange={(e: any) => setName(e.target.value)}
                                    id="name"
                                    type="name"
                                    value={name}
                                />
                            )}
                            <Input
                                label="Email"
                                onChange={(e: any) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="Password"
                                onChange={(e: any) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 duration-500 hover:bg-red-700">
                            {variant === 'login' ? (
                                <span>
                                    {isLoading ? 'Loading...' : 'Login'}
                                </span>
                            ) : (
                                <span>
                                    {isLoading ? 'Loading...' : 'Register'}
                                </span>
                            )}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30} />
                            </div>
                            <div
                                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                            <span
                                className="text-white ml-3 hover:underline cursor-pointer"
                                onClick={toggleVariant}
                            >
                                {variant === 'login' ? 'Create an account' : 'Sing in'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;