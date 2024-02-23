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
import { CommonConstant, CommonConstant as Const } from '@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant';
import NewsItem from '@bundle:com.example.newsdataarkts/entry/ets/view/NewsItem';
import LoadMoreLayout from '@bundle:com.example.newsdataarkts/entry/ets/view/LoadMoreLayout';
import RefreshLayout from '@bundle:com.example.newsdataarkts/entry/ets/view/RefreshLayout';
import CustomRefreshLoadLayout from '@bundle:com.example.newsdataarkts/entry/ets/view/CustomRefreshLoadLayout';
import { listTouchEvent } from '@bundle:com.example.newsdataarkts/entry/ets/common/utils/PullDownRefresh';
import NewsViewModel, { CustomRefreshLoadLayoutClass } from '@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel';
import NoMoreLayout from '@bundle:com.example.newsdataarkts/entry/ets/view/NoMoreLayout';
import NewsModel from '@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsModel';
export default class NewsList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__newsModel = new ObservedPropertyObjectPU(new NewsModel(), this, "newsModel");
        this.__currentIndex = new SynchedPropertySimpleTwoWayPU(params.currentIndex, this, "currentIndex");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("currentIndex", this.changeCategory);
    }
    setInitiallyProvidedValue(params) {
        if (params.newsModel !== undefined) {
            this.newsModel = params.newsModel;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__newsModel.purgeDependencyOnElmtId(rmElmtId);
        this.__currentIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__newsModel.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get newsModel() {
        return this.__newsModel.get();
    }
    set newsModel(newValue) {
        this.__newsModel.set(newValue);
    }
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue) {
        this.__currentIndex.set(newValue);
    }
    changeCategory() {
        this.newsModel.currentPage = 1;
        NewsViewModel.getNewsList(this.newsModel.currentPage, this.newsModel.pageSize, Const.GET_NEWS_LIST)
            .then((data) => {
            console.log('NewsData', JSON.stringify(data));
            this.newsModel.pageState = 1 /* Success */;
            if (data.length === this.newsModel.pageSize) {
                this.newsModel.currentPage++;
                this.newsModel.hasMore = true;
            }
            else {
                this.newsModel.hasMore = false;
            }
            this.newsModel.newsData = data;
        })
            .catch((err) => {
            promptAction.showToast({
                message: err,
                duration: Const.ANIMATION_DURATION
            });
            this.newsModel.pageState = 2 /* Fail */;
        });
    }
    aboutToAppear() {
        // Request news data.
        this.changeCategory();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.width(Const.FULL_WIDTH);
            Column.height(Const.FULL_HEIGHT);
            Column.justifyContent(FlexAlign.Center);
            Column.onTouch((event) => {
                if (event) {
                    if (this.newsModel.pageState === 1 /* Success */) {
                        listTouchEvent(this.newsModel, event);
                    }
                }
            });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.newsModel.pageState === 1 /* Success */) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.ListLayout.bind(this)();
                });
            }
            else if (this.newsModel.pageState === 0 /* Loading */) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.LoadingLayout.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.FailLayout.bind(this)();
                });
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Column.pop();
    }
    LoadingLayout(parent = null) {
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomRefreshLoadLayout(this, { customRefreshLoadClass: new CustomRefreshLoadLayoutClass(true, { "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, this.newsModel.pullDownRefreshHeight) }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        customRefreshLoadClass: new CustomRefreshLoadLayoutClass(true, { "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, { "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }, this.newsModel.pullDownRefreshHeight)
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
    }
    ListLayout(parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create();
            List.width(Const.NewsListConstant_LIST_WIDTH);
            List.height(Const.FULL_HEIGHT);
            List.margin({ left: Const.NewsListConstant_LIST_MARGIN_LEFT, right: Const.NewsListConstant_LIST_MARGIN_RIGHT });
            List.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            List.divider({
                color: { "id": 16777232, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" },
                strokeWidth: Const.NewsListConstant_LIST_DIVIDER_STROKE_WIDTH,
                endMargin: Const.NewsListConstant_LIST_MARGIN_RIGHT
            });
            List.edgeEffect(EdgeEffect.None);
            List.offset({ x: 0, y: `${this.newsModel.offsetY}${CommonConstant.LIST_OFFSET_UNIT}` });
            List.onScrollIndex((start, end) => {
                // Listen to the first index of the current list.
                this.newsModel.startIndex = start;
                this.newsModel.endIndex = end;
            });
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const observedShallowRender = () => {
                this.observeComponentCreation(itemCreation);
                ListItem.pop();
            };
            const observedDeepRender = () => {
                this.observeComponentCreation(itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new RefreshLayout(this, {
                                refreshLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight)
                            }, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                refreshLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight)
                            });
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        if (isInitialRender) {
                            ViewPU.create(new RefreshLayout(this, {
                                refreshLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight)
                            }, undefined, elmtId));
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                refreshLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullDown, this.newsModel.pullDownRefreshImage, this.newsModel.pullDownRefreshText, this.newsModel.pullDownRefreshHeight)
                            });
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                }
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        ListItem.height({ "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
                        ListItem.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
                        ListItem.margin({ top: { "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" } });
                        ListItem.borderRadius(Const.NewsListConstant_ITEM_BORDER_RADIUS);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        ListItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        {
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                if (isInitialRender) {
                                    ViewPU.create(new NewsItem(this, { newsData: item }, undefined, elmtId));
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                        }
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        {
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                if (isInitialRender) {
                                    ViewPU.create(new NewsItem(this, { newsData: item }, undefined, elmtId));
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                        }
                        ListItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, this.newsModel.newsData, forEachItemGenFunction, (item, index) => JSON.stringify(item) + index, false, true);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        {
            const isLazyCreate = true;
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                ListItem.create(deepRenderFunction, isLazyCreate);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const observedShallowRender = () => {
                this.observeComponentCreation(itemCreation);
                ListItem.pop();
            };
            const observedDeepRender = () => {
                this.observeComponentCreation(itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    If.create();
                    if (this.newsModel.hasMore) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    if (isInitialRender) {
                                        ViewPU.create(new LoadMoreLayout(this, {
                                            loadMoreLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight)
                                        }, undefined, elmtId));
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            loadMoreLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight)
                                        });
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    if (isInitialRender) {
                                        ViewPU.create(new NoMoreLayout(this, {}, undefined, elmtId));
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                            }
                        });
                    }
                    if (!isInitialRender) {
                        If.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                If.pop();
                ListItem.pop();
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.updateFuncByElmtId.set(elmtId, itemCreation);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    If.create();
                    if (this.newsModel.hasMore) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    if (isInitialRender) {
                                        ViewPU.create(new LoadMoreLayout(this, {
                                            loadMoreLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight)
                                        }, undefined, elmtId));
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            loadMoreLayoutClass: new CustomRefreshLoadLayoutClass(this.newsModel.isVisiblePullUpLoad, this.newsModel.pullUpLoadImage, this.newsModel.pullUpLoadText, this.newsModel.pullUpLoadHeight)
                                        });
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    if (isInitialRender) {
                                        ViewPU.create(new NoMoreLayout(this, {}, undefined, elmtId));
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                            }
                        });
                    }
                    if (!isInitialRender) {
                        If.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                If.pop();
                ListItem.pop();
            };
            if (isLazyCreate) {
                observedShallowRender();
            }
            else {
                observedDeepRender();
            }
        }
        List.pop();
    }
    FailLayout(parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777252, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Image.height(Const.NewsListConstant_NONE_IMAGE_SIZE);
            Image.width(Const.NewsListConstant_NONE_IMAGE_SIZE);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.opacity(Const.NewsListConstant_NONE_TEXT_opacity);
            Text.fontSize(Const.NewsListConstant_NONE_TEXT_size);
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.margin({ top: Const.NewsListConstant_NONE_TEXT_margin });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=newslist.js.map