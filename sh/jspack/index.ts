import { JsPack } from 'lite-ts-fs';

(async () => {
    const jsPack = new JsPack();
    await jsPack.pack();
})();