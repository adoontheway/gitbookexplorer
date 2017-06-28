import { Injectable } from '@angular/core';

/*
  Generated class for the LanguageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LanguageProvider {
  area = 'cn';
  config_s = {
    'cn':{
    'author':'作者',
    'stars':'喜欢',
    'subsc':'订阅',
    'details':'详情',
    'tags':'标签',
    'read':'阅读',
    'previous':'上一页',
    'next':'下一页',
    'explorer':'浏览',
    'download':'下载',
    'nodesc':'暂无描述',
    'entertopic':'输入搜索内容',
    'updates':'更新',
    'lastupdate':'最近更新',
    'downloads':'已下载书目'
  },
  'en':{
    'author':'Author',
    'stars':'Start',
    'subsc':'Subscriptions',
    'details':'Details',
    'tags':'Tags',
    'read':'Read',
    'previous':'PRE PAGE',
    'next':'NEXT PAGE',
    'explorer':'Explorer',
    'download':'Download',
    'nodesc':'no description',
    'entertopic':'enter topic',
    'updates':'updates',
    'lastupdate':'Last Update',
    'downloads':'Downloads'
  }
  };
  config_r;
  constructor() {
    this.config_r = this.config_s[this.area];
  }

  getText(key){
    if(this.config_r[key] == undefined){
      return '';
    }
    return this.config_r[key];
  }
}
