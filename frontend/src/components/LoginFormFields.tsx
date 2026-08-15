interface LoginFieldsProps {
  email: string
  password: string
  setEmail: (v: string) => void
  setPassword: (v: string) => void
}

export default function LoginFormFields ({
  email,
  password,
  setEmail,
  setPassword,
}: LoginFieldsProps) {
    return (
    <>    
         <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="border border-gray-600 bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="border border-gray-600 bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
      required
    />
  </>
    )
}
