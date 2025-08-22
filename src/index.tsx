import React, { Suspense, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import react from '@vitejs/plugin-react-swc';

const root = ReactDOM.createRoot(document.getElementById('root')!);

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

function ToolbarButton({
	contents,
	onClick,
}: {
	contents: React.ReactNode;
	onClick: () => any;
}) {
	return (
		<div
			onClick={onClick}
			className="text-center text-ctp-peach border-2 bg-ctp-surface0 pl-5 pr-5 p-2 rounded-full flex justify-center items-center hover:bg-ctp-mantle transition duration-250 cursor-pointer"
		>
			{contents}
		</div>
	);
}

function Root() {
	const [iWillKillYou, setMC] = useState(0);

	const [fadeStatus, setFade] = useState(false);
	const [popupStatus, setPopup] = useState(false);
	const [popupClear, setClear] = useState('clear');
	const [popupBody, setBody] = useState('body');
	const [popupSub, setSub] = useState('sub');
	fadeStatus: Boolean;
	popupStatus: Boolean;
	popupSub: String;
	popupBody: String;
	popupClear: String;

	function Alert() {
		return (
			<>
				<div
					className={`flex backdrop-blur-sm h-screen w-screen bg-ctp-mantle/50 items-center justify-center absolute ${
						popupStatus
							? 'animate-[fadeIn_0.5s_ease-in-out_forwards] pointer-events-auto'
							: 'animate-[fadeOut_0.5s_ease-in-out_forwards] pointer-events-none'
					}`}
				/>
				<div
					className={`flex invisible h-screen w-screen absolute items-center justify-center ${
						popupStatus
							? 'animate-[fadeIn_0.5s_ease-in-out_forwards] pointer-events-auto'
							: 'animate-[fadeOut_0.5s_ease-in-out_forwards] pointer-events-none'
					}`}
				>
					<div className="visible bg-ctp-base w-fit min-w-100 max-w-200 min-h-50 max-h-1080 p-5 h-fit flex flex-col rounded-2xl items-center">
						<div className="invisible h-fit basis-20 w-relative">
							<h1 className="visible text-ctp-text text-6xl text-center">
								{popupSub}
							</h1>
						</div>
						<div className="invisible h-fit basis-10 w-relative">
							<h1 className="visible text-ctp-subtext0 text-2xl text-center">
								{popupBody}
							</h1>
						</div>
						<div className="invisible h-fit basis-20 w-relative flex justify-center items-center">
							<button
								className="visible text-center text-ctp-text border-2 bg-ctp-surface0 pl-5 pr-5 p-2 rounded-full hover:bg-ctp-surface1 transition duration-250 cursor-pointer"
								onClick={() => setPopup(false)}
							>
								{popupClear}
							</button>
						</div>
					</div>
				</div>
			</>
		);
	}

	function CreatePopup(subT, bodyT, clearT) {
		subT: String;
		bodyT: String;
		clearT: String;

		setFade(true);
		setSub(subT);
		setBody(bodyT);
		setClear(clearT);
		setPopup(true);
	}

	function clickTheBart() {
		setMC((prev) => prev + 1);
		if (iWillKillYou === 20) {
			CreatePopup('bro', 'can you not', 'sorry');
		}
	}

	const [page, setPage] = useState<string>('home');
	const pages: { [key: string]: React.ReactNode } = {
		home: (
			<div className="flex justify-center items-center w-full h-screen flex-col">
				<div className="flex flex-col bg-ctp-mantle w-fit h-fit p-5 rounded-tl-2xl rounded-tr-2xl gap-5">
					<h1 className="text-ctp-text text-center text-5xl">
						Yo.... waddup...
					</h1>
					<h1 className="text-ctp-subtext0 text-center text-sm">
						welcome to the kart site thing
					</h1>
					<button
						onClick={() =>
							CreatePopup(
								'hello',
								'heyyyy haiiii heyyy heeyyyoooo heiiiii haiii :3',
								'leave me alone'
							)
						}
						className="text-center text-ctp-text border-2 bg-ctp-surface0 pl-5 pr-5 p-2 rounded-full hover:bg-ctp-surface1 transition duration-250 cursor-pointer"
					>
						hello
					</button>
				</div>
			</div>
		),
		projects: (
			<div className="flex justify-center items-center w-full h-screen flex-col">
				<h1>s4mi is awesome</h1>
			</div>
		),
	};

	return (
		<Suspense fallback={<Loading />}>
			<div className="text-ctp-text">
				<div className="group w-full fixed overflow-hidden h-20">
					<div className="w-full transform translate-y-[-5rem] transition-all duration-400 ease-in-out group-hover:translate-y-0">
						<div className="bar flex items-center justify-center">
							<div className="bg-ctp-surface0 flex flex-row h-15 w-fit gap-5 pr-2 pl-2 items-center rounded-full m-2">
								<img
									src="/assets/images/kartBrand.png"
									className="h-15 w-15"
									onClick={clickTheBart}
								/>
								{Object.keys(pages).map((e) => (
									<ToolbarButton
										contents={
											e[0].toUpperCase() + e.slice(1)
										}
										onClick={() => setPage(e)}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* popup */}
				{fadeStatus ? <Alert /> : null}
				{/* center of screen div */}
				{pages[page]}
			</div>
		</Suspense>
	);
}

root.render(<Root />);
