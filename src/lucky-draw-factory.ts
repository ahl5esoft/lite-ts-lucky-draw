import { IUnitOfWork } from 'lite-ts-db';
import { EnumFactoryBase } from 'lite-ts-enum';
import { RpcBase } from 'lite-ts-rpc';
import { ValueService } from 'lite-ts-value';

import { ILuckyDrawService } from './i-lucky-draw-service';
import { LuckyDrawData } from './lucky-draw-data';
import { LuckyDrawFactoryBase } from './lucky-draw-factory-base';
import { LuckyDrawService } from './lucky-draw-service';

export class LuckyDrawFactory extends LuckyDrawFactoryBase {
    private m_LuckyDrawServices: { [no: number]: ILuckyDrawService; };

    public constructor(
        private m_App: string,
        private m_EnumFactory: EnumFactoryBase,
        private m_Rpc: RpcBase,
        private m_UserValueService: ValueService,
    ) {
        super();
    }

    public async findLuckyDrawServices(uow: IUnitOfWork) {
        if (!this.m_LuckyDrawServices) {
            const res = await this.m_Rpc.call<{
                entry: LuckyDrawData;
                values: { [valueType: number]: number; };
            }[]>({
                route: `/${this.m_App}/mh/find`,
            });
            const getNowFunc = async () => {
                return await this.m_UserValueService.getCount(uow, 68);
            };

            this.m_LuckyDrawServices = res.reduce((memo, r) => {
                memo[r.entry.value] = new LuckyDrawService(
                    this.m_App,
                    this.m_EnumFactory,
                    r.entry,
                    getNowFunc,
                    r.values,
                    this.m_Rpc,
                );
                return memo;
            }, {});
        }
        return this.m_LuckyDrawServices;
    }
}