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
import { CommonConstant as Const } from '@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant';
import NewsViewModel from '@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel';
export function touchMoveLoadMore(newsModel, event) {
    if (newsModel.endIndex === newsModel.newsData.length - 1 || newsModel.endIndex === newsModel.newsData.length) {
        newsModel.offsetY = event.touches[0].y - newsModel.downY;
        if (Math.abs(newsModel.offsetY) > vp2px(newsModel.pullUpLoadHeight) / 2) {
            newsModel.isCanLoadMore = true;
            newsModel.isVisiblePullUpLoad = true;
            newsModel.offsetY = -vp2px(newsModel.pullUpLoadHeight) + newsModel.offsetY * Const.Y_OFF_SET_COEFFICIENT;
        }
    }
}
export function touchUpLoadMore(newsModel) {
    let self = newsModel;
    Context.animateTo({
        duration: Const.ANIMATION_DURATION,
    }, () => {
        self.offsetY = 0;
    });
    if ((self.isCanLoadMore === true) && (self.hasMore === true)) {
        self.isLoading = true;
        setTimeout(() => {
            closeLoadMore(newsModel);
            NewsViewModel.getNewsList(self.currentPage, self.pageSize, Const.GET_NEWS_LIST).then((data) => {
                if (data.length === self.pageSize) {
                    self.currentPage++;
                    self.hasMore = true;
                }
                else {
                    self.hasMore = false;
                }
                self.newsData = self.newsData.concat(data);
            }).catch((err) => {
                promptAction.showToast({ message: err });
            });
        }, Const.DELAY_TIME);
    }
    else {
        closeLoadMore(self);
    }
}
export function closeLoadMore(newsModel) {
    newsModel.isCanLoadMore = false;
    newsModel.isLoading = false;
    newsModel.isVisiblePullUpLoad = false;
}
//# sourceMappingURL=PullUpLoadMore.js.map