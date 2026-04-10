import AboutClient from "./AboutClient"

export const metadata = {
  title: "About | Technical Students' Society GNDU",
  description: "Learn about TSS GNDU, a student-led technical society at Guru Nanak Dev University focused on innovation, skill development, and community building."
}

export default async function AboutPage() {
  return <AboutClient />;
}
