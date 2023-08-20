export type InitialStateModal = {
  lowerCase: string
  upperCase: string
  specialChar: string
  digits: string
  inRange: string
  containSpace: string
}

type RegrexObject = {
  lowerCase: RegExp
  upperCase: RegExp
  specialChar: RegExp
  digits: RegExp
  inRange: RegExp
  containSpace: RegExp
}

export type InitialState = {
  [key: string]: string
}
export type MutateInitialState = {
  [key: string]: { msg: string; valid: boolean }
}

export const MAX_CATEGORY_LENGTH = 50
export const MIN_CATEGORY_LENGTH = 1

export type ValidResult = {
  value: Record<string, { msg: string; valid: boolean }>
  level: number
}
export const initialState: InitialState = {
  lowerCase: 'The password contain lowercase letters.',
  upperCase: 'The password contain uppercase letters.',
  specialChar: 'The password contain special characters.',
  digits: 'The password contain digits.',
  inRange: 'The password meet the specified length.',
  containSpace: 'The password does not contain spaces.',
}
export const regrex = (length = 8): RegrexObject => ({
  lowerCase: /(?=.*[a-z])/g,
  upperCase: /(?=.*[A-Z])/g,
  specialChar: /(?=.*[\[\]!@#$%^&*()\-_=+{}|;:',.<>?])/g,
  digits: /(?=.*[0-9])/g,
  inRange: new RegExp(
    '^(?=.{' + length + ',' + MAX_CATEGORY_LENGTH + '}$)',
    'g',
  ),
  containSpace: /(?=.*^[^\s]*$)/g,
})

export const emogi: InitialState = {
  success: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  className="w-6 h-6"
>
  <path
    fillRule="evenodd"
    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
    clipRule="evenodd"
  />
</svg>`,
  error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
</svg>
`,
}
