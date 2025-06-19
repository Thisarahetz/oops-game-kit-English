/*
 * @Author: dgflash
 * @Date: 2021-11-12 10:02:31
 * @LastEditors: dgflash
 * @LastEditTime: 2022-07-25 17:03:45
 */
import { ecs } from "../../../../../extensions/oops-plugin-framework/assets/libs/ecs/ECS";

/** 
 * Game account data 
 */
@ecs.register('AccountModel')
export class AccountModelComp extends ecs.Comp {
    /** Account name */
    AccountName: string = null!;

    reset() {
        this.AccountName = null!;
    }
}