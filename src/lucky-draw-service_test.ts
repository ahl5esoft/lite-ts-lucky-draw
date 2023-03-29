import { deepStrictEqual } from 'assert';
import { Enum, EnumFactoryBase, EnumItem } from 'lite-ts-enum';
import { Mock } from 'lite-ts-mock';
import { RpcBase } from 'lite-ts-rpc';
import { ValueTypeData, ValueTypeRewardAddition, ValueTypeRewardOpen } from 'lite-ts-value';

import { LuckyDrawData } from './lucky-draw-data';
import { LuckyDrawService as Self } from './lucky-draw-service';

describe('src/lucky-draw-service.ts', () => {
    describe('.getData(uow: IUnitOfWork)', () => {
        it('ok', async () => {
            const enumFactoryMock = new Mock<EnumFactoryBase>();
            const self = new Self('lucky-draw', enumFactoryMock.actual, {
                value: 1,
                upgrade: {
                    expValueType: 4,
                    levelValueType: 5,
                    levels: {}
                },
                luckyDraw: {
                }
            } as LuckyDrawData, async () => 1, {}, null);

            const valueTypeEnumMock = new Mock<Enum<EnumItem>>({
                get allItem() {
                    return Promise.resolve({});
                }
            });
            enumFactoryMock.expectReturn(
                r => r.build(ValueTypeData.ctor, undefined),
                valueTypeEnumMock.actual,
            );

            const enumMock = new Mock<Enum<EnumItem>>();
            enumFactoryMock.expectReturn(
                r => r.build(ValueTypeData.ctor),
                enumMock.actual,
            );

            enumFactoryMock.expectReturn(
                r => r.build(ValueTypeData.ctor, undefined),
                valueTypeEnumMock.actual,
            );

            enumMock.expectReturn(
                r => r.getReduce(ValueTypeRewardOpen.ctor),
                {}
            );
            enumMock.expectReturn(
                r => r.getReduce(ValueTypeRewardAddition.ctor),
                {}
            );

            const res = await self.getData(null);
            deepStrictEqual(res, {
                text: 'LuckyDrawData_1_name',
                exp: 0,
                level: 0,
                totalExps: undefined,
                scenes: [],
                probabilities: []
            });
        });
    });

    describe('.luckyDraw(uow: IUnitOfWork, scene: string)', () => {
        it('ok', async () => {
            const rpcMock = new Mock<RpcBase>();
            const self = new Self('lucky-draw', null, {
                value: 1,
            } as any, null, {}, rpcMock.actual);

            rpcMock.expectReturn(
                r => r.call({
                    route: '/lucky-draw/mh/lucky-draw',
                    body: {
                        value: 1,
                        scene: 's'
                    }
                }),
                {
                    rewards: [
                        {
                            count: 1,
                            valueType: 1
                        }
                    ],
                    values: {
                        1: 1,
                        2: 1
                    }
                }
            );

            const oldValues = await self.valueService.ownValue;
            deepStrictEqual(oldValues, {});

            const res = await self.luckyDraw(null, 's');
            deepStrictEqual(res, [{
                count: 1,
                valueType: 1
            }]);

            const newValues = await self.valueService.ownValue;
            deepStrictEqual(newValues, {
                1: 1,
                2: 1
            });
        });
    });
});