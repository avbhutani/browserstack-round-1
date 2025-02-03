const fs = require("fs");
const readline = require("readline");

async function readFile(filePath, numLines = 10) {
    const stream = fs.createReadStream(filePath, { encoding: "utf8", highWaterMark: 1024 });
    const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

    let lines = [];
    
    for await (const line of rl) {
        lines.push(line);
        if (lines.length > numLines) {
            lines.shift();
        }
    }

    return lines
}

module.exports = readFile
