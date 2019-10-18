import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RootService } from '@app/core/root.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-core-view',
  template: ''
  // styleUrls: ['./core-view.component.scss']
})
export class CoreViewComponent implements OnInit {
  itemId: number;

  constructor(protected activatedRoute: ActivatedRoute, protected service: RootService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((routeInfo: any) => {
      if (routeInfo.id) {
        // this.isEdit = true;
        return this.loadResources(routeInfo.id);
      }
    });
  }

  loadResources(id: number): void {
    this.itemId = id;
    this.service
      .showItem(id)
      .pipe(
        map(item => {
          // this.item = item;
          return this.refactorItem(item);
        })
      )
      .subscribe(
        response => {
          // const obj = JSON.parse(JSON.stringify(response)); // clone response object
          // return this.form.patchValue(obj);
          return response;
        },
        err => {
          this.service.errorHandle(err);
        }
      );
  }
  refactorItem(item: any): any {
    return item;
  }
}
