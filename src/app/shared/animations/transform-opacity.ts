import { animation, style, animate } from '@angular/animations';

export const showAnimation = animation([
	style({
		opacity: '{{ opacity }}',
		transform: '{{ transform }}',
		'transform-origin': '50% 50%'
	}),
	animate(
		'{{ timings }}',
		style({ opacity: 1, transform: 'none', 'transform-origin': '50% 50%' })
	)
]);

export const HideAnimation = animation([
	animate(
		'{{ timings }}',
		style({
			opacity: '{{ opacity }}',
			transform: '{{ transform }}',
			'transform-origin': '50% 50%'
		})
	)
]);
