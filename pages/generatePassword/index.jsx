import GeneratePassword from "@/components/projects/passwordGenerator";

export default function PasswordGenerator() {
  return (
    <article className="prose  lg:prose-md prose-headings:text-offwhite prose-h1:leading-none  prose-h1:mb-0  text-center text-offwhite max-w-[1200px] mx-auto px-3 py-5">
      <h1>Random Password Generator </h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
      <GeneratePassword />
    </article>
  );
}
