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
  const closeMessage = colorize('\nClosing CLI...', 'FgYellow');

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

  const gitLog = await runShellCommand('git status').then((res) => res?.stdout.trim());
  if (gitLog?.includes('Changes not staged for commit')) {
    console.log('Changes not staged for commit:');
    console.log(` use "${colorize('git add <file>...', 'FgGreen')}" to update what will be committed`);
    console.log(` use "${colorize('git restore <file>...', 'FgYellow')}" to discard changes in working directory`);
    console.log(`\nuse "${colorize('git status', 'FgMagenta')}" to get more info!`);

    console.log(closeMessage);
    return process.exit(0);
  } if (gitLog?.includes('nothing to commit')) {
    console.log(
      colorize('nothing to commit, working tree clean', 'FgYellow', 'None', 'Bright'),
    );

    console.log(closeMessage);
    return process.exit(0);
  }

  const branch = await runShellCommand(
    'git rev-parse --abbrev-ref HEAD',
  ).then((res) => res?.stdout.trim().replace(/\/(.*)/, ''));

  if (branch === undefined) {
    console.log(
      colorize(
        "Oops.. Git hasn't been initialized in this directory yet!",
        'FgRed',
      ),
    );

    console.log(closeMessage);
    return process.exit(0);
  }

  console.log(`You're currently working on task ${colorize(branch, 'FgGreen')}`);

  rl.question('Type a commit message: ', (msg: string) => {
    const gc = `git commit -m "${branch}: ${msg}"`;

    console.log(`\n${colorize(gc, 'FgMagenta', 'None', 'Bright')}\n`);
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
    console.log(closeMessage);
    process.exit(0);
  });
};

export default main;
