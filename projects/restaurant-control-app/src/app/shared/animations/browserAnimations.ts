import {
  animate,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeOutAnimation = trigger('fadeOut', [
  state(
    'visible',
    style({
      opacity: 1,
    })
  ),
  state(
    'hidden',
    style({
      opacity: 0,
    })
  ),
  transition('visible => hidden', [
    style({ transform: 'scale(0)' }),
    animate('300ms ease-out'),
  ]),
]);

export const fadeInAnimation = trigger('fadeIn', [
  state(
    'visible',
    style({
      opacity: 1,
    })
  ),
  state(
    'hidden',
    style({
      opacity: 0,
    })
  ),
  transition('hidden => visible', [
    style({ transform: 'scale(0)' }),
    animate('300ms ease-in'),
  ]),
]);

export const foodArrivalFadein = trigger('showFood', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        stagger(100, [
          animate('300ms ease-in', style({ opacity: 1, transform: 'none' })),
        ]),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        animate(
          '300ms ease-out',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        ),
      ],
      { optional: true }
    ),
  ]),
]);

