import { client } from './utils/init';

import './App.css'

function App() {
  const handleClick = (type: 'info' | 'error' | 'warn') => {
    switch (type) {
      case 'info':
        client.info('click', {
          message: 'click button',
        });
        break;
      case 'error':
        client.error('error', {
          err: new Error('error message'),
        });
        break;
      case 'warn':
        client.warn('warn', {
          message: 'warn message',
        });
        break;
      default:
        client.info('click', {
          message: 'click button',
        });
    }
  }

  return (
    <>
      <h1>awesome logger demo</h1>
      <div className="card">
        <button onClick={() => handleClick('info')}>
          send info log
        </button>
        <button onClick={() => handleClick('error')}>
          send error log
        </button>
        <button onClick={() => handleClick('warn')}>
          send warn log
        </button>
        <p>
          Please open the <code>DevTool</code> to see the request log
        </p>
      </div>
    </>
  )
}

export default App
