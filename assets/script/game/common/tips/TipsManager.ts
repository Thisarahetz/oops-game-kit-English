/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-05 10:13:47
 */
import { Node, tween, Vec3 } from "cc";
import { UICallbacks } from "../../../../../extensions/oops-plugin-framework/assets/core/gui/layer/Defines";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { UIID } from "../config/GameUIConfig";

/** Tips window management */
class TipsManager {
    /**
     * Show alert window
     * @param content   Alert content text or language key
     * @param onOk      Confirm callback
     * @param title     Window title text or language key
     * @param okWord    Confirm button text or language key
     */
    alert(content: string, onOk?: Function, title?: string, okWord?: string) {
        let operate: any = {
            title: title ? title : 'common_prompt_title',
            content: content,
            okWord: okWord ? okWord : 'common_prompt_ok',
            okFunc: onOk,
            needCancel: false
        };
        oops.gui.open(UIID.Alert, operate, tips.getPopCommonEffect());
    }

    /**
     * Show confirm window
     * @param content   Alert content text or language key
     * @param onOk      Confirm callback
     * @param onCancel  Cancel callback
     * @param title     Window title text or language key
     * @param okWord    Confirm button text or language key
     */
    confirm(content: string, onOk?: Function, onCancel?: Function, title?: string, okWord?: string) {
        let operate: any = {
            title: title ? title : 'common_prompt_title',
            content: content,
            okWord: okWord ? okWord : 'common_prompt_ok',
            cancelWord: 'common_prompt_cancal',
            okFunc: onOk,
            cancelFunc: onCancel,
            needCancel: true
        };
        oops.gui.open(UIID.Confirm, operate, tips.getPopCommonEffect());
    }

    /** Custom popup animation */
    private getPopCommonEffect(callbacks?: UICallbacks) {
        let newCallbacks: UICallbacks = {
            // Node add animation
            onAdded: (node, params) => {
                node.setScale(0.1, 0.1, 0.1);

                tween(node)
                    .to(0.2, { scale: new Vec3(1, 1, 1) })
                    .start();
            },
            // Node remove animation
            onBeforeRemove: (node, next) => {
                tween(node)
                    .to(0.2, { scale: new Vec3(0.1, 0.1, 0.1) })
                    .call(next)
                    .start();
            },
        }

        if (callbacks) {
            if (callbacks && callbacks.onAdded) {
                let onAdded = callbacks.onAdded;
                callbacks.onAdded = (node: Node, params: any) => {
                    onAdded(node, params);

                    // @ts-ignore
                    newCallbacks.onAdded(node, params);
                };
            }

            if (callbacks && callbacks.onBeforeRemove) {
                let onBeforeRemove = callbacks.onBeforeRemove;
                callbacks.onBeforeRemove = (node, params) => {
                    onBeforeRemove(node, params);

                    // @ts-ignore
                    newCallbacks.onBeforeRemove(node, params);
                };
            }
            return callbacks;
        }
        return newCallbacks;
    }
}

export var tips = new TipsManager();