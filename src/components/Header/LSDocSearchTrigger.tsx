export default function DocSearchTrigger() {
	return (
		<div
			role="button"
			tabIndex={0}
			className="cursor-pointer p-4 py-2 overflow-hidden ring-1 ring-neutral-500/10 bg-[--content-bg] rounded-xl flex items-center justify-between"
			onClick={() => {
				window.dispatchEvent(new Event('open-docsearch'));
			}}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					window.dispatchEvent(new Event('open-docsearch'));
				}
			}}
		>
			<span className="flex items-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="lucide lucide-search"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</svg>
				Search
			</span>

			<span className="text-xs text-neutral-500/50">⌘+K</span>
		</div>
	);
}
