import { ILuckyDrawService } from './i-lucky-draw-service';
import { LuckyDrawData } from './lucky-draw-data';
import { LuckyDrawFactory } from './lucky-draw-factory';
import { LuckyDrawFactoryBase } from './lucky-draw-factory-base';

export {
    ILuckyDrawService,
    LuckyDrawData,
    LuckyDrawFactory,
    LuckyDrawFactoryBase
};

globalThis['lite-ts-lucky-draw'] = {
    LuckyDrawData,
    LuckyDrawFactory,
    LuckyDrawFactoryBase
};