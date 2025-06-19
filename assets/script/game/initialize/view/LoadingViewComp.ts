/*
 * @Author: dgflash
 * @Date: 2021-07-03 16:13:17
 * @LastEditors: bansomin
 * @LastEditTime: 2024-03-31 01:17:02
 */
import { _decorator } from "cc";
import { oops } from "../../../../../extensions/oops-plugin-framework/assets/core/Oops";
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { CCVMParentComp } from "../../../../../extensions/oops-plugin-framework/assets/module/common/CCVMParentComp";
import { ModuleUtil } from "../../../../../extensions/oops-plugin-framework/assets/module/common/ModuleUtil";
import { DemoViewComp } from "../../account/view/DemoViewComp";
import { smc } from "../../common/SingletonModuleComp";
import { UIID } from "../../common/config/GameUIConfig";

const { ccclass, property } = _decorator;

/** Game resource loading */
@ccclass('LoadingViewComp')
@ecs.register('LoadingView', false)
export class LoadingViewComp extends CCVMParentComp {
    /** VM component binding data */
    data: any = {
        /** Current progress of loading resources */
        finished: 0,
        /** Maximum progress of loading resources */
        total: 0,
        /** Loading resource progress ratio value */
        progress: "0",
        /** Loading process prompt text */
        prompt: ""
    };

    private progress: number = 0;

    start() {
        this.enter();
    }

    enter() {
        this.loadRes();
    }

    /** Load resources */
    private async loadRes() {
        this.data.progress = 0;
        await this.loadCustom();
        this.loadGameRes();
    }

    /** Load game local JSON data (custom content) */
    private loadCustom() {
        // Load multilingual prompt text for game local JSON data
        this.data.prompt = oops.language.getLangByID("loading_load_json");
    }

    /** Load initial game content resources */
    private loadGameRes() {
        // Load multilingual prompt text for initial game content resources
        this.data.prompt = oops.language.getLangByID("loading_load_game");
        oops.res.loadDir("game", this.onProgressCallback.bind(this), this.onCompleteCallback.bind(this));
    }

    /** Loading progress event */
    private onProgressCallback(finished: number, total: number, item: any) {
        this.data.finished = finished;
        this.data.total = total;

        var progress = finished / total;
        if (progress > this.progress) {
            this.progress = progress;
            this.data.progress = (progress * 100).toFixed(2);
        }
    }

    /** Loading complete event */
    private async onCompleteCallback() {
        // Get multilingual prompt text for user information
        this.data.prompt = oops.language.getLangByID("loading_load_player");
        await ModuleUtil.addViewUiAsync(smc.account, DemoViewComp, UIID.Demo);
        ModuleUtil.removeViewUi(this.ent, LoadingViewComp, UIID.Loading);
    }

    reset(): void { }
}