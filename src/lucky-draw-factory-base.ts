import { IUnitOfWork } from 'lite-ts-db';

import { ILuckyDrawService } from './i-lucky-draw-service';

export abstract class LuckyDrawFactoryBase {
    public abstract findLuckyDrawServices(uow: IUnitOfWork): Promise<{ [no: number]: ILuckyDrawService; }>;
}