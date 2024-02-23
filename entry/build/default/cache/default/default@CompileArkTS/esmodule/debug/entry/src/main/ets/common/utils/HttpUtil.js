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
import http from '@ohos:net.http';
import { ResponseResult } from '@bundle:com.example.newsdataarkts/entry/ets/viewmodel/NewsViewModel';
import { CommonConstant as Const } from '@bundle:com.example.newsdataarkts/entry/ets/common/constant/CommonConstant';
/**
 * Initiates an HTTP request to a given URL.
 *
 * @param url URL for initiating an HTTP request.
 * @param params Params for initiating an HTTP request.
 */
export function httpRequestGet(url) {
    let httpRequest = http.createHttp();
    let responseResult = httpRequest.request(url, {
        method: http.RequestMethod.GET,
        readTimeout: Const.HTTP_READ_TIMEOUT,
        header: {
            'Content-Type': "application/json" /* JSON */
        },
        connectTimeout: Const.HTTP_READ_TIMEOUT,
        extraData: {}
    });
    let serverData = new ResponseResult();
    // Processes the data and returns.
    return responseResult.then((value) => {
        if (value.responseCode === Const.HTTP_CODE_200) {
            // Obtains the returned data.
            let result = `${value.result}`;
            let resultJson = JSON.parse(result);
            if (resultJson.code === Const.SERVER_CODE_SUCCESS) {
                serverData.data = resultJson.data;
            }
            serverData.code = resultJson.code;
            serverData.msg = resultJson.msg;
        }
        else {
            serverData.msg = `${{ "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" }}&${value.responseCode}`;
        }
        return serverData;
    }).catch(() => {
        serverData.msg = { "id": 16777221, "type": 10003, params: [], "bundleName": "com.example.newsdataarkts", "moduleName": "entry" };
        return serverData;
    });
}
//# sourceMappingURL=HttpUtil.js.map