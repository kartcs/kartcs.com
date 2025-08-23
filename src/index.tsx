import React, { Suspense, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

import { 
	ArrowDownOnSquareIcon,
	CodeBracketIcon
 } from '@heroicons/react/16/solid'

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
	const [fadeStatus, setFade] = useState(false);
	const [popupStatus, setPopup] = useState(false);
	const [popupClear, setClear] = useState('clear');
	const [popupBody, setBody] = useState('body');
	const [popupSub, setSub] = useState('sub');

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
					<div className="visible bg-ctp-base w-fit min-h-50 max-h-1/2 max-w-1/2 p-5 h-fit flex flex-col rounded-2xl items-center">
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

	function CreatePopup(
		subT: React.SetStateAction<string>,
		bodyT: React.SetStateAction<string>,
		clearT: React.SetStateAction<string>
	) {
		setFade(true);
		setSub(subT);
		setBody(bodyT);
		setClear(clearT);
		setPopup(true);
	}

	function clickTheBart() {
		CreatePopup('bro', 'can you not', 'sorry');
	}

	function PageButtonAction(e: React.SetStateAction<string>) {
		setFade(false);
		setPage(e);
	}

	const [page, setPage] = useState<string>('home');
	const pages: { [key: string]: React.ReactNode } = {
		home: (
			<div className="flex justify-center items-center w-full h-screen flex-col">
				<div className="flex flex-col bg-ctp-mantle w-fit h-fit max-h-1/2 max-w-1/2 p-5 rounded-2xl gap-5 items-center">
					<h1 className="text-ctp-text text-center text-4xl">
						hello bro
					</h1>
					<br/>
					<h1 className="text-ctp-subtext0 text-center text-2xl">
						welcome to the kart site thing <br/> this site isnt even close to finished, so there isnt much yet <br/>you can still look around though!!!
					</h1>
					<br/>
					<button
						onClick={() =>
							CreatePopup(
								'great question',
								`hover/tap at the top of the screen to show the toolbar!! thats about it!!`,
								'ok thanks'
							)
						}
						className="text-center text-ctp-text border-2 bg-ctp-surface0 pl-5 pr-5 p-2 rounded-full hover:bg-ctp-surface1 transition duration-250 cursor-pointer w-fit"
					>
						what am i doing here
					</button>
				</div>
			</div>
		),
		projects: (
			<div className="flex justify-center items-center w-full h-screen flex-col fixed pointer-events-none">
				<div className='pointer-events-auto flex-col w-150 h-fit min-h-100 max-h-70% rounded-2xl bg-ctp-mantle overflow-scroll items-center p-5 gap-5'>
					<div className='flex rounded-2x1 w-140 h-20 bg-ctp-crust p-2 flex-row'>
						
						<div className='flex-col text-lg text-ctp-text'>
							<h1>
								project name
							</h1>
							<h1 className='text-sm text-ctp-subtext0'>
								this is a really cool project description that really describes this project and everything important about it that you would really want to know!
							</h1>
						</div>
					</div>
					<div className='w-140 h-20 bg-ctp-crust'>
						hellos
					</div>
					<div className='w-140 h-20 bg-ctp-crust'>
						hellos
					</div>
					<div className='w-140 h-20 bg-ctp-crust'>
						hellos
					</div>
					<div className='w-140 h-20 bg-ctp-crust'>
						hellos
					</div>
				</div>
			</div>
		),
	};

	return (
		<Suspense fallback={<Loading />}>
			<div className="text-ctp-text">
				<div className="group w-full fixed overflow-hidden h-1/12">
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
										onClick={() => PageButtonAction(e)}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{fadeStatus ? <Alert /> : null}

				{pages[page]}
			</div>
		</Suspense>
	);
}

root.render(<Root />);
