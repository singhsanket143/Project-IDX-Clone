import child_process from 'child_process';
import util from 'util';
export const execPromisified = util.promisify(child_process.exec);

