var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CommonConstant as Const } from '@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant';
import { httpRequestGet } from '@bundle:com.example.newsdataarkts/entry/ets/common/utils/HttpUtil';
import Logger from '@bundle:com.example.newsdataarkts/entry/ets/common/utils/Logger';
class NewsViewModel {
    /**
     * Get news type list from server.
     *
     * @return NewsTypeBean[] newsTypeList
     */
    getNewsTypeList() {
        return new Promise((resolve) => {
            let url = `${Const.SERVER}/${Const.GET_NEWS_TYPE}`;
            console.log('getNewsTypeList-url', url);
            httpRequestGet(url).then((data) => {
                if (data.code === Const.SERVER_CODE_SUCCESS) {
                    resolve(data.data);
                }
                else {
                    resolve(Const.TabBars_DEFAULT_NEWS_TYPES);
                }
            }).catch(() => {
                resolve(Const.TabBars_DEFAULT_NEWS_TYPES);
            });
        });
    }
    /**
     * Get default news type list.
     *
     * @return NewsTypeBean[] newsTypeList
     */
    getDefaultTypeList() {
        return Const.TabBars_DEFAULT_NEWS_TYPES;
    }
    /**
     * Get news type list from server.
     *
     * @return NewsData[] newsDataList
     */
    getNewsList(currentPage, pageSize, path) {
        return new Promise(async (resolve, reject) => {
            let url = `${Const.SERVER}/${path}`;
            url += '?currentPage=' + currentPage + '&pageSize=' + pageSize;
            console.log('url', url);
            httpRequestGet(url).then((data) => {
                console.log('===getNewsList', JSON.stringify(data));
                if (data.code === Const.SERVER_CODE_SUCCESS) {
                    resolve(data.data);
                }
                else {
                    Logger.error('getNewsList failed', JSON.stringify(data));
                    reject({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
                }
            }).catch((err) => {
                console.log('====err', JSON.stringify(err));
                Logger.error('getNewsList failed', JSON.stringify(err));
                reject({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            });
        });
    }
}
let newsViewModel = new NewsViewModel();
export default newsViewModel;
/**
 * News list item info.
 */
export class NewsData {
    constructor() {
        /**
         * News list item title.
         */
        this.title = '';
        /**
         * News list item content.
         */
        this.content = '';
        /**
         * News list item imagesUrl.
         */
        this.imagesUrl = [new NewsFile()];
        /**
         * News list item source.
         */
        this.source = '';
    }
}
/**
 * News image list item info.
 */
export class NewsFile {
    constructor() {
        /**
         * News image list item id.
         */
        this.id = 0;
        /**
         * News image list item url.
         */
        this.url = '';
        /**
         * News image list item type.
         */
        this.type = 0;
        /**
         * News image list item newsId.
         */
        this.newsId = 0;
    }
}
/**
 * Custom refresh load layout data.
 */
let CustomRefreshLoadLayoutClass = class CustomRefreshLoadLayoutClass {
    constructor(isVisible, imageSrc, textValue, heightValue) {
        this.isVisible = isVisible;
        this.imageSrc = imageSrc;
        this.textValue = textValue;
        this.heightValue = heightValue;
    }
};
CustomRefreshLoadLayoutClass = __decorate([
    Observed
], CustomRefreshLoadLayoutClass);
export { CustomRefreshLoadLayoutClass };
export class NewsTypeBean {
    constructor() {
        this.id = 0;
        this.name = '';
    }
}
export class ResponseResult {
    constructor() {
        this.code = '';
        this.msg = '';
        this.data = '';
    }
}
//# sourceMappingURL=NewsViewModel.js.map