import { animation, style, animate } from '@angular/animations';

export const showAnimationOrigin = animation([
	style({
		opacity: '{{ opacity }}',
		transform: '{{ transform }}',
		'transform-origin': '{{ origin }}'
	}),
	animate(
		'{{ timings }}',
		style({ opacity: 1, transform: 'none', 'transform-origin': '{{ origin }}' })
	)
]);

export const HideAnimationOrigin = animation([
	animate(
		'{{ timings }}',
		style({
			opacity: '{{ opacity }}',
			transform: '{{ transform }}',
			'transform-origin': '{{ origin }}'
		})
	)
]);
