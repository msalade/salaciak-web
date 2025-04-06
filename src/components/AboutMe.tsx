import Image from "next/image";

const exp = Math.abs(new Date(Date.now()).getUTCFullYear() - 2018);

const AboutMe = () => (
  <span>
    Hello 👋 <br />
    My name is <strong>Michał Sałaciak</strong>. <br />
    I am a Senior Software Engineer with {exp} years of experience in full-stack development, specializing in
    microservices and cloud-based solutions. I have worked on backend applications, frontend, mobile, and the pitch of DevOps. My background includes designing and optimizing multi-service data-intensive
    applications within large distributed systems and create a simple CRUD API. In addition to
    writing code, I also had the opportunity to participate in RND work on new features with product
    owners and domain experts.
    <br />
    <br />
    me.jpeg
    <br />
    <Image src="/me.jpeg" height={167} width={125} alt="me" />
    <br />
  </span>
)

export default AboutMe;
