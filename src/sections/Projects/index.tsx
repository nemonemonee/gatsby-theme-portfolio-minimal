import React from 'react';
import { Animation } from '../../components/Animation';
import { Section } from '../../components/Section';
import { Slider } from '../../components/Slider';
import { Button, ButtonType } from '../../components/Button';
import { Project } from '../../components/Project';
import { PageSection } from '../../types';
import { useLocalDataSource } from './data';
import * as classes from './style.module.css';

export function ProjectsSection(props: PageSection): React.ReactElement {
    const response = useLocalDataSource();
    const allFiles = response.allFile.projectFiles;
    const fileNameNeedle = props.fileName ? props.fileName : 'projects';
    const result = allFiles.find((file) => {
        return file.name == fileNameNeedle;
    });
    const section = result ? result.section[0] : allFiles[0].section[0];
    const shouldShowButton = section.button.visible !== false;
    const initiallyShownProjects = section.button.initiallyShownProjects ?? 3;
    const [shownProjects, setShownProjects] = React.useState<number>(
        shouldShowButton ? initiallyShownProjects : section.projects.length,
    );
    function loadMoreProjectsHandler() {
        setShownProjects(section.projects.length);
        section.button.visible = false;
    }
    return (
        <Animation type="fadeIn">
            <Section anchor={props.sectionId} heading={props.heading}>
                <Slider additionalClasses={[classes.Projects]}>
                    {section.projects.slice(0, shownProjects).map((project, key) => {
                        return project.visible ? <Project key={key} index={key} data={project} /> : null;
                    })}
                </Slider>
                {section.button !== undefined && section.button.visible !== false && (
                    <Animation type="fadeIn" delay={(shownProjects + 1) * 100}>
                        <Button
                            type={ButtonType.BUTTON}
                            onClickHandler={loadMoreProjectsHandler}
                            label={section.button.label}
                        />
                    </Animation>
                )}
            </Section>
        </Animation>
    );
}
