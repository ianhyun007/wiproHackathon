import { animate, trigger, transition, style } from '@angular/animations';

export const routeFadeStateTrigger = trigger('routeFadeState', [
    transition(':enter',[
        style({
            transform: 'translateY(100%)',
            opacity: 0
        }),
        animate(1000)
    ]),
    transition(':leave', animate(500, style({
        transform: 'translateY(-100%)',
        opacity: 0
    })))
    // transition(':enter',[
    //     style({
    //         opacity: 0
    //     }),
    //     animate(1000)
    // ]),
    // transition(':leave', animate(1000, style({
    //     opacity: 0
    // })))
]);

export const itemStateTrigger = trigger('itemState', [
    transition(':enter', [
        style({
            opacity:0,
            transform: 'translateX(100%)'
        }),
        animate('500ms ease-out', style({
            opacity:1,
            transform: 'translateX(0)'
        }))
    ])
]);
export const itemStateTrigger2 = trigger('itemState2', [
    transition(':enter', [
        style({
            opacity:0,
            transform: 'translateX(-100%)'
        }),
        animate('500ms ease-out', style({
            opacity:1,
            transform: 'translateX(0)'
        }))
    ])
]);
export const itemStateTrigger3 = trigger('itemState3', [
    transition(':enter', [
        style({
            opacity:0,
            transform: 'translateY(100%)'
        }),
        animate('500ms ease-out', style({
            opacity:1,
            transform: 'translateY(0)'
        }))
    ])
]);