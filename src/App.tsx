import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { Inquire } from "./pages/Inquire"
import { Plans } from "./pages/Plans"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planes" element={<Plans />} />
        <Route path="/consultar" element={<Inquire />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
