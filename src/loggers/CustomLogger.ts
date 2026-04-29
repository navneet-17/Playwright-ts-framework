export class CustomLogger {

  private static instance: CustomLogger | null = null;

  private constructor(){

  }
    public static getInstance(): CustomLogger {
    if (CustomLogger.instance === null) {
      CustomLogger.instance = new CustomLogger();
    }
    return CustomLogger.instance;
  }
  

  // ISO format for Allure/file logs
  private isoTimestamp(): string {
    const IST_OFFSET = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const ist = new Date(new Date().getTime() + IST_OFFSET);
    return ist.toISOString().replace('Z', '+05:30');
  }
  // Human readable for terminal
  private readableTimestamp(): string {
    return new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: false
    });
  }

 info(message: string, ...args: any[]) {
   console.log(`[${this.readableTimestamp()}] INFO: ${message}`, ...args);
 }
 success(message: string, ...args: any[]) {
    // \x1b[32m : green for test pass confirmations => revert post the message to default (\x1b[0m)
    console.log(`\x1b[32m[${this.readableTimestamp()}] PASS: ${message}\x1b[0m`, ...args);
 }
  // \x1b[31m : red for test fail confirmations => revert post the message to default (\x1b[0m)
 error(message: string, ...args: any[]) {
   console.error(`\x1b[31m[${this.readableTimestamp()}] ERROR: ${message}\x1b[0m`, ...args);
 }
 // \x1b[33m : yellow for warnings => revert post the message to default (\x1b[0m)
 warn(message: string, ...args: any[]) {
   console.warn(`\x1b[33m[${this.readableTimestamp()}] WARN: ${message}\x1b[0m`, ...args);
 }
}
