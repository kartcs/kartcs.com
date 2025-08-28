import React, { Suspense, SVGProps, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';

import { 
	BeakerIcon,
	ArrowTopRightOnSquareIcon,
	CodeBracketIcon,
	LinkIcon
 } from '@heroicons/react/16/solid'

import {
	Cog6ToothIcon,
	ComputerDesktopIcon,
	WindowIcon
} from '@heroicons/react/24/outline'
import Projects from './pages/Projects.js';

const root = ReactDOM.createRoot(document.getElementById('root')!);

function Loading() {
	return (
		<div className="flex justify-center items-center h-screen w-screen absolute bg-ctp-base z-50">
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
			className="text-center text-ctp-text border-2 bg-ctp-surface0 pl-5 pr-5 p-2 rounded-full flex justify-center items-center hover:bg-ctp-mantle/50 transition duration-250 cursor-pointer"
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
					className={`flex backdrop-blur-sm h-screen w-screen bg-ctp-mantle/50 items-center justify-center absolute z-10 ${
						popupStatus
							? 'animate-[fadeIn_0.5s_ease-in-out_forwards] pointer-events-auto'
							: 'animate-[fadeOut_0.5s_ease-in-out_forwards] pointer-events-none'
					}`}
				/>
				<div
					className={`z-20 flex invisible h-screen w-screen absolute items-center justify-center ${
						popupStatus
							? 'animate-[fadeIn_0.5s_ease-in-out_forwards] pointer-events-auto'
							: 'animate-[fadeOut_0.5s_ease-in-out_forwards] pointer-events-none'
					}`}
				>
					<div className="visible bg-ctp-base w-fit min-h-50 min-w-100 max-h-1/2 max-w-1/2 p-5 h-fit flex flex-col rounded-2xl items-center">
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
		subT: string,
		bodyT: string,
		clearT: string
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

	function LinkButtons({
		website,
		source
	}: {
		website: string,
		source: string
	}) {
		return (
			<div className={`fixed flex flex-row h-fit w-108 justify-end ${website && source !== '' ? 'gap-2' : ''}`}>
				<div 
					onClick={() => {!website.includes("https://") ? setPage(website) : window.open(website)}}
					className={`${website == "" ? 'invisible h-0 w-0' : 'cursor-pointer h-fit w-fit items-center justify-center opacity-0 hover:bg-ctp-surface0/80 p-1 group-hover:opacity-100 group-hover:bg-ctp-surface0/40 rounded-[.75vw] hover:rounded-[.5vw] duration-200 ease-in-out transition-all'}`}>
					<LinkIcon 
						className='size-6'
					/>
				</div>
				<div 
					onClick={() => window.open(source)}
					className={`${source == "" ? 'invisible h-0 w-0' : 'cursor-pointer h-fit w-fit items-center justify-center opacity-0 hover:bg-ctp-surface0/80 p-1 group-hover:opacity-100 group-hover:bg-ctp-surface0/40 rounded-[.75vw] hover:rounded-[.5vw] duration-200 ease-in-out transition-all'}`}>
					<CodeBracketIcon 
						className='size-6'
					/>
				</div>
			</div>
		)
	}

	const [page, setPage] = useState<string>('home');
	const pages: { [key: string]: React.ReactNode } = {
		home: (
			<div className="flex justify-center items-center w-full h-screen flex-col">
				<div className="flex flex-col bg-ctp-mantle w-fit h-fit max-h-1/2 max-w-1/2 p-5 rounded-2xl gap-5 items-center">
					<h1 className="text-ctp-text text-center text-5xl">
						hello
					</h1>
					<br/>
					<h1 className="text-ctp-subtext0 text-center text-2xl">
						welcome to the kart site thing <br/> this site isnt even close to finished, so there isnt much yet <br/>you can still look around though!!!<br/><br/>(also its entirely broken on mobile)
					</h1>
					<br/>
					<button
						onClick={() =>
							CreatePopup(
								'great question',
								`hover at the top of the screen to show the toolbar!! thats about it!!`,
								'ok thanks'
							)
						}
						className="text-center text-ctp-text border-2 bg-ctp-surface0 p-2 rounded-full hover:bg-ctp-surface1 transition duration-250 cursor-pointer w-fit"
					>
						what am i doing here
					</button>
				</div>
			</div>
		),
		projects: <Projects setPage={setPage}/>,
		tod2: (
			<div className="flex justify-center items-center w-full h-screen flex-col">
				<div className="flex flex-col bg-ctp-mantle w-fit h-fit max-h-1/2 max-w-1/2 p-5 rounded-2xl gap-5 items-center">
					<div className='grid-rows-2 gap-5 w-fit h-fit bg-ctp-mantle'>
						<div className='w-80 h-42 bg-[url(/assets/images/games/tod2/img1.png)] bg-cover bg-center rounded-2xl'/>
						<p>that is the only image i have</p>
					</div>
				</div>
			</div>
		),
	};

	return (
		<Suspense fallback={<Loading />}>
			<div className="text-ctp-text">
				<div className="group w-full fixed overflow-hidden h-1/12 z-5">
					<div className="w-full transform translate-y-[-5rem] transition-all duration-400 ease-in-out group-hover:translate-y-0">
						<div className="bar flex items-center justify-center">
							<div className="bg-ctp-surface0 flex flex-row h-15 w-fit gap-5 pr-2 pl-2 items-center rounded-full m-2">
								<ToolbarButton
									contents={
										'Home'
									}
									onClick={() => PageButtonAction('home')}
								/>
								<img
									src="/assets/images/kartBrand.png"
									className="h-15 w-15"
									onClick={clickTheBart}
								/>
								<ToolbarButton
									contents={
										'Projects'
									}
									onClick={() => PageButtonAction('projects')}
								/>
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
