import { cn, getRandom } from '@/components/utils'
import { copyText } from '@/components/utils/text'
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

export default function GeneratePassword() {
  const [password, setPassword] = useState<string>('')
  const [isCheck, setIsCheck] = useState<StateModel>(
    initialState,
  )
  const [length, setLength] = useState<number>(8)
  const [categories, setCategories] = useState<CategoryModal>(
    initialCategory,
  )

  const disabled = useCallback(
    (name: string) => {
      return (
        !_.some(isCheck, (val, key) => val.checked && key !== name) ||
        _.find(categories, val => val.checked)?.disabled.includes(name)
      )
    },
    [isCheck],
  )

  const onSetLengthInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      setLength(+e.target.value)
    },
    [setLength],
  )

  const onSetLength = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any) => {
      setLength(+e.target.value)
    },
    [setLength, setLength],
  )

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
    [],
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
    [length, isCheck, setIsCheck],
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
    [setCategories, setIsCheck, length, isCheck],
  )

  useEffect(() => {
    generatePassword(isCheck, length)
  }, [isCheck, length])

  const onCopy = async () => {
    await copyText(password)
  }
  return (
    <div className="max-w-[600px] m-auto">
      <div className="flex items-center relative">
        <input
          className={cn(
            'input input-bordered w-full text-xl md:text-2xl input-lg pl-4 pr-[85px]',
          )}
          value={password}
          onChange={handleChange}
        />
        <div className=" flex gap-2 absolute right-5 ">
          <motion.a
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            title="Copy"
            role="button"
            onClick={onCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </motion.a>
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
        </div>
      </div>

      <h3 className="mb-2">Customize your password</h3>
      <div
        className="transition-all card input input-bordered h-full  bg-base-100 shadow-xl  p-4 sm:p-8 rounded-lg items-start  flex flex-col gap-5"
        style={{
          borderColor: 'hsl(var(--bc) / var(--tw-border-opacity))',
        }}
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
      </div>
    </div>
  )
}
