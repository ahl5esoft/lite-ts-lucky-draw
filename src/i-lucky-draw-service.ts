
import { IUnitOfWork } from 'lite-ts-db';
import { Value, ValueService } from 'lite-ts-value';

export interface ILuckyDrawService {
    readonly valueService: ValueService;

    getData(uow: IUnitOfWork): Promise<{
        text: string;
        exp: number;
        level: number;
        totalExps: number;
        scenes: {
            scene: string;
            count: number;
            consume: Value[];
            disable: boolean;
        }[];
        probabilities: {
            level: number;
            probability: {
                text: string;
                weight: number;
            }[];
        }[];
    }>;

    luckyDraw(uow: IUnitOfWork, scene: string): Promise<Value[]>;
}
