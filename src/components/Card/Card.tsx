import React from 'react';

interface Props {
	icon?: string;
    iconClass?: string;
	wrapperClass?: string;
	title: string;
	description: string;
	moreLink?: string;
}
function Card(props: Props) {
	const { wrapperClass, title, description, moreLink, icon, iconClass = '' } = props;
	return (
		<div className="pointer-events-auto w-[21rem] rounded-lg bg-white p-5 text-[0.8125rem] leading-5 shadow-sm shadow-black/5 hover:bg-slate-50 ring-1 ring-slate-700/10">
			<div className="flex items-center mb-4">
				{icon && <div className={"mr-2 " + iconClass}>{icons[icon]}</div>}
				<div className="font-medium text-slate-900 text-lg">{title}</div>
			</div>
			<div className="mt-1 text-slate-700">{description}</div>
			{/* <div className="mt-6 font-medium text-slate-900">1200 users</div> */}
			{moreLink && (
				<div className="mt-4">
					<a className="justify-end text-sm" href={moreLink}>Learn More</a>
				</div>
			)}
		</div>

		// <div className={'bg-gray-300 rounded-lg ' + wrapperClass}>
		// 	<div className="border rounded-lg p-8 flex flex-col h-full gap-2">
		// 		<div className="flex items-center card-header">
		// 			<h5 className="text-base text-scale-1200">{title}</h5>
		// 		</div>
		// 		<span className="text-sm text-scale-1100 flex-grow">{description}</span>
		// 		{moreLink && <a className="justify-end text-sm">Learn More</a>}
		// 	</div>
		// </div>
	);
}

export default Card;

const icons = {
	home: (
		<svg viewBox="0 0 16 16" width="20" height="20">
			<path d="M2 6h10v4H2V6z" />
			<path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z" />
		</svg>
	)
};
