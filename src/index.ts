import http from 'http'
import app from './server'

const server = http.createServer(app);

let currentApp = app;
server.listen(3000);

const anyModule = module as any;

if (anyModule.hot) {
    anyModule.hot.accept('./server', () => {
        console.log('🔁  HMR Reloading `./server`...');
        server.removeListener('request', currentApp);
        const newApp = require('./server').default
        server.on('request', newApp);
        currentApp = newApp;
    })
}