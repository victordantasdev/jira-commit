import colorize from './utils/colorize.js';

console.log(colorize('Bright', 'None', 'None', 'Bright'));
console.log(colorize('Dim', 'None', 'None', 'Dim'));
console.log(colorize('Underscore', 'None', 'None', 'Underscore'));
console.log(colorize('Blink', 'None', 'None', 'Blink'));
console.log(colorize('Reverse', 'None', 'None', 'Reverse'));
console.log(colorize('Hidden', 'None', 'None', 'Hidden'));

console.log(colorize('FgBlack', 'FgBlack'));
console.log(colorize('FgRed', 'FgRed'));
console.log(colorize('FgGreen', 'FgGreen'));
console.log(colorize('FgYellow', 'FgYellow'));
console.log(colorize('FgBlue', 'FgBlue'));
console.log(colorize('FgMagenta', 'FgMagenta'));
console.log(colorize('FgCyan', 'FgCyan'));
console.log(colorize('FgWhite', 'FgWhite'));

console.log(colorize('BgBlack', 'None', 'BgBlack'));
console.log(colorize('BgRed', 'None', 'BgRed'));
console.log(colorize('BgGreen', 'None', 'BgGreen'));
console.log(colorize('BgYellow', 'None', 'BgYellow'));
console.log(colorize('BgBlue', 'None', 'BgBlue'));
console.log(colorize('BgMagenta', 'None', 'BgMagenta'));
console.log(colorize('BgCyan', 'None', 'BgCyan'));
console.log(colorize('BgWhite', 'None', 'BgWhite'));
