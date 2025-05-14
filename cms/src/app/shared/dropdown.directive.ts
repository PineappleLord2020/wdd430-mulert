import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    constructor(private elRef: ElementRef) {}

    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    }

    @HostListener('document:click', ['$event']) closeDropdown(event: Event) {
        if(!this.elRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }
}