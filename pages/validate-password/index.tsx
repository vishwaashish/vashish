import ValidatePassword from "@/components/projects/password/passwordValidator";

export default function PasswordGenerator() {
  return (
    <article className="prose lg:prose-md prose-headings:text-offwhite prose-h1:leading-none  prose-h1:mb-0  text-center text-offwhite max-w-[900px] mx-auto px-3 py-5 mt-5">
      <h1>Check Your Password Strength </h1>
      <p>
      Discover how strong your password is with our Password Strength Checker. Enter your password, and we&apos;ll analyze its robustness based on factors such as length, complexity, and diversity of characters. Strengthen your online security by crafting passwords that pass the test and keep your accounts safe.
      </p>
      <ValidatePassword />
    </article>
  );
}
