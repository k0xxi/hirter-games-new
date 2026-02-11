import { Login } from './components/Login'

export default function LoginPreview() {
  return (
    <Login
      onLogin={(email, password) => console.log('Login:', email, password)}
      onForgotPassword={() => console.log('Forgot password clicked')}
    />
  )
}
