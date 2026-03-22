// DISPLAYS STEPS AND STEP-ADDER

import React, {type ChangeEvent, type ReactNode, useState} from "react";
import {IoAdd} from "react-icons/io5";
import {useModal, useTasksUpdater} from "../hooks/hooks.ts";
import {GrClose} from "react-icons/gr";
import type {Step} from "../types/tasks";
import {CompletionBtn} from "./CompletionBtn.tsx";
import classnames from "classnames";
import {useFocusedTask} from "../api/apiSlice.ts";

const StepsAdder = () => {
    const [stepTitle, setStepTitle] = useState("");
    const { addNewStep } = useTasksUpdater();
    const { task } = useFocusedTask();
    if (!task) return null;
    const handleStepTitle = (e: ChangeEvent<HTMLInputElement>) => ( setStepTitle(e.target.value));
    const handleAddNewStep = async () => {
        const title = stepTitle;
        setStepTitle("");
        await addNewStep(task, title);
    };

    let addBtn: ReactNode;
    if (stepTitle.trim() !== "") {
        addBtn = (
            <button
                    className="addStepButton"
                    /*disabled={!stepTitle.trim()}*/
                    style={{ color: '#2564cf'}}
                    onClick={handleAddNewStep}
                >
                    Add
                </button>
        );
    }

    return (
        <div className="stepAdder-container">
            <div className="stepTitle-container">
                <IoAdd className="add-step-icon" />
                <input
                    className="step-title"
                    type="text"
                    placeholder={ task.steps?.length ? "Next step" : "Add step" }
                    value={stepTitle}
                    onChange={handleStepTitle}
                />
                {addBtn}
            </div>
        </div>
    );
};

interface StepProps {
   step: Step;
}
const Step = ({step}: StepProps) => {

    const { toggleDialogBox } = useModal();
    const { updateStepTitle } = useTasksUpdater();
    const { task } = useFocusedTask();
    if (!task) return null;

    const handleStepTitle = async (e: React.FocusEvent<HTMLSpanElement>) => {
        const title = e.target.textContent?.trim();
        // if title === empty , call warning dialog for deletion
        // else update title
        if (title && title !== step.title) {
            await updateStepTitle(task, step.id, title);
        }
    };

    const handleDeletion = () => {
        toggleDialogBox(step.id);
    };

    const stepClassname = classnames('step-completed-title', { disabled: !step.isCompleted});

    return (
        <div className="stepTitle-container">
            <CompletionBtn task={task} step={step} />
            <span
                className={ stepClassname + " step-title"}
                // DISPLAY WARNING DIALOG ONBLUR IF STEP.TITLE === EMPTY
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={handleStepTitle}
                /*onChange={handleStepTitle}*/
            >{step.title}</span>
            <GrClose
                className="delete-step-btn"
                onClick={handleDeletion}
                title="Delete step"
            />
        </div>
    );
};

export const Steps = () => {

    const { task } = useFocusedTask();
    if (!task) return null;
    let steps: ReactNode;
    //console.log(task.steps);
    steps = task.steps?.map((step) => <Step key={step.id} step={step}/>);

    return (
        <div className="steps-container">
            {steps}
            <StepsAdder />
        </div>

    );
};
