import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // สร้าง source maps สำหรับการ build ใน production
  },
  server: {
    hmr: {
      overlay: false // ปิดการใช้งาน overlay ข้อผิดพลาดของ HMR
    }
  }
})
