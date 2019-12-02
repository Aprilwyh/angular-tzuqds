import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // 将应用到元素上的指令
  selector: '[ad-host]',
})
export class AdDirective {
  // 注入ViewContainerRef获取对容器视图的访问权，这个容器就是那些动态加入的组件的宿主。
  constructor(public viewContainerRef: ViewContainerRef) { }
}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/