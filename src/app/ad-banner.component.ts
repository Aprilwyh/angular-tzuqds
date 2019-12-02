import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem }      from './ad-item';
import { AdComponent } from './ad.component';

@Component({
  selector: 'app-ad-banner',
  // ad.directive.ts 的选择器 ad-host。把它应用到 <ng-template>
  // 把组件动态加载到这里
  template: `
              <div class="ad-banner-example">
                <h3>Advertisements</h3>
                <ng-template ad-host></ng-template>
              </div>
            `
})
export class AdBannerComponent implements OnInit, OnDestroy {
  // AdItem 对象的数组来自 AdService
  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    // 使用循环选取算法选择了一个广告,它把 currentAdIndex 递增一，然后用它除以 AdItem 数组长度的余数作为新的 currentAdIndex 的值， 最后用这个值来从数组中选取一个 adItem
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length; // this.ads.length:4
    let adItem = this.ads[this.currentAdIndex];

    // 使用 ComponentFactoryResolver 来为每个具体的组件解析出一个 ComponentFactory。 然后 ComponentFactory 会为每一个组件创建一个实例
    let componentFactory = 
    this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    // 把 viewContainerRef 指向这个组件的现有实例
    // 在AdDirective的构造函数中注入ViewContainerRef
    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    // 把这个组件添加到模板中
    let componentRef = viewContainerRef.createComponent(componentFactory);
    // 返回一个引用，指向这个刚刚加载的组件.使用这个引用就可以与该组件进行交互，比如设置它的属性或调用它的方法。
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  // 循环遍历 AdItems 的数组，并且每三秒调用一次 loadComponent() 来加载新组件
  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/