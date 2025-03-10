import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { setupStore } from './store/store.ts'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const store = setupStore()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/-7winds.mobi-/'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)