/* eslint-disable consistent-return */
import { exec } from 'child_process';
import readline from 'readline';
import util from 'util';
import shell from 'shelljs';
import colorize from './utils/colorize.js';

const execProm = util.promisify(exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  async function runShellCommand(command: string) {
    let result: { stdout: string; stderr: string; };
    try {
      result = await execProm(command);
    } catch (ex: any) {
      result = ex;
    }
    if (Error[Symbol.hasInstance](result)) { return; }

    return result;
  }

  const hasUnstagedChanges = await runShellCommand('git status').then((res) => res?.stdout.trim().includes('Changes not staged for commit'));
  if (hasUnstagedChanges) {
    console.log('Changes not staged for commit:');
    console.log(` use "${colorize('git add <file>...', 'Blink')}" to update what will be committed`);
    console.log(` use "${colorize('git restore <file>...', 'FgYellow')}" to discard changes in working directory`);
    console.log(`\nuse "${colorize('git status', 'FgMagenta')}" to get more info!`);
    return process.exit(0);
  }

  const branch = await runShellCommand(
    'git rev-parse --abbrev-ref HEAD',
  ).then((res) => res?.stdout.trim().replace(/\/(.*)/, ''));

  console.log(`You're currently working on task ${colorize(branch, 'FgGreen')}`);

  rl.question('Type a commit message: ', (msg: string) => {
    const gc = `git commit -m "${branch}: ${msg}"`;

    console.log(`\n${colorize(gc, 'FgMagenta')}\n`);
    rl.question('Do you want to commit this message? [Y/n]: ', (op: string) => {
      if (op.toLowerCase() === 'y' || op === '') {
        shell.exec(gc);
        console.log(colorize('commit message added!', 'FgGreen'));
        process.exit(0);
      }

      rl.close();
    });
  });

  rl.on('close', () => {
    console.log(colorize('\nClosing CLI...', 'FgYellow'));
    process.exit(0);
  });
};

export default main;
