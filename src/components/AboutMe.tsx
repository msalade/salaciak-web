const AboutMe = () => {
  const exp = Math.abs(new Date(Date.now()).getUTCFullYear() - 2018);

  return (
    <span>
      Hello 👋 <br />
      My name is <strong>Michał Sałaciak</strong>. <br />
      I&apos;m <strong>full stack</strong> software developer with {exp} years
      of industry experience building websites, web and mobile applications.
      <br />
      <br />
      me.jpeg
      <br />
      <Image src="/me.jpeg" height={167} width={125} alt="me" />
      <br />
    </span>
  );
};

export default AboutMe;
