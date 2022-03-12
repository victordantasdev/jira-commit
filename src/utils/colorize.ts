const colorize = (
  str: string,
  foreground:
    'FgBlack' |
    'FgRed' |
    'FgGreen' |
    'FgYellow' |
    'FgBlue' |
    'FgMagenta' |
    'FgCyan' |
    'FgWhite' |
    'None' = 'None',
  background:
    'BgBlack' |
    'BgRed' |
    'BgGreen' |
    'BgYellow' |
    'BgBlue' |
    'BgMagenta' |
    'BgCyan' |
    'BgWhite' |
    'None' = 'None',
  style:
    'Bright' |
    'Dim' |
    'Underscore' |
    'Blink' |
    'Reverse' |
    'Hidden' |
    'None' = 'None',
) => {
  const reset = '\x1b[0m';

  const fg = {
    FgBlack: '\x1b[30m',
    FgRed: '\x1b[31m',
    FgGreen: '\x1b[32m',
    FgYellow: '\x1b[33m',
    FgBlue: '\x1b[34m',
    FgMagenta: '\x1b[35m',
    FgCyan: '\x1b[36m',
    FgWhite: '\x1b[37m',
    None: '',
  };

  const bg = {
    BgBlack: '\x1b[40m',
    BgRed: '\x1b[41m',
    BgGreen: '\x1b[42m',
    BgYellow: '\x1b[43m',
    BgBlue: '\x1b[44m',
    BgMagenta: '\x1b[45m',
    BgCyan: '\x1b[46m',
    BgWhite: '\x1b[47m',
    None: '',
  };

  const styles = {
    Bright: '\x1b[1m',
    Dim: '\x1b[2m',
    Underscore: '\x1b[4m',
    Blink: '\x1b[5m',
    Reverse: '\x1b[7m',
    Hidden: '\x1b[8m',
    None: '',
  };

  const resetedStr = `${str}${reset}`;
  return `${styles[style]}${bg[background]}${fg[foreground]}${resetedStr}`;
};

export default colorize;
