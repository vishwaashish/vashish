export const initialState = {
  lowerCase: { label: 'Lower Case', checked: true },
  upperCase: { label: 'Upper Case', checked: true },
  specialChar: { label: 'Special Character', checked: true },
  digits: { label: 'Digits', checked: true },
}

export const charactersUsed = {
  lowerCase: 'abcdefghijklmnopqrstuvwxyz',
  upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  specialChar: "!@#$%^&*()-_=+[]{}|;:',.<>?",
  digits: '0123456789',
}

export interface charactersModal<T> {
  lowerCase: T
  upperCase: T
  specialChar: T
  digits: T
}

export const MAX_CATEGORY_LENGTH = 50
export const MIN_CATEGORY_LENGTH = 4

export const initialCategory = {
  easyToRead: {
    checked: false,
    label: 'Easy to read',
    enabled: ['lowerCase', 'upperCase'],
    disabled: ['specialChar', 'digits'],
  },
  pin: {
    checked: false,
    label: 'Pin',
    enabled: ['digits'],
    disabled: ['lowerCase', 'upperCase', 'specialChar'],
  },
  allCharacter: {
    checked: true,
    label: 'All characters',
    enabled: Object.keys(initialState),
    disabled: [],
  },
}

export interface StateModel {
  lowerCase: StateObjectModel
  upperCase: StateObjectModel
  specialChar: StateObjectModel
  digits: StateObjectModel
}

export type StateObjectModel = {
  label: string
  checked: boolean
}
export interface CategoryModal {
  easyToRead: CategoryObjModal
  pin: CategoryObjModal
  allCharacter: CategoryObjModal
}

export type CategoryObjModal = {
  checked: boolean
  label: string
  enabled: string[]
  disabled: string[]
}

export type CategoriesMap = [string, CategoryObjModal]

export type InitialMap = [string, StateObjectModel]
