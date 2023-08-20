import { getRandom } from '@/components/utils'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import {
  CategoriesMap,
  InitialMap,
  MAX_CATEGORY_LENGTH,
  MIN_CATEGORY_LENGTH,
  charactersModal,
  charactersUsed,
  initialCategory,
  CategoryModal,
  initialState,
  StateModel,
} from './data'
import PasswordLayout from '../PasswordLayout'

export default function GeneratePassword() {
  const [password, setPassword] = useState<string>('')
  const [isCheck, setIsCheck] = useState<StateModel>(initialState)
  const [length, setLength] = useState<number>(8)
  const [categories, setCategories] = useState<CategoryModal>(initialCategory)

  const disabled = useCallback(
    (name: string) => {
      return (
        !_.some(isCheck, (val, key) => val.checked && key !== name) ||
        _.find(categories, val => val.checked)?.disabled.includes(name)
      )
    },
    [categories, isCheck],
  )

  const onSetLengthInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      setLength(+e.target.value)
    },
    [setLength],
  )

  const onSetLength = useCallback((e: ChangeEvent<HTMLInputElement> | any) => {
    setLength(+e.target.value)
  }, [])

  const generateRandomPassword = useCallback(
    (options: charactersModal<boolean>, max: number = length) => {
      return new Promise<string>(resolve => {
        let password = ''
        let availableChars = ''

        _.forEach(charactersUsed, (pvalue, pname) => {
          if (options[pname as keyof charactersModal<boolean>]) {
            const randomChar = getRandom(pvalue).char
            password += randomChar
            availableChars += pvalue
          }
        })

        const remainingLength = max - password.length

        for (let i = 0; i < remainingLength; i++) {
          const randomIndex = getRandom(availableChars).index
          password += availableChars[randomIndex]
        }

        const newPassword = _.shuffle(password.split('')).join('')

        resolve(newPassword)
      })
    },
    [length],
  )

  const generatePassword = useCallback(
    async (val: StateModel, len: number) => {
      const options: any = _.mapValues(val, 'checked')
      await generateRandomPassword(options, len).then(val => {
        setPassword(val)
      })
    },
    [setPassword, generateRandomPassword],
  )

  const onCheck = useCallback(
    ([pname, pvalue]: InitialMap) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const check = _.assign({}, isCheck, {
          [pname]: _.assign({}, pvalue, { checked: e.target.checked }),
        })
        setIsCheck(check)
      },
    [isCheck],
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

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      setPassword(e.target.value)
    },
    [setPassword],
  )

  const onCategories = useCallback(
    ([pname, pvalue]: CategoriesMap) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setCategories(cat => {
          return _.chain(cat)
            .mapValues((value, key) => ({
              ...value,
              checked: key === pname,
            }))
            .value()
        })

        const check = _.chain(isCheck)
          .mapValues((value, key) => {
            const found = _.includes(pvalue.enabled, key)
            return {
              ...value,
              checked: found,
            }
          })
          .value()

        setIsCheck(check)
      },
    [isCheck],
  )

  useEffect(() => {
    generatePassword(isCheck, length)
  }, [generatePassword, isCheck, length])

  return (
    // <div className="max-w-[600px] m-auto">
    <PasswordLayout
      password={password}
      handleChange={handleChange}
      subHeading="Customize your password"
      inputBody={
        <motion.a
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          role="button"
          // className="text-offwhite"
          title="Regenerate Password"
          onClick={() => {
            generatePassword(isCheck, length)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 transition-all hover:animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </motion.a>
      }
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
            onChange={onSetLength}
          />
        </div>
      </div>

      <div className="w-full text-left">
        <p className="my-1">Password Type:</p>
        <div className="flex flex-wrap  gap-x-7 gap-y-2 mt-2">
          {_.map(Object.entries(categories), ([pname, pvalue]) => {
            return (
              <div className="form-control" key={pname}>
                <label className="cursor-pointer label " htmlFor={pname}>
                  <input
                    className="radio radio-primary"
                    name="category"
                    id={pname}
                    value={pname}
                    checked={!!pvalue.checked}
                    onChange={onCategories([pname, pvalue])}
                    type="radio"
                  />
                  <span className="label-text pl-2">{pvalue.label}</span>
                </label>
              </div>
            )
          })}
        </div>
      </div>

      <div className="w-full text-left">
        <p className="my-1">Characters used:</p>
        <div className="flex flex-wrap    gap-x-7 gap-y-2">
          {_.map(Object.entries(isCheck), ([pname, pvalue]) => {
            const isDisabled = disabled(pname)
            return (
              <div className="form-control" key={pname}>
                <label className="label cursor-pointer" htmlFor={pname}>
                  <input
                    className={`checkbox checkbox-primary `}
                    id={pname}
                    name={pname}
                    checked={pvalue.checked}
                    onChange={onCheck([pname, pvalue])}
                    type="checkbox"
                    disabled={isDisabled}
                  />
                  <span className="label-text pl-2">{pvalue.label}</span>
                </label>
              </div>
            )
          })}
        </div>
      </div>
      {/* </div> */}
    </PasswordLayout>
    // </div>
  )
}
