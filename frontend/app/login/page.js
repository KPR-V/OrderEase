import Passwordfield from './passwordfield';
import { signIn } from '@/auth';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/admin-dashboard");
  }

  const handleLogin = async (formdata) => {
    "use server";
    const email = formdata.get("email");
    const password = formdata.get("password");

    if (!email || !password) {
      return "Please provide both email and password";
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        redirectTo: "/admin-dashboard"
      });
    } catch (error) {
      const err = error;
      return err.message;
    }
  };

  return (
    <div className="bg-home bg-cover bg-center bg-gray-800 bg-opacity-50 w-full h-full flex justify-center items-center flex-col text-white ">
      <div className='flex flex-col justify-evenly gap-7 items-center backdrop-blur-sm p-5 border-solid border-3 border-black rounded-md w-full lg:w-2/3'>
        <h3 className="text-xl sm:text-3xl mb-3 font-extrabold text-black font-bungee">Login To Your Account</h3>

        <form className="flex flex-col gap-3 justify-center font-bungee" action={handleLogin}>
          <input className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800" type="email" placeholder="email" name="email" />
          <Passwordfield />
          <input className="px-5 text-sm sm:text-lg md:text-lg lg:text-xl xl:text-2xl py-2 rounded-md bg-blue-500 text-black " type="submit" value="Login" />
        </form>

        <div className='bg-zinc-800 opacity-90 h-1 w-1/3'></div>

        <div className="flex flex-col gap-3 mt-5">


          <form action={async ()=>{
            "use server"
            await signIn("google", {
              redirect: true,
              redirectTo: "/admin-dashboard"
            });
          }}>
            <button type="submit" className="text-white bg-[#244882] hover:bg-[#3a76d3] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2">
              <img className="w-4 h-4 me-2" src="/search.png" alt="" />
              Sign in with Google
            </button>

          </form>
          <form action={async ()=>{
            "use server"
            await signIn("github", {
              redirect: true,
              redirectTo: "/admin-dashboard"
            });
          }}>

            <button type="submit" className="text-white bg-[#222222] focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#000000f1] hover:bg-zinc-800 me-2 mb-2">
              <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
              </svg>
              Sign in with Github
            </button>
          </form>
        </div>

        <div>
          <Link href="/register">
            <button type='submit' className='text-sm sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-bungee cursor-pointer rounded-md border-3 text-black bg-orange-500 py-2 px-3 outline-none'>
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
