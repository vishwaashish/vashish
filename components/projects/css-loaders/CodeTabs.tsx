import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CodeTab from './CodeTab'

interface CodeTabsProps {
  defaultValue: string
  codeTabClassName?: string
  options: {
    icon: JSX.Element
    title: string
    value: string
    element: string
    parser: string
  }[]
}

const CodeTabs = ({
  defaultValue,
  options,
  codeTabClassName,
}: CodeTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList className="grid w-full grid-cols-2">
        {options.map(option => (
          <TabsTrigger key={option.title} value={option.value}>
            {/* <InnerHTML html={option.icon}></InnerHTML> */}
            {option.icon}
            &nbsp; &nbsp;
            {option.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {options.map(option => (
        <TabsContent key={option.title} value={option.value}>
          <CodeTab
            element={option.element}
            parser={option.parser}
            className={codeTabClassName}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default CodeTabs
