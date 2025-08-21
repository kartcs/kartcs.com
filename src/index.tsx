import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router';
import ReactDOM from 'react-dom/client';
import './App.css';
const root = document.getElementById('root');

function Loading() {
	return (
		<div className="flex justify-center items-center h-screen w-screen absolute bg-ctp-base">
			<div className="flex flex-row justify-center items-center w-70 h-20 bg-ctp-surface0 rounded-full gap-4">
				<img
					src="/assets/images/loadingCircle.png"
					className="animate-spin size-15"
				/>
				<h1 className="text-ctp-peach text-3xl">LOADING...</h1>
			</div>
		</div>
	);
}

function ToolbarButton({ link, children }) {
	return (
		<NavLink to={link}>
			<div
				className="text-center text-ctp-peach border-2 bg-ctp-surface0 pl-5 pr-5 p-2 rounded-full flex justify-center items-center hover:bg-ctp-mantle transition duration-250"
				onPointerOver={() => (document.body.style.cursor = 'pointer')}
				onPointerOut={() => (document.body.style.cursor = 'auto')}
			>
				{children}
			</div>
		</NavLink>
	);
}

function AlertButton({ children, subject, body }) {
	return (
		<div
			className="text-center text-ctp-peach border-2 bg-ctp-surface0 pl-5 pr-5 p-2 rounded-full flex justify-center items-center hover:bg-ctp-mantle transition duration-250"
			onPointerOver={() => (document.body.style.cursor = 'pointer')}
			onPointerOut={() => (document.body.style.cursor = 'auto')}
		>
			{children}
		</div>
	);
}

function Home() {
	const [IWillKillYou, setMC] = useState(0);
	const [popupToggle, setPopup] = useState(true);
	const [popupBody, setBody] = useState('body');
	const [popupSub, setSub] = useState('sub');
	const [popupBGT, setBGT] = useState(0);
	const [popupT, setT] = useState(0);

	function clickTheBart() {
		setMC((prev) => prev + 1);
		if (IWillKillYou == 20) {
			console.log('dude');
		}
	}

	return (
		<Suspense fallback={<Loading />}>
			<div className="text-ctp-text">
				<div className="group w-full fixed overflow-hidden h-20">
					<div className="w-full transform translate-y-[-5rem] transition-all duration-400 ease-in-out group-hover:translate-y-0">
						<div className="bar flex items-center justify-center">
							<div className="bg-ctp-surface0 flex flex-row h-15 w-fit gap-5 pr-2 pl-2 items-center rounded-full m-2">
								<AlertButton
									children={'cool stuff'}
									subject={'yo'}
									body={
										'this page isnt quite finished yet!! check back later perchance'
									}
								/>
								<img
									src="/assets/images/kartBrand.png"
									className="flex h-15 w-15"
									onClick={clickTheBart}
								/>
								<ToolbarButton
									children={'vidja games'}
									link={'/games'}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* popup */}
				{/* <div className='backdrop-blur-3xl h-screen w-screen display-none bg-ctp-crust ${popupToggle ? "" : "hidden"} group opacity-0 focus:opacity-50 duration-500'>
					<div className="flex flex-col bg-ctp-mantle w-fit h-fit p-5 rounded-2xl gap-5 opacity-0 group-focus:opacity-100 duration-300">
						<h1 className="text-ctp-text text-center text-5xl">
							{popupSub}
						</h1>
						<h1 className="text-ctp-subtext0 text-center text-sm">
							{popupBody}
						</h1>
					</div>
				</div> */}

				{/* center of screen div */}
				<div className="flex justify-center items-center w-full h-screen">
					<div className="flex flex-col bg-ctp-mantle w-fit h-fit p-5 rounded-2xl gap-5">
						<h1 className="text-ctp-text text-center text-5xl">
							Yo.... waddup...
						</h1>
						<h1 className="text-ctp-subtext0 text-center text-sm">
							welcome to the kart site thing
						</h1>
					</div>
				</div>
			</div>
		</Suspense>
	);
}

ReactDOM.createRoot(root).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/games" element={<Loading />} />
		</Routes>
	</BrowserRouter>
);
