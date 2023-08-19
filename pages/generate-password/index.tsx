import GeneratePassword from "@/components/projects/password/passwordGenerator";

export default function PasswordGenerator() {
  return (
    <article
      // className="prose lg:prose-md prose-headings:text-offwhite prose-h1:leading-none  prose-h1:mb-0  text-center text-offwhite max-w-[900px] mx-auto px-3 py-5 mt-5"
      className="prose lg:prose-md  prose-h1:leading-none  prose-h1:mb-0  text-center  max-w-[900px] mx-auto px-3 py-5 my-7"
    >
      <h1>Random Password Generator </h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <GeneratePassword />
    </article>
  );
}
