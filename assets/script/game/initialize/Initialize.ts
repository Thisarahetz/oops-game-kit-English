/*
 * @Author: dgflash
 * @Date: 2021-11-11 17:45:23
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-03 10:07:14
 */
import { ecs } from "../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";
import { InitResComp } from "./bll/InitRes";

/**
 * Game initialization module
 * 1. Hot update
 * 2. Load default resources
 */
@ecs.register('Initialize')
export class Initialize extends ecs.Entity {
    protected init() {
        // Initialize game common resources
        this.add(InitResComp);
    }
}

// export class EcsInitializeSystem extends ecs.System {
//     constructor() {
//         super();

//         this.add(new InitResSystem());
//     }
// }