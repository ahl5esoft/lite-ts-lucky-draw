import { EnumItem, Reward, ValueCondition } from 'lite-ts-enum';
import { Value } from 'lite-ts-value';

/**
 * 幸运抽奖
 */
export class LuckyDrawData extends EnumItem {
    public static ctor = 'LuckyDrawData';
    /**
     * 对照数值
     */
    public contrastValueType: number;

    /**
     * 关闭条件
     */
    public closeConditions: ValueCondition[][];

    /**
     * 关闭时间戳
     */
    public closeOn: number;

    /**
     * 抽奖场景
     */
    public luckyDraw: {
        [scene: string]: {
            /**
             * 抽箱子次数(初始)
             */
            count: number;
            /**
             * 消耗
             */
            consume: Value[];
            /**
             * 购买后要增加的幸运抽奖的数值
             * 商店经验等
             */
            values: Value[];
            /**
             * 抽箱子次数数值，可增长次数
             * 当这个配置存在时，抽奖次数使用 await valueService.getCount(uow, countValueType) 代替 count
             */
            countValueType?: number;
            /**
             * 抽奖限制条件
             */
            limitConditions?: ValueCondition[][];
        };
    };

    /**
     * 隐藏条件
     */
    public hideConditions: ValueCondition[][];

    /**
     * 隐藏时间戳
     */
    public hideOn: number;

    /**
     * 等级升级配置
     */
    public upgrade: {
        /**
         * 经验数值
         */
        expValueType: number;

        /**
         * 等级数值
         */
        levelValueType: number;

        /**
         * 升级配置
         */
        levels: {
            [level: number]: {
                /**
                 * 升级后获得的数值
                 */
                values: Value[];
                /**
                 * 升级所需的经验
                 */
                exps: number;
            };
        };
    };

    /**
     * 商店名(后台看)
     */
    public name: string;

    /**
     * 开启条件
     */
    public openConditions: ValueCondition[][];

    /**
     * 开启时间戳
     */
    public openOn: number;

    /**
     * 排序
     */
    public order: number;

    /**
     * 奖池奖励
     */
    public rewards: Reward[][];

    /**
     * 商店编号
     */
    public value: number;
}