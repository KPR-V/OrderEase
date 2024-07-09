import Link from 'next/link';
import Passwordfield from '../login/passwordfield';
import { User } from '@/models/user';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import { signUpSchema } from '@/components/formzod';
import { redirect } from 'next/navigation';
import { connectdb } from "@/components/connectdb.js"
const RegisterPage = async () => {
  const session = await auth()
  if (session?.user) redirect("/admin-dashboard")

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />
      <div className="w-full h-full flex justify-center items-center flex-col text-white">
        <div className='flex flex-col justify-evenly gap-9 items-center backdrop-blur-sm p-5 border-solid border-3 border-black rounded-md w-full lg:w-2/3'>
          <h3 className="text-2xl sm:text-3xl mb-3 font-extrabold text-black font-bungee">Create Account</h3>


          <form className="flex flex-col gap-3 justify-center font-changa items-center w-full sm:w-2/3 md:w-2/3 lg:w-2/3 xl:w-2/3"

            action={async (formdata) => {
              "use server"
              const name = formdata.get('name')
              const email = formdata.get('email')
              const password = formdata.get('password')

              if (!name || !email || !password) {
                throw new Error('please fill all fields')
              }

              try {
                await signUpSchema.parseAsync({ name, email, password })
              } catch (error) {
                throw new Error("Invalid input")
              }

              await connectdb()


              const user = await User.findOne({ email: email })

              const hash = await bcrypt.hash(password, 10)

              if (user) {
                user.password = hash
                await user.save()
                redirect('/login')
              }


              await User.create({
                name,
                email,
                password: hash
              })

              redirect('/login')
            }}  >




            <input
              className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800"
              type="text"
              placeholder="name"
              name="name"
            />
            <input
              className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800"
              type="email"
              placeholder="email"
              name="email"
            />
            <Passwordfield />
            <input
              className="px-5 text-sm sm:text-lg md:text-lg lg:text-xl xl:text-2xl py-2 cursor-pointer rounded-md bg-blue-500 text-black"
              type="submit"
              value="Sign Up"
            />
          </form>
          <div className='bg-zinc-800 opacity-90 h-1 w-1/3'></div>
          <div className="flex flex-col gap-3 mt-3">
            <Link href="/login">
              <button type='submit' className='text-sm sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-changa cursor-pointer rounded-md border-3 text-black bg-orange-500 py-2 px-3 outline-none'>
                Already have an account?
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
