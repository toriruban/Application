interface FieldsProps {
  name: string
  email: string
  password: string
  setName: (v: string) => void
  setEmail: (v: string) => void
  setPassword: (v: string) => void
}

export default function RegisterFormFields ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
}: FieldsProps) {
    return (
      <>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-600 bg-gray-700 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          required
        />
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
