import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import type { SignUp } from '../types/auth';
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUser } from '../api/auth';
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const { register, formState: { errors }, handleSubmit } = useForm<SignUp>()
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<SignUp> = async (data) => {
    mutate(data)
  }


  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate("/login")
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
      console.log("error: ", error.response.data.message)
    }
  });

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden text-[#fafafa] font-sans selection:bg-indigo-500/30">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold tracking-tight text-white">SillyAI</span>
          </Link>
          {/* <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create an account</h1> */}
        </div>

        <div className="glass-panel p-8 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden bg-[#09090b]/40 backdrop-blur-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-zinc-500" />
                </div>
                <input
                  {...register("fullName", {
                    required: { value: true, message: "Full name is required" },
                    minLength: { value: 3, message: "Full name must be at least 3 characters long" }
                  })}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-[#18181b]/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                />

                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-zinc-500" />
                </div>
                <input
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-[#18181b]/50 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-zinc-500" />
                </div>
                <input
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                    minLength: { value: 6, message: "Password must be at least 6 characters long" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-[#18181b]/50 border border-white/10 rounded-xl pl-11 pr-11 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                  style={{ top: '0', bottom: 'auto', height: '54px' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white transition-all hover:scale-[1.02] shadow-xl shadow-indigo-500/20 mt-4"
            >
              {isPending ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : <>Create Account <ArrowRight size={18} /> </>
              }
            </button>
          </form>

          <div className="mt-8 relative z-10">
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-zinc-500 uppercase font-medium tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <div className="flex justify-center w-full items-center gap-3 mt-4">
              {/* <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-sm font-medium">
                <Github size={18} />
                GitHub
              </button> */}
              <button className="flex flex-1 items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-sm font-medium">
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                  </g>
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-zinc-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-medium hover:text-indigo-400 transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
