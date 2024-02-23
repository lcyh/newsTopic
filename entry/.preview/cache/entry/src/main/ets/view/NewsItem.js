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
import { CommonConstant, CommonConstant as Const } from '@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant';
import { NewsData } from '@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel';
export default class NewsItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.newsData = new NewsData();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.newsData !== undefined) {
            this.newsData = params.newsData;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/NewsItem.ets(27:5)");
            Column.alignItems(HorizontalAlign.Start);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/NewsItem.ets(28:7)");
            Row.alignItems(VerticalAlign.Center);
            Row.height({ "id": 16777246, "type": 10002, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Row.margin({
                top: { "id": 16777247, "type": 10002, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" },
                left: Const.NewsTitle_IMAGE_MARGIN_LEFT
            });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777249, "type": 20000, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Image.debugLine("view/NewsItem.ets(29:9)");
            Image.width(Const.NewsTitle_IMAGE_WIDTH);
            Image.height({ "id": 16777245, "type": 10002, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Image.objectFit(ImageFit.Fill);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.newsData.title);
            Text.debugLine("view/NewsItem.ets(33:9)");
            Text.fontSize(Const.NewsTitle_TEXT_FONT_SIZE);
            Text.fontColor({ "id": 16777222, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.width(Const.NewsTitle_TEXT_WIDTH);
            Text.maxLines(1);
            Text.margin({ left: Const.NewsTitle_TEXT_MARGIN_LEFT });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.fontWeight(Const.NewsTitle_TEXT_FONT_WEIGHT);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.newsData.content);
            Text.debugLine("view/NewsItem.ets(49:7)");
            Text.fontSize(Const.NewsContent_FONT_SIZE);
            Text.fontColor({ "id": 16777222, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.height(Const.NewsContent_HEIGHT);
            Text.width(Const.NewsContent_WIDTH);
            Text.maxLines(Const.NewsContent_MAX_LINES);
            Text.margin({ left: Const.NewsContent_MARGIN_LEFT, top: Const.NewsContent_MARGIN_TOP });
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Grid.create();
            Grid.debugLine("view/NewsItem.ets(58:7)");
            Grid.columnsTemplate(CommonConstant.GRID_COLUMN_TEMPLATES.repeat(this.newsData.imagesUrl.length));
            Grid.columnsGap(Const.NewsGrid_COLUMNS_GAP);
            Grid.rowsTemplate(Const.NewsGrid_ROWS_TEMPLATE);
            Grid.width(Const.NewsGrid_WIDTH);
            Grid.height(Const.NewsGrid_HEIGHT);
            Grid.margin({ left: Const.NewsGrid_MARGIN_LEFT, top: Const.NewsGrid_MARGIN_TOP,
                right: Const.NewsGrid_MARGIN_RIGHT });
            if (!isInitialRender) {
                Grid.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const itemImg = _item;
                {
                    const isLazyCreate = true && (Grid.willUseProxy() === true);
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        GridItem.create(deepRenderFunction, isLazyCreate);
                        GridItem.debugLine("view/NewsItem.ets(60:11)");
                        if (!isInitialRender) {
                            GridItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        GridItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(Const.SERVER + itemImg.url);
                            Image.debugLine("view/NewsItem.ets(61:13)");
                            Image.objectFit(ImageFit.Cover);
                            Image.borderRadius(Const.NewsGrid_IMAGE_BORDER_RADIUS);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        GridItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            Image.create(Const.SERVER + itemImg.url);
                            Image.debugLine("view/NewsItem.ets(61:13)");
                            Image.objectFit(ImageFit.Cover);
                            Image.borderRadius(Const.NewsGrid_IMAGE_BORDER_RADIUS);
                            if (!isInitialRender) {
                                Image.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        GridItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, this.newsData.imagesUrl, forEachItemGenFunction, (itemImg, index) => JSON.stringify(itemImg) + index, false, true);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Grid.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.newsData.source);
            Text.debugLine("view/NewsItem.ets(75:7)");
            Text.fontSize(Const.NewsSource_FONT_SIZE);
            Text.fontColor({ "id": 16777224, "type": 10001, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" });
            Text.height(Const.NewsSource_HEIGHT);
            Text.width(Const.NewsSource_WIDTH);
            Text.maxLines(Const.NewsSource_MAX_LINES);
            Text.margin({ left: Const.NewsSource_MARGIN_LEFT, top: Const.NewsSource_MARGIN_TOP });
            Text.textOverflow({ overflow: TextOverflow.None });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=NewsItem.js.map