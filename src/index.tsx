import React, { Suspense } from 'react'
import { Fragment } from 'react';
import ReactDOM from 'react-dom/client'
import './App.css'

function Loading() {
  return (
    <div className='flex justify-center items-center h-screen w-screen fixed bg-ctp-mantle'>
      <div className='flex flex-row justify-center items-center w-40 h-10 bg-ctp-surface0 rounded-full gap-4'>
        <img src='/loadingCircle.png' className='animate-spin size-7'/>
        <h1 className='text-ctp-peach text-lg'>LOADING...</h1>
      </div>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        {/* center of screen div */}
        <div className='flex flex-col justify-center items-center h-screen w-screen fixed gap-5'>
          <div className='flex flex-col bg-ctp-base w-fit h-fit p-5 rounded-2xl gap-5'>
            <h1 className='text-ctp-text text-center text-5xl'>Yo.... waddup...</h1>
            <h1 className='text-ctp-subtext0 text-center text-sm'>welcome to the kart site thing</h1>
          </div>
          <div className='flex flex-col bg-ctp-base w-fit h-fit p-5 rounded-2xl gap-2'>
            <h1 className='text-ctp-text text-center text-3xl'>here are various cool things i may have done</h1>
            <h1 className='text-ctp-subtext0 text-center text-sm'>im not too sure either</h1>
            <div className='grid grid-cols-2 grid-rows-2 gap-5]'>
            </div>
          </div>
        </div>
        {/* top bar thing area */}
        <div className="flex items-center justify-center sticky">
          <div className="bg-ctp-surface0 flex flex-row h-15 w-fit gap-5 pr-2 pl-2 items-center rounded-full m-2">
            <button className='text-ctp-peach border-2 bg-ctp-surface0 pl-5 pr-5 p-2 rounded-full flex justify-center items-center hover:bg-ctp-mantle transition duration-250'>cool stuff</button>
            <img src='/kartBrand.png' alt='Drawing of an orange and white square cat face' className='flex h-15 w-15' />
            <button className='text-ctp-peach border-2 bg-ctp-surface0 pl-5 pr-5 p-2 rounded-full flex justify-center items-center hover:bg-ctp-mantle transition duration-250'>vidja games</button>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)