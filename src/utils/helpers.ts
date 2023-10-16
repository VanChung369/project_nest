import * as bcrypt from 'bcrypt';

export class Helpers {
  public static toNumbers(strs: string[]) {
    return strs.map((str) => Number(str));
  }

  public static toListString(listObject: any[], field = '') {
    return listObject.map((obj) => obj.toString());
  }

  public static getRandom(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  public static wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  public static isEmpty(str) {
    return !str || str.length === 0;
  }

  public static isParamExists(param) {
    return param !== undefined ? true : false;
  }

  public static async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  public static async comparePassword(password: string, hashPassword: string) {
    return await bcrypt.compare(password, hashPassword);
  }
}
