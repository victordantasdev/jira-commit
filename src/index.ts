/* eslint-disable consistent-return */
const { exec } = require('child_process');
const readline = require('readline');
const util = require('util');
const shell = require('shelljs');

const execProm = util.promisify(exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const main = async () => {
  const colorize = (
    str: string,
    color: 'red' | 'yellow' | 'green' | 'magenta',
  ) => {
    const reset = '\x1b[0m';
    const colors = {
      red: '\x1b[31m',
      yellow: '\x1b[33m',
      green: '\x1b[32m',
      magenta: '\x1b[35m',
    };

    const resetedStr = `${str}${reset}`;
    return `${colors[color]}${resetedStr}`;
  };

  async function runShellCommand(command: string) {
    let result;
    try {
      result = await execProm(command);
    } catch (ex) {
      result = ex;
    }
    if (Error[Symbol.hasInstance](result)) { return; }

    return result;
  }

  const hasUnstagedChanges = await runShellCommand('git status').then((res) => res.stdout.trim().includes('Changes not staged for commit'));
  if (hasUnstagedChanges) {
    console.log('Changes not staged for commit:');
    console.log(` use "${colorize('git add <file>...', 'green')}" to update what will be committed`);
    console.log(` use "${colorize('git restore <file>...', 'yellow')}" to discard changes in working directory`);
    console.log(`\nuse "${colorize('git status', 'magenta')}" to get more info!`);
    return process.exit(0);
  }

  const branch = await runShellCommand(
    'git rev-parse --abbrev-ref HEAD',
  ).then((res) => res.stdout.trim().replace(/\/(.*)/, ''));

  console.log(`You are currently on the branch ${colorize(branch, 'green')}`);

  rl.question('Type a commit message: ', (msg: string) => {
    const gc = `git commit -m "${branch}: ${msg}"`;

    console.log(`\n${colorize(gc, 'magenta')}\n`);
    rl.question('Do you want to commit this message? [Y/n]: ', (op: string) => {
      if (op.toLowerCase() === 'y' || op === '') {
        shell.exec(gc);
        console.log(colorize('commit message added!', 'green'));
        process.exit(0);
      }

      rl.close();
    });
  });

  rl.on('close', () => {
    console.log(colorize('\nClosing CLI...', 'yellow'));
    process.exit(0);
  });
};

main();
