import { Directive, ElementRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[app-tooltip]'
})
export class AppTooltipDirective implements OnInit {
  component: any;
  content: any;

  @Input() set tooltipText(value: any) {
    this.content = value;
  }

  @Input() set appTooltipHtml(value: any) {
    this.content = value;
  }

  @Input() set tooltipOptions(options: any) {
    for (const key of Object.keys(options)) {
      this.tippyOptions[key] = options[key];
    }
  }

  // tslint:disable-next-line:no-input-rename
  @Input('containerClass') containerClass = '';
  @Output() setTooltipHTML: EventEmitter<any> = new EventEmitter();

  tippyOptions: any = {
    // placement: 'bottom-start',
    interactive: false,
    flipOnUpdate: true,
    onHide: (instance: any) => {
      if (this.component) {
        this.component.destroy();
      }
    },
    onShow: (instance: any) => {
      tippy.hideAll({ exclude: instance });
      instance.setContent(this.content);
      if (!this.tooltipText && !this.appTooltipHtml) {
        this.setTooltipHTML.emit({ devContainerID: 'tippy-' + instance.id, instance, directive: this });
      }
    }
  };

  constructor(private elementRef: ElementRef) {
    this.tippyOptions.boundary = 'window';
    this.tippyOptions.placement = 'bottom-start';
  }

  public ngOnInit() {
    tippy(this.elementRef.nativeElement, this.tippyOptions || {});
  }
}
