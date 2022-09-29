import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const basename = process.env.PUBLIC_URL // 可以設定在 .env 相關檔案

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter basename={basename}>
        <App />
    </BrowserRouter>
)
