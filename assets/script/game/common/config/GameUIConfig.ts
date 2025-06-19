/*
 * @Date: 2021-08-12 09:33:37
 * @LastEditors: dgflash
 * @LastEditTime: 2023-02-15 09:38:36
 */

import { LayerType } from "db://oops-framework/core/gui/layer/LayerEnum";
import { UIConfig } from "db://oops-framework/core/gui/layer/UIConfig";

/** UI unique identifiers (convenient for server to trigger UI opening through number data) */
export enum UIID {
    /** Resource loading interface */
    Loading = 1,
    /** Alert popup window */
    Alert,
    /** Confirm popup window */
    Confirm,
    /** DEMO */
    Demo
}

/** Configuration data for opening UI */
export var UIConfigData: { [key: number]: UIConfig } = {
    [UIID.Loading]: { layer: LayerType.UI, prefab: "gui/loading/loading" },
    [UIID.Alert]: { layer: LayerType.Dialog, prefab: "common/prefab/alert" },
    [UIID.Confirm]: { layer: LayerType.Dialog, prefab: "common/prefab/confirm" },
    [UIID.Demo]: { layer: LayerType.UI, prefab: "gui/demo/demo" },
}