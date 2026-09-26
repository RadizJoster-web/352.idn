import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import Providers from './providers'

export default function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  )
}
