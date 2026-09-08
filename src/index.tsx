import React, { useMemo, useEffect, ReactNode } from 'react';
import { useLocation, Link } from 'react-router';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes, useNavigate } from "react-router";
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

interface sProps {
    title: string;
    subtitle: ReactNode;
    adCount?: number;
    adSplit?: number;
    children: ReactNode;
}

export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  }, [hash]);
}


function Shell({ title, subtitle, adCount = 2, adSplit = 1, children }: sProps) {
    const adList = useMemo(() => Array.from({ length: adCount }, GetRandomAdInfo), [adCount]);

    return (
        <div className='flex flex-col bg-black justify-start items-center w-full min-h-screen'>
            <div className='flex h-16 md:h-20 max-w-7xl w-full text-(--kart-color) text-[20px] md:text-[46px] font-bold flex-row gap-3 md:gap-5 items-center px-2 shrink-0'>
                <h1>{title}</h1>
                <img className='h-[35px] w-[35px] md:h-[50px] md:w-[50px]' src='/assets/images/awesomecat.jpg'/>
            </div>
            <div className='flex flex-row w-full max-w-7xl text-[14px] md:text-[16px] h-fit bg-white p-2 border-b-3 border-black shrink-0'>
                {subtitle}
            </div>
            <div className='flex w-full max-w-7xl bg-white flex-row items-stretch flex-1'>
                <div className='flex items-center w-[130px] md:w-[150px] bg-white p-2 flex-col gap-10 shrink-0 border-r-3 border-black md:border-r-0'>
                    <Directory/>
                    {adList.slice(0, adSplit).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
                </div>
                <div className='flex-1 bg-white p-2 flex-col border-r-0 md:border-l-3 md:border-r-3 border-solid border-black text-[14px] md:text-[18px]'>
                    {children}
                </div>
                <div className='hidden md:flex items-center w-[150px] bg-white p-2 flex-col gap-10 shrink-0'>
                    {adList.slice(adSplit, adCount).map(([file, destination, newTab], index) => (
                        <VerticalAd key={index} file={file} destination={destination} newtab={stringToBool(newTab)} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Directory() {
    let navigate = useNavigate();

    return (
        <div className='flex w-full p-2 bg-[#FFFFFF] border-3 border-solid border-black h-fit list-disc text-[14px] md:text-[16px] no-underline flex-col gap-1 pl-4 md:pl-6'>
            <li className='hover:cursor-pointer hover:underline text-[#0000FF]' onClick={() => navigate("/")} title='The home page of sorts'>
                Main
            </li>
            <li className='hover:cursor-pointer hover:underline text-[#0000FF]' onClick={() => navigate("/About")} title='About me!!'>
                About me
            </li>
            <li className='hover:cursor-pointer hover:underline text-[#0000FF]' onClick={() => navigate("/Projects")} title='Things I created or had a hand in bringing into this world'>
                Projects
            </li>
            <li className='hover:cursor-pointer hover:underline text-[#0000FF]' onClick={() => navigate("/Links")} title='Things I like and cool people and everything else'>
                Links
            </li>
            <li className='hover:cursor-pointer hover:underline text-[#0000FF]' onClick={() => navigate("/itisi")} title='random picture i found on twitter i really like it'>
                It is I
            </li>
        </div>
    );
}

function VerticalAd(props: { file: string; destination: string; newtab?: boolean }) {
    let navigate = useNavigate();

    return (
        <div className='h-[200px] w-[100px] md:h-[240px] md:w-[120px] bg-[url(/assets/ads/brokenad.png)] bg-contain bg-no-repeat'>
            <img 
                className='w-full h-full hover:cursor-pointer object-contain' 
                onClick={() => props.newtab ? window.open(props.destination, '_blank', 'noopener,noreferrer') : navigate(props.destination)} 
                src={props.file}
            />
            <div className='w-fit h-fit text-[10px] hover:cursor-pointer' onClick={() => navigate("/Ads")}>
                ad
            </div>
        </div>
    );
}

function GamePreview(props: { thumb: string; destination: string; name: string; desc: string; newtab?: boolean }) {
    let navigate = useNavigate();

    return (
        <div 
            className='bg-[#f1f1f1] hover:cursor-pointer h-[380px] w-[256px] border-[5px] border-black flex flex-col justify-start overflow-hidden' 
            onClick={() => props.newtab ? window.open(props.destination, '_blank', 'noopener,noreferrer') : navigate(props.destination)}
        >
            <img 
                className='h-[256px] w-[256px] object-cover shrink-0' 
                src={props.thumb}
            />
            <div className='w-full flex-1 p-2 flex flex-col justify-start items-start gap-1 text-left'>
                <p className='text-[24px] text-(--kart-color) font-bold leading-tight'>
                    {props.name}
                </p>
                <p className='whitespace-break-spaces text-[14px] leading-snug'>
                    {props.desc}
                </p>
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
adDict[14] = { src: "/assets/ads/festive.png", link : "https://www.merriam-webster.com/dictionary/freak", newTab : "true" }

function GetRandomAdInfo() {
    const size = Object.keys(adDict).length;
    const num = Math.floor(Math.random() * (size));

    return [adDict[num].src, adDict[num].link, adDict[num].newTab];
}

function TinyButton(props: { file: string; destination: string; newtab: boolean; title: string;}) {
    let navigate = useNavigate();

    return (
        <img className='w-[88px] h-[31px] hover:cursor-pointer' title={`${props.title}`} src={`${props.file}`} onClick={() => `${props.newtab ? window.open(props.destination, '_blank', 'noopener,noreferrer') : navigate(props.destination)}`}/>
    );
}

function MainPage() {
    let navigate = useNavigate();
	const adCt = Math.floor(Math.random() * 3) + 2
	const split = Math.round(adCt/2)

    return (
        <Shell title="kart.cat" subtitle='welcome to kart.cat... some cool stuff may be here... eventually...' adCount={adCt} adSplit={split}>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>What?</h1>
            <p>this is my awesome site... except i have practically nothing to put here... yet...</p>
            <br/>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>Why?</h1>
            <p>i was bored</p>
            <br/>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>Why does it look like this</h1>
            <p>i was bored</p>
            <br/>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>What do I do here?</h1>
            <p>welcome to kart cat... this is kart cat... welcome... this is kart cat, welcome, to kart cat... you can do anything at kart cat... anything at all... the only limit is yourself... welcome... to kart cat... welcome, to kart CAT... this IS kart CAT... WELCOME... to KART cat...</p>
            <br/>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>What?</h1>
            <p>heres a cat picture i like a lot (you may need to zoom in)</p>
            <img className='h-[40px] w-[60px]' src='/assets/images/norman.jpg'/>
            <p>courtesy of norman</p>
            <br/>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>Help</h1>
            <p className='whitespace-break-spaces'>
                {"just click on stuff something will happen probably\n\nprobably"}
            </p>
        </Shell>
    );
}

function Ads() {
    let navigate = useNavigate();
	const adCt = Math.floor(Math.random() * 3) + 2
	const split = Math.ceil(adCt/2)

    return (
        <Shell title="kart.cat > ads" subtitle='info on the "ads" that plague the site' adCount={adCt} adSplit={split}>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>What?</h1>
            <p className='whitespace-break-spaces'>
                {"the ads are not real ads... rather, they redirect to projects, friends, projects made by friends, or, quite often nothing at all...\n\nno you cannot have an ad"}
            </p>
            <br/>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>Why?</h1>
            <p className='whitespace-break-spaces'>
                {"sounded funny"}
            </p>
        </Shell>
    );
}

function About() {
    let navigate = useNavigate();
	const adCt = Math.floor(Math.random() * 3) + 2
	const split = Math.ceil(adCt/2)

    return (
        <Shell title="kart.cat > about" subtitle='hey its me its kart' adCount={adCt} adSplit={split}>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>hello</h1>
            <p className='whitespace-break-spaces'>
                {"hey hi hello its me kart/karter/kartcat/kartcs idk (18 and trapped in texas)\ni do stuff in unity, godot, roblox studio, blender, and pretty much anything but unreal sometimes"}
            </p>
            <br/>
            <p>
                and thats IT... literally theres nothing else
            </p>
        </Shell>
    );
}

function Links() {
    let navigate = useNavigate();
	const adCt = Math.floor(Math.random() * 3) + 2
	const split = Math.ceil(adCt/2)

    return (
        <Shell 
            title="kart.cat > links" subtitle='cool things and people and things' adCount={adCt} adSplit={split}>
            <div className='w-full border-b-3 border-black p-2 items-center justify-center flex flex-col'>
                <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>me</h1>
                <div className='flex flex-row items-center gap-2 md:gap-5 flex-wrap justify-center'>
                    <TinyButton file='/assets/badges/awesomecord.png' title='discord' destination='https://discord.com/users/361575984639770625' newtab={true}/>
                    <TinyButton file='/assets/badges/thetwitter.png' title='twitter' destination='https://twitter.com/kartdoesstuff' newtab={true}/>
                    <TinyButton file='/assets/badges/thegithub.png' title='github' destination='https://github.com/kartcs' newtab={true}/>
                </div>
            </div>
            <div className='w-full border-b-3 border-black p-2 items-center justify-center flex flex-col'>
                <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>the goats</h1>
                <div className='flex flex-row items-center gap-5'>
                    <TinyButton file='/assets/badges/coolios.gif' title='coolios' destination='https://coolios.artstation.com/' newtab={true}/>
                </div>
            </div>
        </Shell>
    );
}

function Projects() {
	let navigate = useNavigate();
	const adCt = Math.floor(Math.random() * 3) + 2
	const split = Math.ceil(adCt/2)

    return (
        <Shell title="kart.cat > projects" subtitle='things ive brought into the world for better or for worse' adCount={adCt} adSplit={split}>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>work in progress</h1>
            <p className='whitespace-break-spaces'>
                {"hey so ive only really ever finished one thing\nso like dont expect much here YET..."}
            </p>
            <br/>
            <div className='w-full h-fit pt-10 items-center justify-center'>
                <div className="grid place-items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-auto gap-4">
                    <GamePreview thumb='/assets/images/games/site/source.png' destination='https://github.com/kartcs/kartcs.com' name="kart.cat" desc="the source of kart.cat (sometimes known as kartcs.com)" newtab={true}/>
                    <GamePreview thumb='/assets/images/games/heartattack/logo.png' destination='/Projects/HeartAttack' name="heart attack" desc="geometry dash mod that KILLS you... evil..." newtab={false}/>
                    <GamePreview thumb='/assets/images/games/tod2/size.png' destination='/Projects/Scrapped' name="scrapped" desc="compilation of 'tests' that probably wont see the light of day" newtab={false}/>
                </div>
            </div>
        </Shell>
    );
}

function ProjectsUnfinished() {
    let navigate = useNavigate();
	const adCt = Math.floor(Math.random() * 5) + 2
	const split = Math.ceil(adCt/2)

    useScrollToHash()

    return (
        <Shell title="kart.cat > scrapped" subtitle='things ive withheld from the world for better or for worse' adCount={adCt} adSplit={split}>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>help</h1>
            <p className="text-[16px] whitespace-pre-line">
                {"this is (and will continue to be) a chronological list of games/tests of mine that were never released to the public (formally)\n\
                most of the early ones are really bad, and all of the others are also really bad so be warned\n\
                some games here WERE technically released, but not to a major site or anything, just a few people usually (or a small community of approximately 5 people)\n\
                \n\
                good luck"}
            </p>
            <br/>

            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>directory</h1>
            <p className="text-[16px] whitespace-pre-line">
                {"yes i expect this to be long enough that it requires a directory for ease of use\n\
                this list is COMPLETE, however i probably havent added all of the info for all entries yet...\n\
                if one doesnt redirect it PROBABLY means the section isnt done yet"}
            </p>
            <br/>
            <div className='w-fit h-fit p-2 border-3'>
                <h1>UNITY</h1>
                <div className='pl-5'>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#cargame"><li>car game</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#backroom"><li>backroom</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#shower"><li>shower</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#tod"><li>T.O.D.</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#afterhours"><li>after hours</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#procedural"><li>scarygame</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#automata"><li>automata</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#voxelspace"><li>voxelspace</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#gamejam"><li>gamejam</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#cargame2"><li>car game reborn</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#tod2"><li>T.O.D.2</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#pickslop"><li>pickslop</li></Link>
                </div>

                <br/>
                <h1>GODOT</h1>
                <div className='pl-5'>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#untitled"><li>untitled</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#questionnaire"><li>questionnaire</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#landscaping"><li>landscaping</li></Link>
                    <Link className='text-[16px] hover:cursor-pointer hover:underline text-[#0000FF]' to="/Projects/Scrapped#thescape"><li>thescape</li></Link>
                </div>

            </div>
            <br/>
            <br/>

            <h1 id='cargame' className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>car game (2023)</h1>
            <img src="/assets/images/games/cargame/menustatic.png" className='float-right w-60 md:w-100 m-2 h-fit border-2 border-black' title='menu'/>
            <p className="text-[16px] whitespace-pre-line">
                {"despite it being the first (non vr) game of MANY, theres really not much going for it i fear\n\
                its kinda just the ultimate 5 minutes of gameplay gamejolt horror game... nothingburger...\n\
                \n\
                in the game, you drive (fade in and out) between TWO sets of houses and deliver ONE package to ONE house per set of houses\n\
                you read that right, there was one house per neighborhood to deliver to. out of TWO neighborhoods.\n\
                the gameplay is walk around and press e twice and i wish i was joking"}
            </p>
            <br/>
            <img src="/assets/images/games/cargame/nolighting.png" className='float-left w-60 md:w-80 m-2 h-fit border-2 border-black' title='unlit'/>
            <br/>
            <p className='text-[16px] whitespace-pre-line'>
                {"as for style... it didnt really have any going for it either... it was retroslop from the start\n\
                its also practically pitch black all of the time so you can only really see how bad it was with\
                lighting disabled\n\
                \n\
                ok to be fair it was my first ever pc game so i gotta cut myself some slack but good heavens\n\
                i was destined for mediocrity"}
            </p>
            <br/>

            <h1 id='backroom' className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>ballsrooms (2023)</h1>
            <img src="/assets/images/games/backroom/hallway.png" className='float-right w-60 md:w-100 m-2 h-fit border-2 border-black' title='hallway (level 2)'/>
            <p className="text-[16px] whitespace-pre-line">
                {"the legally mandated really poorly made backrooms game, except i didnt finish mine!!\n\
                the running theory as to why it was discontinued is that i couldnt figure out how to\
                optimize it, which checks out given it was made by me in 2023.\n\
                the final level i made was a poolroom type thing, except every single tile was its own unity primitive cube WITH collision.\
                it probably ran at less than 15 fps on my pc at the time.\
                \n\
                the game itself was absolutely nothing special, visually or gameplay wise. google images textures, low poly models, SRP...\
                the typical horrors.\n\
                at one point in the discord servers existence, i quite literally just said 'yeah no' and archived everything immediately, kicking everyone\
                who was in the server for whatever reason... not sure what that guys deal was!"}
            </p>
            <img src="/assets/images/games/backroom/storage.png" className='float-left w-60 md:w-100 m-2 mb-0 h-fit border-2 border-black' title='warehouse (level 1)'/>
            <br/>
            <p className="text-[16px] whitespace-pre-line">
                {"i only got four floors done before i dropped it, and said floors are so small and non complex that you can beat the game in less than a minute.\
                like without trying. you can just casually beat it in a minute flat.\n\
                \n\
                it also conveniently did not have any threats, although there are spooky pngs that appear sometimes to scare you.\n\
                impossible to lose, very easy, extremely short. 10/10\n\
                \n\
                if i remember correctly, this was a test mostly for interaction (doors, keys, etc)\
                it took quite some time before i actually made my own movement system and whatnot"}
            </p>
            <br/>

            <h1 id='shower' className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>shower (2023)</h1>
            <img src="/assets/images/games/shower/washing.png" className='float-right w-60 md:w-100 m-2 h-fit border-2 border-black' title='menu'/>
            <p className="text-[16px] whitespace-pre-line">
                {"i have almost nothing to say about this one, as it was practically a particle test and modeling practice\n\
                the only real thing of note is that its modeled after my old bathroom before it got renovated\n\n\
                also for some reason it has scp:cb blinking mechanics\n\n\
                and item interaction\n\n\
                i actually have no idea what my goal was with this one"}
            </p>
            <br/>

            <h1 id='tod' className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>T.O.D. (2023)</h1>
            <img src="/assets/images/games/tod/menu.png" className='float-left w-60 md:w-80 m-2 mt-0 ml-0 h-fit border-2 border-black' title='tod menu'/>
            <p className="text-[16px] whitespace-pre-line">
                {"T.O.D. (Tods Of Death) was a game i made based on an inside joke between like 10 people. \n\
                then i proceeded to spend 4 months too many on it.\n\
                \n\
                the 'final state' of the game is strangely solid despite it being VERY early into my unity dev period... \n\n"}
            </p>
            <br/>
            <img src="/assets/images/games/tod/radar.png" className='float-right w-60 md:w-100 m-2 h-fit border-2 border-black' title='radar'/>
            <p className="text-[16px] whitespace-pre-line">
                {"the main gameplay loop is:\n\
                - start a level\n\
                - survive nextbots themed after images of this cat the group arbitrarily named 'tod'\n\
                - after a set amount of time the exit opens and you win\n\
                \n\
                thats it\n\
                \n\
                thats the whole game\n\
                \n\
                of course there was more to it than that... but thats the main idea.\n\
                there were also utility items you could use to fend off the tods, such as a landmine, or to help yourself, like the radar or flashlight.\n\
                the game also featured saferooms that would pause the timer, but make the tods go back to wandering for a while.\n"}
            </p>
            <img src="/assets/images/games/tod/gameplay.gif" className='float-left w-60 md:w-110 m-2 h-fit border-2 border-black' title='old CHAOS mode (all tods)'/>
            <p className="text-[16px] whitespace-pre-line">
                {"overall, kinda proud of myself with this one, especially for the time. my only regret is not knowing how to do visuals at this point,\
                so it uses the base unity srp rendering pipeline with almost no changes to anything. no post, no lighting, nothing.\n\n\
                the games development came to a halt during a vacation i was on, and i wasnt able to work on it for a good month or so due to how bad my laptop was.\n\
                when i got back, i couldnt remember what i was doing, and no matter how hard i tried, i just couldnt get back into the game."}
            </p>
            <br/>
            <p>
                funny fun fact: the game originally released as "in_a_maze_with_3_evil_tods"
            </p>
            <br/>

            <h1 id='afterhours' className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>after hours (2023)</h1>
            <img src="/assets/images/games/afterhours/room.png" className='float-right w-60 md:w-110 m-2 h-fit border-2 border-black' title='store entrance'/>
            <p className="text-[16px] whitespace-pre-line">
                {"your eyes do not decieve you. that is a tj maxx HORROR game.\n\
                \n\
                this game was actually made for my brother, immediately after he got a job at tj maxx. not sure why i did that\n\n\
                despite the context, its strangely advanced. this is probably the first game to feature a fully functional dialogue system,\
                with custom markdown and everything.\n\
                not so surprisingly if you know him, he lost his job before i finished the game, which is INCREDIBLY funny (again, if you know him)"}
            </p>
            <img src="/assets/images/games/afterhours/checkout.png" className='float-left w-60 md:w-100 m-2 h-fit border-2 border-black' title='checkout'/>
            <p className="text-[16px] whitespace-pre-line">
                {"dialogue isnt the only thing going for it though. this was also the first attempt of many to write my own movement.\n\
                not for no reason either, unlike a certain other recreation.... \
                i had to remake the movement for those swinging doors to properly interact with the physics player.\n\
                despite doing all of that, the doors didnt end up working, so you just phase through them in the final version.\n\
                \n\
                SHOCKINGLY, thats still not all. the game also had an entire story. it had a start and (kind of) an ending. it didnt have an actual end screen, \
                but it had the end sequence, whihc is most definitely a first. (i may still not have a game as close to completion as this was...)"}
            </p>
            <br/>

            <h1 id='procedural' className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>scary-game (2023)</h1>
            <p className="text-[16px] whitespace-pre-line">
                {"not done writing these, sorry!!!\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\
                "}
            </p>
        </Shell>
    );
}

function ProjectsHeartAttack() {
    let navigate = useNavigate();
	const adCt = Math.floor(Math.random() * 3) + 2
	const split = Math.ceil(adCt/2)

    return (
        <Shell title="kart.cat > heart attack" subtitle='awesome (really bad) geode mod for geometry dash' adCount={adCt} adSplit={split}>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>What?</h1>
            <p className="text-[16px] whitespace-pre-line">
                {"heart attack is a geometry dash mod i made like 3 years ago with ZERO prior c++ knowledge.\n\
                i sincerely apologize to everyone who previously installed this mod, as it just kinda kills you"}
            </p>
            <br/>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>ok</h1>
            <p className="text-[16px] whitespace-pre-line">
                {"if you for whatever reason WANT to download it (i wouldnt if i were you), its available on ALL platforms for the current version of both gd and geode...\
                \nyou can get it from either of these sources:"}
            </p>
            <p className='no-underline hover:underline text-[#0000FF] text-[24px] hover:cursor-pointer' onClick={() => window.open("https://geode-sdk.org/mods/kart.heartattack", '_blank', 'noopener,noreferrer')} title='geode!!'>Geode<code className='text-[10px]'> (mod provider)</code></p>
            <p className='no-underline hover:underline text-[#0000FF] text-[24px] hover:cursor-pointer' onClick={() => window.open("https://github.com/kartcs/HeartAttack", '_blank', 'noopener,noreferrer')} title='source code!!'>Github<code className='text-[10px]'> (source code)</code></p>
            <br/>
            <h1 className='text-(--kart-color) text-[22px] md:text-[30px] font-bold italic'>what else though</h1>
            <p className="text-[16px] whitespace-pre-line">
                {"it was actually really hard to get the mod accepted into the geode mod index initially...\n\
                the current staff at the time didnt like how originally it had no warning, which is VERY fair looking back on it"}
            </p>
            <img src="/assets/images/games/heartattack/MORON.png" className='float-right w-100 h-47 m-2 border-2 border-black' title='MORON'/>
            <p className="text-[16px] whitespace-pre-line">
                {"i also unfortunately asked many stupid questions relating to development \
                that were very clearly common knowledge.\n\
                and thats why i have the discord server in the credits\n\
                because i felt really bad for being a moron"}
            </p>
        </Shell>
    );
}

function ItisI() {
    let navigate = useNavigate();

    return (
        <div className='flex w-screen h-screen items-center justify-center flex-col gap-5 bg-black p-4'>
            <div className='bg-[url(/assets/images/itisi.jpg)] h-[300px] w-[300px] md:h-[500px] md:w-[500px] bg-contain bg-no-repeat bg-center' title='itisi.jpg'/>
            <a className='hover:cursor-pointer text-[24px] md:text-[36px] text-[#0000FF] underline' title='why are you here' onClick={() => navigate(-1)}>go back</a>
        </div>
    );
}

function NotFound() {
    let navigate = useNavigate();

    return (
        <div className='flex w-screen h-screen items-center justify-center flex-col gap-5 bg-black p-4'>
            <img className='max-w-full h-auto' src='https://http.cat/images/404.jpg'/>
            <a className='hover:cursor-pointer text-[24px] md:text-[36px] text-[#0000FF] underline' title='why are you here' onClick={() => navigate(-1)}>go back</a>
        </div>
    );
}

function App() {
    return (
        <HashRouter>
            <Routes>
                {/* main */}
                <Route path="/" element={<MainPage/>}/>
                <Route path="/About" element={<About/>}/>
                <Route path="/Ads" element={<Ads/>}/>
				<Route path="/Projects" element={<Projects/>}/>
                <Route path="/Links" element={<Links/>}/>

                {/* projects */}
                <Route path="/Projects/HeartAttack" element={<ProjectsHeartAttack/>}/>
                <Route path="Projects/Scrapped" element={<ProjectsUnfinished/>}/>

                {/* other */}
                <Route path="/itisi" element={<ItisI/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </HashRouter>
    );
}

root.render(<App/>);