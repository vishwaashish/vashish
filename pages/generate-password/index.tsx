import { projectMeta } from '@/common/constants'
import ProjectLayout from '@/components/projects/ProjectLayout'
import GeneratePassword from '@/components/projects/password/passwordGenerator'

export default function PasswordGenerator() {
  return (
    <ProjectLayout
      title={projectMeta.passwordGenerator.title}
      description={projectMeta.passwordGenerator.description}
    >
      <section>
        <article className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center  max-w-[900px] mx-auto px-3 py-5 my-7">
          <h1>Generate Strong Random Passwords with Ease</h1>
          <p>
            Elevate your digital security with our Random Password Generator.
            Craft strong, unpredictable passwords effortlessly, bolstering your
            online protection against unauthorized access. Stay one step ahead
            of potential threats with ease.
          </p>
          📌 To bookmark this page, simply press{' '}
          <kbd className="kbd">Ctrl+D</kbd>.
          <br />
          <br />
          <GeneratePassword />
        </article>
      </section>
      <br />
      <br />
    </ProjectLayout>
  )
}
