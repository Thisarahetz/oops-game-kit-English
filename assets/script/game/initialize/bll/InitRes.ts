/*
 * @Author: dgflash
 * @Date: 2022-07-22 17:06:22
 * @LastEditors: bansomin
 * @LastEditTime: 2024-03-31 01:20:18
 */
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { AsyncQueue, NextFunction } from "../../../../../extensions/oops-plugin-framework/assets/libs/collection/AsyncQueue";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { ModuleUtil } from "../../../../../extensions/oops-plugin-framework/assets/module/common/ModuleUtil";
import { UIID } from "../../common/config/GameUIConfig";
import { Initialize } from "../Initialize";
import { LoadingViewComp } from "../view/LoadingViewComp";

/** Initialize game common resources */
@ecs.register('InitRes')
export class InitResComp extends ecs.Comp {
    reset() { }
}

/** Initialize resource logic registered in Initialize module */
@ecs.register('Initialize')
export class InitResSystem extends ecs.ComblockSystem implements ecs.IEntityEnterSystem {
    filter(): ecs.IMatcher {
        return ecs.allOf(InitResComp);
    }

    entityEnter(e: Initialize): void {
        var queue: AsyncQueue = new AsyncQueue();

        // Load custom resources
        this.loadCustom(queue);
        // Load language packs
        this.loadLanguage(queue);
        // Load common resources
        this.loadCommon(queue);
        // Load game content loading progress UI
        this.onComplete(queue, e);

        queue.play();
    }

    /** Load custom content (optional) */
    private loadCustom(queue: AsyncQueue) {
        queue.push(async (next: NextFunction, params: any, args: any) => {
            // Load font corresponding to language
            oops.res.load("language/font/" + oops.language.current, next);
        });
    }

    /** Load language packs (optional) */
    private loadLanguage(queue: AsyncQueue) {
        queue.push((next: NextFunction, params: any, args: any) => {
            // Set default language
            let lan = oops.storage.get("language");
            if (lan == null || lan == "") {
                lan = "zh";
                oops.storage.set("language", lan);
            }

            // Load language pack resources
            oops.language.setLanguage(lan, next);
        });
    }

    /** Load common resources (required) */
    private loadCommon(queue: AsyncQueue) {
        queue.push((next: NextFunction, params: any, args: any) => {
            oops.res.loadDir("common", next);
        });
    }

    /** Load complete and enter game content loading interface */
    private onComplete(queue: AsyncQueue, e: Initialize) {
        queue.complete = async () => {
            ModuleUtil.addViewUi(e, LoadingViewComp, UIID.Loading);
            e.remove(InitResComp);
        };
    }
}