import React from 'react';
import Header from '../component/Header';

export default function Home() {
    return (
        <div>
            <Header />
            <div className='pt-32 pb-32'>
                <div className="text-center">
                    <p className="text-xl text-gray-600">Welcome to our chat application!</p>
                    <p className="text-lg text-gray-500 mt-8">Create an account to start chatting with friends.</p>
                    <button className="relative inline-flex mt-12 h-16 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-lg font-medium text-white backdrop-blur-3xl">
                            Create Account
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
