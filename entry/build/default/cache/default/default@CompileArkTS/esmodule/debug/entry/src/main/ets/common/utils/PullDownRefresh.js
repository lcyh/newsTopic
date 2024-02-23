/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import promptAction from '@ohos:promptAction';
import { touchMoveLoadMore, touchUpLoadMore } from '@bundle:com.example.newsdataarkts/entry/ets/common/utils/PullUpLoadMore';
import { CommonConstant as Const } from '@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant';
import NewsViewModel from '@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel';
export function listTouchEvent(newsModel, event) {
    switch (event.type) {
        case TouchType.Down:
            newsModel.downY = event.touches[0].y;
            newsModel.lastMoveY = event.touches[0].y;
            break;
        case TouchType.Move:
            if ((newsModel.isRefreshing === true) || (newsModel.isLoading === true)) {
                return;
            }
            let isDownPull = event.touches[0].y - newsModel.lastMoveY > 0;
            if (((isDownPull === true) || (newsModel.isPullRefreshOperation === true)) && (newsModel.isCanLoadMore === false)) {
                // Finger movement, processing pull-down refresh.
                touchMovePullRefresh(newsModel, event);
            }
            else {
                // Finger movement, processing load more.
                touchMoveLoadMore(newsModel, event);
            }
            newsModel.lastMoveY = event.touches[0].y;
            break;
        case TouchType.Cancel:
            break;
        case TouchType.Up:
            if ((newsModel.isRefreshing === true) || (newsModel.isLoading === true)) {
                return;
            }
            if ((newsModel.isPullRefreshOperation === true)) {
                // Lift your finger and pull down to refresh.
                touchUpPullRefresh(newsModel);
            }
            else {
                // Fingers up, handle loading more.
                touchUpLoadMore(newsModel);
            }
            break;
        default:
            break;
    }
}
export function touchMovePullRefresh(newsModel, event) {
    if (newsModel.startIndex === 0) {
        newsModel.isPullRefreshOperation = true;
        let height = vp2px(newsModel.pullDownRefreshHeight);
        newsModel.offsetY = event.touches[0].y - newsModel.downY;
        // The sliding offset is greater than the pull-down refresh layout height, and the refresh condition is met.
        if (newsModel.offsetY >= height) {
            pullRefreshState(newsModel, 1 /* Release */);
            newsModel.offsetY = height + newsModel.offsetY * Const.Y_OFF_SET_COEFFICIENT;
        }
        else {
            pullRefreshState(newsModel, 0 /* DropDown */);
        }
        if (newsModel.offsetY < 0) {
            newsModel.offsetY = 0;
            newsModel.isPullRefreshOperation = false;
        }
    }
}
export function touchUpPullRefresh(newsModel) {
    if (newsModel.isCanRefresh === true) {
        newsModel.offsetY = vp2px(newsModel.pullDownRefreshHeight);
        pullRefreshState(newsModel, 2 /* Refreshing */);
        newsModel.currentPage = 1;
        setTimeout(() => {
            let self = newsModel;
            NewsViewModel.getNewsList(newsModel.currentPage, newsModel.pageSize, Const.GET_NEWS_LIST).then((data) => {
                if (data.length === newsModel.pageSize) {
                    self.hasMore = true;
                    self.currentPage++;
                }
                else {
                    self.hasMore = false;
                }
                self.newsData = data;
                closeRefresh(self, true);
            }).catch((err) => {
                promptAction.showToast({ message: err });
                closeRefresh(self, false);
            });
        }, Const.DELAY_TIME);
    }
    else {
        closeRefresh(newsModel, false);
    }
}
export function pullRefreshState(newsModel, state) {
    switch (state) {
        case 0 /* DropDown */:
            newsModel.pullDownRefreshText = { "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.pullDownRefreshImage = { "id": 16777246, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.isCanRefresh = false;
            newsModel.isRefreshing = false;
            newsModel.isVisiblePullDown = true;
            break;
        case 1 /* Release */:
            newsModel.pullDownRefreshText = { "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.pullDownRefreshImage = { "id": 16777248, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.isCanRefresh = true;
            newsModel.isRefreshing = false;
            break;
        case 2 /* Refreshing */:
            newsModel.offsetY = vp2px(newsModel.pullDownRefreshHeight);
            newsModel.pullDownRefreshText = { "id": 16777229, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.pullDownRefreshImage = { "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.isCanRefresh = true;
            newsModel.isRefreshing = true;
            break;
        case 3 /* Success */:
            newsModel.pullDownRefreshText = { "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.pullDownRefreshImage = { "id": 16777249, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.isCanRefresh = true;
            newsModel.isRefreshing = true;
            break;
        case 4 /* Fail */:
            newsModel.pullDownRefreshText = { "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.pullDownRefreshImage = { "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
            newsModel.isCanRefresh = true;
            newsModel.isRefreshing = true;
            break;
        default:
            break;
    }
}
export function closeRefresh(newsModel, isRefreshSuccess) {
    let self = newsModel;
    setTimeout(() => {
        let delay = Const.RefreshConstant_DELAY_PULL_DOWN_REFRESH;
        if (self.isCanRefresh === true) {
            pullRefreshState(newsModel, isRefreshSuccess ? 3 /* Success */ : 4 /* Fail */);
            delay = Const.RefreshConstant_DELAY_SHRINK_ANIMATION_TIME;
        }
        Context.animateTo({
            duration: Const.RefreshConstant_CLOSE_PULL_DOWN_REFRESH_TIME,
            delay: delay,
            onFinish: () => {
                pullRefreshState(newsModel, 0 /* DropDown */);
                self.isVisiblePullDown = false;
                self.isPullRefreshOperation = false;
            }
        }, () => {
            self.offsetY = 0;
        });
    }, self.isCanRefresh ? Const.DELAY_ANIMATION_DURATION : 0);
}
//# sourceMappingURL=PullDownRefresh.js.map