// import React, { ReactNode, Children } from 'react'

// interface ShowProps {
//   children: ReactNode
// }

// export const Show = (props: ShowProps) => {
//   let when: ReactNode | null = null
//   let otherwise: ReactNode | null = null

//   Children.forEach(props.children, child => {
//     const children = child as React.ReactElement<{ isTrue?: boolean }>
//     if (children.props.isTrue === undefined) {
//       otherwise = children
//     } else if (!when && children.props.isTrue === true) {
//       when = children
//     }
//   })

//   return when || otherwise
// }

// interface ShowWhenProps {
//   isTrue: boolean
//   children: ReactNode
// }

// // Show.When = ({ isTrue, children }: ShowWhenProps) => isTrue && children

// interface ShowElseProps {
//   render?: ReactNode
//   children: ReactNode
// }

// Show.Else = ({ render, children }: ShowElseProps) => render || children

// Show.When = ({ isTrue, children }: ShowWhenProps) =>
//   isTrue && <React.Fragment>{children}</React.Fragment>

// // Show.When.displayName = 'Show.When'
