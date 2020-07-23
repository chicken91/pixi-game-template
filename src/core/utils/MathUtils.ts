

export class MathUtils {
    public static getRandomInArray(list: Array<any>): any {
        return list[Math.round((list.length - 1) * Math.random())];
    }
}