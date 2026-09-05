import React, { useMemo, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes, useNavigate } from "react-router";
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

function Directory() {
	let navigate = useNavigate();

	return (
		<div className='flex w-full p-2 bg-[#FFFFFF] border-3 border-solid border-black h-fit list-disc text-[#0000FF] text-[16px] underline flex-col gap-1 pl-6'>
			<li className='hover:cursor-pointer' onClick={() => navigate("/")} title='The home page of sorts'>
				Main
			</li>
			<li className='hover:cursor-pointer' onClick={() => navigate("/About")} title='About me!!'>
				About me
			</li>
			{/* <li className='hover:cursor-pointer' onClick={() => navigate("/Projects")} title='Things I created or had a hand in bringing into this world'>
				Projects
			</li> */}
			<li className='hover:cursor-pointer' onClick={() => navigate("/Links")} title='Things I like and cool people and everything else'>
				Links
			</li>
			<li className='hover:cursor-pointer' onClick={() => navigate("/itisi")} title='random picture i found on twitter i really like it'>
				It is I
			</li>
		</div>
	);
}

function VerticalAd(props: { file: string; destination: string; newtab?: boolean }) {
    let navigate = useNavigate();

    return (
        <div className='h-[240px] w-[120px] bg-[url(/assets/ads/brokenad.png)] bg-contain'>
            <img 
                className='w-full h-full hover:cursor-pointer' 
                onClick={() => props.newtab ? window.open(props.destination, '_blank', 'noopener,noreferrer') : navigate(props.destination)} 
                src={props.file}
            />
            <div className='w-fit h-fit text-[10px] hover:cursor-pointer' onClick={() => navigate("/Ads")}>
                ad
            </div>
        </div>
    );
}

interface IAd {
	src: string;
	link: string;
	newTab: string;
}

function stringToBool(str: string): boolean {
	return str.toLowerCase() === 'true';
}

// there is most certainly a better way to do this

const adDict: { [id: number] : IAd; } = {};
adDict[0] = { src: "/assets/ads/incomplete.png", link : "/incomplete", newTab : "false" }
adDict[1] = { src: "/assets/ads/somethingbig.png", link : "/incomplete", newTab : "false" }
adDict[2] = { src: "/assets/ads/coolad.png", link : "/incomplete", newTab : "false" }
adDict[3] = { src: "/assets/ads/imsoorange.png", link : "/incomplete", newTab : "false" }
adDict[4] = { src: "/assets/ads/hexagonforce.png", link : "/incomplete", newTab : "false" }
adDict[5] = { src: "/assets/ads/winbig.png", link : "/incomplete", newTab : "false" }
adDict[6] = { src: "/assets/ads/jail.png", link : "/incomplete", newTab : "false" }
adDict[7] = { src: "/assets/ads/grub.png", link : "/incomplete", newTab : "false" }
adDict[8] = { src: "/assets/ads/okay.png", link : "/incomplete", newTab : "false" }
adDict[9] = { src: "/assets/ads/sideways.png", link : "/incomplete", newTab : "false" }
adDict[10] = { src: "/assets/ads/coolios.png", link : "https://coolios.artstation.com/", newTab : "true" }
adDict[11] = { src: "/assets/ads/40c.png", link : "/incomplete", newTab : "false" }
adDict[12] = { src: "/assets/ads/commatose.png", link : "/incomplete", newTab : "false" }
adDict[13] = { src: "/assets/ads/unreal.png", link : "/incomplete", newTab : "false" }
// adDict[14] = { src: "/assets/ads/winbig.png", link : "/incomplete", newTab : "false" }
// adDict[15] = { src: "/assets/ads/winbig.png", link : "/incomplete", newTab : "false" }
// adDict[16] = { src: "/assets/ads/winbig.png", link : "/incomplete", newTab : "false" }
// adDict[17] = { src: "/assets/ads/winbig.png", link : "/incomplete", newTab : "false" }
// adDict[18] = { src: "/assets/ads/winbig.png", link : "/incomplete", newTab : "false" }
// adDict[19] = { src: "/assets/ads/winbig.png", link : "/incomplete", newTab : "false" }
// adDict[20] = { src: "/assets/ads/winbig.png", link : "/incomplete", newTab : "false" }

function GetRandomAdInfo() {
	const size = Object.keys(adDict).length;
	const num = Math.floor(Math.random() * (size))

	return [adDict[num].src, adDict[num].link, adDict[num].newTab]
}

function TinyButton(props: { file: string; destination: string; newtab: boolean; title: string;}) {
	let navigate = useNavigate();

	return (
		<img className='w-[88px] h-[31px] hover:cursor-pointer' title={`${props.title}`} src={`${props.file}`} onClick={() => `${props.newtab ? window.open(props.destination, '_blank', 'noopener,noreferrer') : navigate(props.destination)}`}/>
	)
}

function MainPage() {
	let navigate = useNavigate();
	const adList = useMemo(() => Array.from({ length: 2 }, GetRandomAdInfo), []);

	return (
		<div className='flex flex-col bg-black justify-center items-center w-screen h-screen'>
			<div className='flex h-20 max-w-300 w-full min-w-100 text-(--kart-color) top-0 text-[50px] font-bold flex-row gap-5 items-center'>
				<h1>kart.cat</h1>
				<img className='h-[50px] w-[50px]' src='/assets/images/awesomecat.jpg'/>
			</div>
			<div className ='h-50 w-100 bg-[url(/assets/images/karttext.gif)] absolute top-0 bg-contain invisible' />
			<div className='flex flex-row w-full max-w-300 min-w-100 h-fit bg-white bg-origin-border bg-contain p-2 grid-rows gap-7 border-b-3 border-black'>
				welcome to kart.cat... some cool stuff may be here... eventually...
			</div>
			<div className='flex w-full max-w-300 min-w-100 h-800 bg-white flex-row items-center'>
				<div className='flex items-center w-[200px] h-full bg-white p-2 flex-col gap-10'>
					<Directory/>
					{adList.slice(0, 1).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
				</div>
				<div className='w-full h-full bg-white p-2 flex-col border-l-3 border-r-3 border-solid border-black text-[18px]'>
					<h1 className='text-(--kart-color) text-[30px] font-bold italic'>What?</h1>
					<a>this is my awesome site... except i have practically nothing to put here... yet...</a>
					<br/>
					<br/> {/* i HAVE to find a better way to do ts */}
					<h1 className='text-(--kart-color) text-[30px] font-bold italic'>Why?</h1>
					<a>i was bored</a>
					<br/>
					<br/>
					<h1 className='text-(--kart-color) text-[30px] font-bold italic'>Why does it look like this</h1>
					<a>i was bored</a>
					<br/>
					<br/>
					<h1 className='text-(--kart-color) text-[30px] font-bold italic'>What do I do here?</h1>
					<a>welcome to kart cat... this is kart cat... welcome... this is kart cat, welcome, to kart cat... you can do anything at kart cat... anything at all... the only limit is yourself... welcome... to kart cat... welcome, to kart CAT... this IS kart CAT... WELCOME... to KART cat...</a>
					<br/>
					<br/>
					<h1 className='text-(--kart-color) text-[30px] font-bold italic'>What?</h1>
					<a>heres a cat picture i like a lot (you may need to zoom in)</a>
					<img className='h-[40px] w-[60px]' src='/assets/images/norman.jpg'/>
					<a>courtesy of norman</a>
					<br/>
					<br/>
					<h1 className='text-(--kart-color) text-[30px] font-bold italic'>Help</h1>
					<p className='whitespace-break-spaces'>
						{"just click on stuff something will happen probably\n\nprobably"}
					</p>
				</div>
				<div className='flex items-center w-[200px] h-full bg-white p-2 flex-col gap-10'>
					{adList.slice(1, 2).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
				</div>
			</div>
		</div>
	);
}

function Ads() {
    let navigate = useNavigate();
    const adList = useMemo(() => Array.from({ length: 4 }, GetRandomAdInfo), []);

    return (
        <div className='flex flex-col bg-black justify-center items-center w-screen h-screen'>
            <div className='flex h-20 max-w-300 w-full min-w-100 text-(--kart-color) top-0 text-[50px] font-bold flex-row gap-5 items-center'>
                <h1>kart.cat &gt; ads</h1>
                <img className='h-[50px] w-[50px]' src='/assets/images/awesomecat.jpg'/>
            </div>
            <div className='h-50 w-100 bg-[url(/assets/images/karttext.gif)] absolute top-0 bg-contain invisible' />
            <div className='flex flex-row w-full max-w-300 min-w-100 h-fit bg-white bg-origin-border bg-contain p-2 grid-rows gap-7 border-b-3 border-black'>
                cool info about the "ads" on the site...
            </div>
            <div className='flex w-full max-w-300 min-w-100 h-800 bg-white flex-row items-center'>
                <div className='flex items-center w-[200px] h-full bg-white p-2 flex-col gap-10'>
                    <Directory/>
                    {adList.slice(0, 2).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
                </div>
                <div className='w-full h-full bg-white p-2 flex-col border-l-3 border-r-3 border-solid border-black text-[18px]'>
                    <h1 className='text-(--kart-color) text-[30px] font-bold italic'>What?</h1>
                    <p>the ads are not real ads... rather, they redirect to projects, friends, projects made by friends, etc. no you cannot have an ad</p>
                    <br/>
                    <h1 className='text-(--kart-color) text-[30px] font-bold italic'>Why?</h1>
                    <p>i felt like it</p>
                </div>
                <div className='flex items-center w-[200px] h-full bg-white p-2 flex-col gap-10'>
                    {adList.slice(2, 4).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function About() {
	let navigate = useNavigate();
	const adList = useMemo(() => Array.from({ length: 2 }, GetRandomAdInfo), []);

	return (
		<div className='flex flex-col bg-black justify-center items-center w-screen h-screen'>
			<div className='flex h-20 max-w-300 w-full min-w-100 text-(--kart-color) top-0 text-[50px] font-bold flex-row gap-5 items-center'>
				<h1>kart.cat &gt; about</h1>
				<img className='h-[50px] w-[50px]' src='/assets/images/awesomecat.jpg'/>
			</div>
			<div className ='h-50 w-100 bg-[url(/assets/images/karttext.gif)] absolute top-0 bg-contain invisible' />
			<div className='flex flex-row w-full max-w-300 min-w-100 h-fit bg-white bg-origin-border bg-contain p-2 grid-rows gap-7 border-b-3 border-black'>
				hello thats me...
			</div>
			<div className='flex w-full max-w-300 min-w-100 h-800 bg-white flex-row items-center'>
				<div className='flex items-center w-[200px] h-full bg-white p-2 flex-col gap-10'>
					<Directory/>
					{adList.slice(0, 1).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
				</div>
				<div className='w-full h-full bg-white p-2 flex-col border-l-3 border-r-3 border-solid border-black text-[18px]'>
					<h1 className='text-(--kart-color) text-[30px] font-bold italic'>hello</h1>
					<p className='whitespace-break-spaces'>
						{"hey hi hello its me kart/karter/kartcat/kartcs idk (18 and trapped in texas)\ni do stuff in unity, godot, roblox studio, blender, and pretty much anything but unreal sometimes"}
					</p>
					<br/>
					<p>
						and thats IT... literally theres nothing else
					</p>
					<p className='whitespace-break-spaces'>{"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ngenuinely"}</p>
				</div>
				<div className='flex items-center w-[200px] h-full bg-white p-2 flex-col gap-10'>
					{adList.slice(1, 2).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
				</div>
			</div>
		</div>
	)
}

function Links() {
	let navigate = useNavigate();
	const adList = useMemo(() => Array.from({ length: 3 }, GetRandomAdInfo), []);

	return (
		<div className='flex flex-col bg-black justify-center items-center w-screen h-screen'>
			<div className='flex h-20 max-w-300 w-full min-w-100 text-(--kart-color) top-0 text-[50px] font-bold flex-row gap-5 items-center'>
				<h1>kart.cat &gt; links</h1>
				<img className='h-[50px] w-[50px]' src='/assets/images/awesomecat.jpg'/>
			</div>
			<div className ='h-50 w-100 bg-[url(/assets/images/karttext.gif)] absolute top-0 bg-contain invisible' />
			<div className='flex flex-row w-full max-w-300 min-w-100 h-fit bg-white bg-origin-border bg-contain p-2 grid-rows gap-7 border-b-3 border-black'>
				cool things and people and things...
			</div>
			<div className='flex w-full max-w-300 min-w-100 h-800 bg-white flex-row items-center'>
				<div className='flex items-center w-[200px] h-full bg-white p-2 flex-col gap-10'>
					<Directory/>
					{adList.slice(0, 1).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
				</div>
				<div className='w-full h-full bg-white flex-col border-l-3 border-r-3 border-solid border-black text-[18px]'>
					<div className='w-full border-b-3 border-black p-2 items-center justify-center flex flex-col'>
						<h1 className='text-(--kart-color) text-[30px] font-bold italic'>me</h1>
						<div className='flex flex-row items-center justify-self gap-5'>
							<TinyButton file='/assets/badges/awesomecord.png' title='discord' destination='https://discord.com/users/361575984639770625' newtab={true}/>
							<TinyButton file='/assets/badges/thetwitter.png' title='twitter' destination='https://twitter.com/kartdoesstuff' newtab={true}/>
							<TinyButton file='/assets/badges/thegithub.png' title='github' destination='https://github.com/kartcs' newtab={true}/>
						</div>
					</div>
					<div className='w-full border-b-3 border-black p-2 items-center justify-center flex flex-col'>
						<h1 className='text-(--kart-color) text-[30px] font-bold italic'>the goats</h1>
						<div className='flex flex-row items-center justify-self gap-5'>
							<TinyButton file='/assets/badges/coolios.gif' title='coolios' destination='https://coolios.artstation.com/' newtab={true}/>
						</div>
					</div>
					<div className='w-full h-full p-2 items-center justify-center flex flex-col'>
						<h1 className='text-[#F0F0F0] text-[30px] font-bold italic'>i dont have anything else to put here</h1>
						<h1 className='text-[#F0F0F0] text-[30px] font-bold italic'>maybe when i put friends stuff idk</h1>
					</div>
				</div>
				<div className='flex items-center w-[200px] h-full bg-white p-2 flex-col gap-10'>
					{adList.slice(1, 3).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
				</div>
			</div>
		</div>
	)
}

function ItisI() {
	let navigate = useNavigate();

	return (
		<div className='flex w-screen h-screen items-center justify-center flex-col gap-5 bg-black'>
			<div className='bg-[url(/assets/images/itisi.jpg)] h-[500px] w-[500px] bg-contain' title='itisi.jpg'/>
			<a className='hover:cursor-pointer text-[36px] text-[#0000FF] underline' title='why are you here' onClick={() => navigate(-1)}>go back</a>
		</div>
	)
}

function NotFound() {
	let navigate = useNavigate();

	return (
		<div className='flex w-screen h-screen items-center justify-center flex-col gap-5 bg-black'>
			<img src='https://http.cat/images/404.jpg'/>
			<a className='hover:cursor-pointer text-[36px] text-[#0000FF] underline' title='why are you here' onClick={() => navigate(-1)}>go back</a>
		</div>
	)
}

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<MainPage/>}/>
				<Route path="/About" element={<About/>}/>
				<Route path="/Ads" element={<Ads/>}/>
				<Route path="/Links" element={<Links/>}/>
				<Route path="/itisi" element={<ItisI/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</HashRouter>
	)
}

root.render(<App/>);
