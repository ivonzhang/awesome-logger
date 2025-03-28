import { client } from './utils/init';

import './App.css'

function App() {
  const handleClick = () => {
    client.info('click', {
      message: 'click button',
    });
  }

  return (
    <>
      <h1>awesome logger demo</h1>
      <div className="card">
        <button onClick={handleClick}>
          send log
        </button>
        <p>
          Please open the <code>DevTool</code> to see the request log
        </p>
      </div>
    </>
  )
}

export default App
