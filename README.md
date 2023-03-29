# ![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## install

```
npm install lite-ts-lukcy-draw
```

## use

```typescript
import { LuckyDrawFactory, LuckyDrawFactoryBase } from 'lite-ts-lucky-draw';

const enumFactory: EnumFactoryBase;
const rpc: RpcBase;
const valueService: ValueService;
const luckyDrawFactory: LuckyDrawFactoryBase = new LuckyDrawFactory('lucky-draw', enumFactory, rpc, valueService);

const uow: IUnitOfWork;
const luckyDrawServices = await luckyDrawFactory.findLuckyDrawServices(uow);
for (const r of luckyDrawServices) {
    const data = await r.getData(uow);
    data.text; // 商店名称多语言键
    data.exp; // 商店的当前经验
    data.level; // 商店的等级
    data.totalExps; // 商店升级所需要的经验
    data.scenes; // 商店的抽奖场景（11连抽，35连抽，视频抽奖）
    data.probabilities; // 商店每个等级的宝箱的概率

    await r.luckyDraw(uow, 'scenes属性中的scene参数'); // 进行抽奖，返回抽奖的奖励
}
```
