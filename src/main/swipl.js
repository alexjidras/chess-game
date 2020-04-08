require('fix-path')();
const { app, dialog } = require('electron');
const { spawn } = require('child_process');
const path = require('path');

class Swipl {
    _swipl;
    ipcRenderer;
    constructor(ipcRenderer) {
        this.ipcRenderer = ipcRenderer;
    }

    startGame() {
        this._swipl = spawn('swipl', {
            cwd: path.join(__dirname, '../../static/prolog/')
        });

        this._swipl.on('error', (e) => {
            if (e.code === 'ENOENT') {
                dialog.showErrorBox('Prolog not found in command line', 'Error executing swipl command, please make sure SWI Prolog is installed and available from command line');
                app.quit();

                return;
            }

            throw e;
        });

        this._swipl.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
        
        this._swipl.stdout.on('data', (data) => {
            const output = data.toString();
            if (output.includes('My move')) {
                const moveStartPosition = output.search(/[a-h][1-8][a-h][1-8]/);
                if (moveStartPosition === -1) {
                    console.error(new Error('Move not found'));
                    return;
                }
                const move = output.slice(moveStartPosition, moveStartPosition + 4);  
                this.ipcRenderer.send('game-events', 'MOVE', move);
            } else if (output.includes('Illegal Move')) {
                this.ipcRenderer.send('game-events', 'ILLEGAL_MOVE');
            } else if (/(black|white) wins/.test(output)) {
                const winner = output.match(/black|white/)[0];
                this.ipcRenderer.send('game-events', 'WIN', winner);
            }
        });
        
        this._swipl.stdin.on('error', (e) => {
            //ignore stdin errors
        });

        this._call("[chess]");
        this._call('run');
    }

    _write(data) {
        this._swipl.stdin.write(`${data}\n`);
    }

    _call(command) {
        this._swipl.stdin.write(`${command}.\n`);
    }

    write(data) {
        if (this._swipl) {
            this._write(data);
        }
    }

    call(command) {
        if (this._swipl) {
            this._call(command);
        }
    }

    restartGame(color) {
        this.stopGame();
        this.startGame();
        this._write(color);
    }

    stopGame() {
        if(this._swipl) {
            this._swipl.kill();
        }
    }
}

module.exports = Swipl;

