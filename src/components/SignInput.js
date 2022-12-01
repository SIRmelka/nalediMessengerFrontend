import React from 'react'

const SignInput = ({
  firstname,
  setFirstname,
  lastname,
  setLastname,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder="Firstname"
        value={firstname}
        onChange={(event) => {
          setFirstname(event.target.value)
        }}
        required
      ></input>

      <input
        type="text"
        placeholder="Lastname"
        value={lastname}
        onChange={(event) => {
          setLastname(event.target.value)
        }}
        required
      ></input>

      <input
        // type="email"
        placeholder="E-mail address"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
        }}
        required
      ></input>

      <input
        type="password"
        placeholder="Password"
        value={confirmPassword}
        onChange={(event) => {
          setConfirmPassword(event.target.value)
        }}
        required
      ></input>

      <input
        type="password"
        placeholder="confirm Password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
        }}
        required
      ></input>
    </>
  )
}

export default SignInput
