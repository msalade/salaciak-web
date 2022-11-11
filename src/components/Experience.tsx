import { Fragment } from "react";

export type ExpData = {
  title: string;
  company: string;
  description: string;
};

const Experience = ({ expData }: { expData: ExpData[] }) => {
  return (
    <span>
      {expData.map(({ title, company, description }) => (
        <Fragment key={title + company}>
          <strong>{title}</strong>
          <br />
          <i>{company}</i> <br /> <br />
          {description}
          <br />
          <br />
          <hr />
          <br />
        </Fragment>
      ))}
    </span>
  );
};

export default Experience;
