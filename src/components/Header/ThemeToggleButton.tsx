import type { FunctionalComponent } from 'preact';
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './ThemeToggleButton.css';
import {Sun, MoonStar} from 'lucide-preact';


interface Props {
	labels: {
		useLight: string;
		useDark: string;
	};
	isInsideHeader: boolean;
}

const themes = ['light', 'dark'];

const icons = [
	<Sun size={16} />,
	<MoonStar size={16} />,
];

const ThemeToggle: FunctionalComponent<Props> = ({ labels, isInsideHeader }) => {
	const [theme, setTheme] = useState(() => {
		// Determine initial theme
		if (import.meta.env.SSR) {
			return undefined; // During server-side rendering
		}

		// Check localStorage for user preference
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			return storedTheme;
		}

		// Check system preference
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		return systemPrefersDark ? 'dark' : 'light';
	});

	// Apply theme on change
	useEffect(() => {
		const root = document.documentElement;

		if (theme === 'dark') {
			root.classList.add('theme-dark');
			root.classList.remove('theme-light');
		} else {
			root.classList.add('theme-light');
			root.classList.remove('theme-dark');
		}

		// Save to localStorage
		localStorage.setItem('theme', theme || '');
	}, [theme]);

	return (
		<div class={`theme-toggle ${isInsideHeader ? 'hide-toggle-on-smaller-screens' : ''}`}>
			{themes.map((t, i) => {
				const icon = icons[i];
				const checked = t === theme;
				const themeLabel = t === 'light' ? labels.useLight : labels.useDark;

				return (
					<label class={`cursor-pointer ${checked ? 'checked' : ''}`}>
						{icon}
						<input
							type="radio"
							name="theme-toggle"
							checked={checked}
							value={t}
							onChange={() => {
								// Handle theme toggle
								const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

								// Remove localStorage entry if switching back to system preference
								if (
									(systemPrefersDark && t === 'dark') ||
									(!systemPrefersDark && t === 'light')
								) {
									localStorage.removeItem('theme');
								} else {
									localStorage.setItem('theme', t);
								}

								setTheme(t);
							}}
						/>
						<span class="sr-only">{themeLabel}</span>
					</label>
				);
			})}
		</div>
	);
};

export default ThemeToggle;