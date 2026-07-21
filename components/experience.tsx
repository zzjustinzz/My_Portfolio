"use client";

import Image from "next/image";
import { RiBriefcase4Line, RiGraduationCapLine } from "react-icons/ri";
import { careerData, educationData } from "@/lib/data";

function Avatar({ logo }: { logo?: string; monogram?: string }) {
  return (
    <span className={`career-avatar ${logo ? "has-logo" : "is-default"}`} aria-hidden="true">
      {logo ? (
        <Image src={logo} alt="" width={56} height={56} sizes="(max-width: 40rem) 48px, 56px" />
      ) : (
        <RiBriefcase4Line />
      )}
    </span>
  );
}

function SkillTags({ skills }: { skills?: string[] }) {
  if (!skills?.length) return null;

  return (
    <div className="tag-list career-skills">
      {skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section section--roomy" aria-labelledby="experience-heading">
      <div className="experience-layout page-shell">
        <header className="sticky-intro">
          <div className="accent-line" aria-hidden="true" />
          <h2 id="experience-heading" className="section-title">From engineering detail to product direction.</h2>
          <p className="section-lede">
            A career path through software quality, full-stack engineering, and product ownership.
          </p>
        </header>

        <div className="career">
          <ol className="career-list">
            {careerData.map((company) => {
              const isGrouped = company.roles.length > 1;
              const [role] = company.roles;

              return (
                <li className={`career-company ${isGrouped ? "is-grouped" : "is-single"}`} key={company.company}>
                  <div className="career-rail">
                    <Avatar logo={company.logo} monogram={company.monogram} />
                  </div>
                  <div className="career-body">
                    {isGrouped ? (
                      <>
                        <div className="career-company-summary">
                          <h3 className="career-org">{company.company}</h3>
                          <p className="career-company-meta">
                            {company.employment && <span>{company.employment}</span>}
                            <span>{company.period}</span>
                          </p>
                        </div>

                        <ol className="career-roles is-grouped">
                          {company.roles.map((groupedRole) => (
                            <li className="career-role" key={groupedRole.title}>
                              <h4>{groupedRole.title}</h4>
                              <p className="career-role-meta">
                                <span>{groupedRole.period}</span>
                                {groupedRole.location && <span>{groupedRole.location}</span>}
                              </p>
                              {groupedRole.description && <p className="career-role-desc">{groupedRole.description}</p>}
                              {groupedRole.highlights && (
                                <ul className="career-highlights">
                                  {groupedRole.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                                </ul>
                              )}
                              <SkillTags skills={groupedRole.skills} />
                            </li>
                          ))}
                        </ol>
                      </>
                    ) : (
                      <article className="career-role career-role--single">
                        <h3>{role.title}</h3>
                        <p className="career-company-line">
                          {company.company}
                          {company.employment && <span> · {company.employment}</span>}
                        </p>
                        <p className="career-role-meta">
                          <span>{company.period}</span>
                          {role.location && <span>{role.location}</span>}
                        </p>
                        {role.description && <p className="career-role-desc">{role.description}</p>}
                        {role.highlights && (
                          <ul className="career-highlights">
                            {role.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                          </ul>
                        )}
                        <SkillTags skills={role.skills} />
                      </article>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="career-education">
            <h3 className="career-education-label"><RiGraduationCapLine aria-hidden="true" /> Education</h3>
            <ol className="career-list career-list--education">
              {educationData.map((item) => (
                <li className="career-company career-company--education" key={item.school}>
                  <div className="career-rail">
                    <Avatar logo={item.logo} monogram={item.monogram} />
                  </div>
                  <div className="career-body">
                    <h4 className="career-org">{item.school}</h4>
                    <p className="career-degree">{item.degree}</p>
                    <p className="career-role-meta"><span>{item.period}</span></p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
