import { cn } from '@/components/utils'
import { RelatedProjectsType } from '@/types/common.model'

export const projectMeta: RelatedProjectsType = {
  passwordGenerator: {
    title: 'Password Generator',
    // description:
    //   'Create Strong Passwords Easily - Generate secure, random passwords effortlessly.',
    description:
      'Generate Strong Random Passwords Online - Create secure and unique passwords effortlessly with our Password Generator tool.',
    path: 'generate-password',
    icon: className => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('w-6 h-6', className)}
      >
        <path
          fill="hsl(var(--p))"
          fillRule="evenodd"
          d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
    className: '',
  },

  passwordValidator: {
    title: 'Password Validator',
    description:
      'Check Password Strength Online - Evaluate the strength of your passwords and ensure your online accounts are well-protected with our Password Validator.',

    // description:
    //   'Check Password Strength - Evaluate the security of your passwords instantly.',
    path: 'validate-password',
    icon: className => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('w-6 h-6', className)}
      >
        <path
          fill="hsl(var(--p))"
          fillRule="evenodd"
          d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
    className: '',
  },
  CSSLoaders: {
    title: 'CSS Loaders',
    // description:
    //   'Unique CSS Loading Animations - Explore a variety of captivating CSS loading animations for your website.',
    description:
      'Collection of CSS Loading Animations - Explore a diverse selection of CSS loaders for your web projects, enhancing user experiences with captivating loading animations.',
    path: 'css-loaders',
    icon: className => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn('w-6 h-6', className)}
      >
        <path
          fill="hsl(var(--p))"
          fillRule="evenodd"
          d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
          clipRule="evenodd"
        />
      </svg>
    ),
    className: '',
  },
  quotes: {
    title: 'Quotes',
    // description:
    //   'Create Strong Passwords Easily - Generate secure, random passwords effortlessly.',
    description:
      'Elevate your spirit with our vast collection of inspirational quotes. Explore timeless wisdom from renowned authors and thought leaders or craft your unique insights effortlessly. Share these words of wisdom on social media or adorn your website with thought-provoking insights in just a few clicks.',
    path: 'quotes',
    icon: className => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn('w-5 h-5', className)}
      >
        <path
          fill="hsl(var(--p))"
          fillRule="evenodd"
          d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"
        />
      </svg>
    ),
    className: '',
  },
}
