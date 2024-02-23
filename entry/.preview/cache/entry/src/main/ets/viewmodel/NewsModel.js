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
export default class NewsModel {
    constructor() {
        this.newsData = [];
        this.currentPage = 1;
        this.pageSize = Const.PAGE_SIZE;
        this.pullDownRefreshText = { "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
        this.pullDownRefreshImage = { "id": 16777229, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
        this.pullDownRefreshHeight = Const.CUSTOM_LAYOUT_HEIGHT;
        this.isVisiblePullDown = false;
        this.pullUpLoadText = { "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
        this.pullUpLoadImage = { "id": 16777251, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
        this.pullUpLoadHeight = Const.CUSTOM_LAYOUT_HEIGHT;
        this.isVisiblePullUpLoad = false;
        this.offsetY = 0;
        this.pageState = 0 /* Loading */;
        this.hasMore = true;
        this.startIndex = 0;
        this.endIndex = 0;
        this.downY = 0;
        this.lastMoveY = 0;
        this.isRefreshing = false;
        this.isCanRefresh = false;
        this.isPullRefreshOperation = false;
        this.isLoading = false;
        this.isCanLoadMore = false;
    }
}
//# sourceMappingURL=NewsModel.js.map