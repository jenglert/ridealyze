import http from 'http'
import app from './server'

const server = http.createServer(app);

let currentApp = app;
server.listen(3000);

const anyModule = module as any;

if (anyModule.hot) {
    anyModule.hot.accept('./server', () => {
        server.removeListener('request', currentApp)
        server.on('request', app)
        currentApp = app
    })
}