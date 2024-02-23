/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { CustomRefreshLoadLayoutClass } from '@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel';
import CustomRefreshLoadLayout from '@bundle:com.example.newsdataarkts/entry/ets/view/CustomRefreshLoadLayout';
export default class RefreshLayout extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__refreshLayoutClass = new SynchedPropertyNesedObjectPU(params.refreshLayoutClass, this, "refreshLayoutClass");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        this.__refreshLayoutClass.set(params.refreshLayoutClass);
    }
    updateStateVars(params) {
        this.__refreshLayoutClass.set(params.refreshLayoutClass);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__refreshLayoutClass.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__refreshLayoutClass.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get refreshLayoutClass() {
        return this.__refreshLayoutClass.get();
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("view/RefreshLayout.ets(27:5)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.refreshLayoutClass.isVisible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            if (isInitialRender) {
                                ViewPU.create(new CustomRefreshLoadLayout(this, { customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.refreshLayoutClass.isVisible, this.refreshLayoutClass.imageSrc, this.refreshLayoutClass.textValue, this.refreshLayoutClass.heightValue) }, undefined, elmtId));
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    customRefreshLoadClass: new CustomRefreshLoadLayoutClass(this.refreshLayoutClass.isVisible, this.refreshLayoutClass.imageSrc, this.refreshLayoutClass.textValue, this.refreshLayoutClass.heightValue)
                                });
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                    }
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=RefreshLayout.js.map