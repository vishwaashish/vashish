import { ChangeEvent, useCallback, useState } from 'react'
import {
  ValidResult,
  initialState,
  regrex,
  MAX_CATEGORY_LENGTH,
  MIN_CATEGORY_LENGTH,
  emogi,
  InitialState,
  MutateInitialState,
} from './data'
import _ from 'lodash'
import PasswordLayout from './../PasswordLayout'
import { cn } from '@/components/utils'

export default function PasswordValidator() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('')
  const [level, setLevel] = useState(0)
  const [cretaria, setCretaria] = useState<MutateInitialState>(() => {
    const convertedState = _.mapValues(initialState, msg => ({
      msg,
      valid: false,
    }))

    return convertedState
  })

  console.log(cretaria, length)

  const onLength = (e: ChangeEvent<HTMLInputElement> | any) => {
    const value = e.target.value
    const validValue = valid(password, value)
    setLength(+value)
    setCretaria(validValue.value)
    setLevel(validValue.level)
  }

  const valid = (value: string, length = 8): ValidResult => {
    const mapvalue = new Map<string, { msg: string; valid: boolean }>()
    _.forEach(regrex(length), (reg, key) => {
      _.forEach(initialState, (msg, msgKey) => {
        if (msgKey === key) {
          const isValid = reg.test(value)
          mapvalue.set(key, { msg, valid: isValid })
        }
      })
    })

    const mapArray = Array.from(mapvalue.entries())

    return {
      value: _.fromPairs(mapArray),
      level: _.filter(mapArray, val => val[1].valid)?.length ?? 0,
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    const value = e.target.value
    setPassword(value)
    const validValue = valid(value)
    setCretaria(validValue.value)
    setLevel(validValue.level)
  }

  const onSetLengthInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      setLength(+e.target.value)
    },
    [setLength],
  )

  const onSetLengthInputBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      const value = e.target.value

      if (+value <= MIN_CATEGORY_LENGTH) {
        return setLength(MIN_CATEGORY_LENGTH)
      }

      if (+value > MAX_CATEGORY_LENGTH) {
        return setLength(MAX_CATEGORY_LENGTH)
      }
    },
    [setLength],
  )
  return (
    <PasswordLayout
      password={password}
      handleChange={handleChange}
      subHeading="Customize and Modify Your Selection"
    >
      <div className="w-full text-left">
        <p className="my-1">Password Length</p>
        <div className="flex gap-5 mt-2">
          <input
            id="passwordLength"
            type="number"
            min="1"
            max="50"
            value={length}
            onChange={onSetLengthInputChange}
            onBlur={onSetLengthInputBlur}
            className="input input-bordered  w-15 text-center pr-0"
          />
          <input
            className="range range-primary my-auto flex-auto"
            type="range"
            min={MIN_CATEGORY_LENGTH}
            max={MAX_CATEGORY_LENGTH}
            step="1"
            value={length}
            onChange={onLength}
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-2 ">
        {Object.entries(cretaria).map(item => (
          <div
            className={cn(
              'transition-all alert w-full shadow py-2 swap swap-rotate',
              password.length
                ? !!item[1].valid
                  ? 'text-success swap-active'
                  : 'text-error'
                : 'text-base',
            )}
            key={item[0]}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 swap-off"
              aria-details="error"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 swap-on"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
            {item[1].msg}
          </div>
        ))}
      </div>
      {/* </div> */}
    </PasswordLayout>
  )
}
