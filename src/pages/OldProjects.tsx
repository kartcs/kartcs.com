import { Icon } from '@iconify-icon/react/dist/iconify.js';
import React from 'react';

export default function Projects({ setPage }) {
	const projectData: {
		projectName: string;

		// these are combined, don't repeat things !
		shortDesc: string;
		longDesc?: string;

		iconName: string;
		iconClass?: string;

		links?: {
			linkIcon?: string;
			url?: string;
			onClick?: () => {};
		}[];
	}[] = [
		{
			projectName: 'Heart Attack',
			iconName: 'arcticons:geometry-dash',
			shortDesc: 'mod for Geometry Dash running Geode',
			longDesc:
				'gives the player a small chance to randomly die each attempt.',
			links: [
				{
					url: 'https://github.com/kartcs/HeartAttack',
				},
				{
					url: 'https://geode-sdk.org/mods/kart.heartattack',
					linkIcon: 'simple-icons:geode',
				},
			],
		},
		{
			projectName: 'This Site',
			iconName: 'mynaui:globe',
			shortDesc: 'if you check the source, sorry in advance',
			longDesc: `like actually its really bad`,
			links: [
				{
					url: 'https://github.com/kartcs/kartcs.com',
				},
			],
		},
		{
			projectName: 'T.O.D. 2',
			shortDesc: '(T)ods (O)f (D)eath (2)',
			longDesc: `game based entirely off of a dead joke from years ago`,
			links: [
                {
                    onClick: () => setPage("tod2")
                }
            ],
			iconName: 'solar:cat-bold',
		},
	];

	return (
		<div className="flex justify-center items-center w-full h-screen flex-col fixed pointer-events-none z-0">
			<div className="flex pointer-events-auto flex-col w-150 h-fit min-h-75 max-h-150 rounded-2xl bg-ctp-mantle items-center p-4 gap-2.5">
				<div className="text-center">
					<h1 className="text-ctp-text text-5xl">projects</h1>
					<br />
					<h1 className="text-ctp-subtext0 text-2xl">
						random things i may or may not be proud of!!
					</h1>
					<br />
				</div>
				{projectData.map((p) => (
					<div className="relative flex transition-all overflow-hidden rounded-2xl w-full h-24 bg-ctp-crust p-4 flex-row items-center gap-5 origin-top ">
						<Icon
							icon={p.iconName}
							height={'4rem'}
							className="text-ctp-text"
						/>
						<div className="flex-col text-lg text-ctp-text">
							<div className="flex flex-row">
								<h1 className="whitespace-nowrap text-left select-none">
									{p.projectName}
								</h1>
							</div>
							<h1 className="text-sm text-ctp-subtext0 select-none">
								{p.shortDesc}
							</h1>
						</div>
						<div className="h-fit flex flex-row gap-2 top-2 right-2 absolute">
							{p.links.map((l) => (
								<div
									className="bg-ctp-mantle rounded-full h-8 aspect-square flex items-center justify-center cursor-pointer"
									onClick={() => {
										l?.onClick?.();
										if (l?.url) {
											window.open(l.url, '_blank');
										}
									}}
								>
									<Icon
										icon={
											l.linkIcon ??
											'material-symbols:code'
										}
										height={'1rem'}
										className="text-ctp-text"
									/>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
