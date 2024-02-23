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
import { CommonConstant as Const } from '@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant';
export default class CustomLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__customRefreshLoadClass = new SynchedPropertyNesedObjectPU(params.customRefreshLoadClass, this, "customRefreshLoadClass");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        this.__customRefreshLoadClass.set(params.customRefreshLoadClass);
    }
    updateStateVars(params) {
        this.__customRefreshLoadClass.set(params.customRefreshLoadClass);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__customRefreshLoadClass.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__customRefreshLoadClass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get customRefreshLoadClass() {
        return this.__customRefreshLoadClass.get();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("view/CustomRefreshLoadLayout.ets(27:5)");
            Row.clip(true);
            Row.width(Const.FULL_WIDTH);
            Row.justifyContent(FlexAlign.Center);
            Row.height(this.customRefreshLoadClass.heightValue);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create(this.customRefreshLoadClass.imageSrc);
            Image.debugLine("view/CustomRefreshLoadLayout.ets(28:7)");
            Image.width(Const.RefreshLayout_IMAGE_WIDTH);
            Image.height(Const.RefreshLayout_IMAGE_HEIGHT);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.customRefreshLoadClass.textValue);
            Text.debugLine("view/CustomRefreshLoadLayout.ets(32:7)");
            Text.margin({
                left: Const.RefreshLayout_TEXT_MARGIN_LEFT,
                bottom: Const.RefreshLayout_TEXT_MARGIN_BOTTOM
            });
            Text.fontSize(Const.RefreshLayout_TEXT_FONT_SIZE);
            Text.textAlign(TextAlign.Center);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=CustomRefreshLoadLayout.js.map