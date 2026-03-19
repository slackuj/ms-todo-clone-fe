// DISPLAYS STEPS AND STEP-ADDER

import {type ChangeEvent, type ReactNode, useState} from "react";
import { IoAdd } from "react-icons/io5";
import {useAppSelector} from "../hooks/hooks.ts";
import {selectFocusedTask} from "../store/slices/modalsSlice.ts";
import {GoCircle} from "react-icons/go";
import { GrClose } from "react-icons/gr";

const StepsAdder = () => {
    const task = useAppSelector(selectFocusedTask);
    const [stepTitle, setStepTitle] = useState("");
    const handleStepTitle = (e: ChangeEvent<HTMLInputElement>) => ( setStepTitle(e.target.value));
    //const [addNewStep] = useAddNewTaskMutation();

    /*const handleAddNewStep = async () => {
        try {
            if (dueDate) {
            await addNewStep({
                title: stepTitle,
                dueDate: dueDate
            });
            } else {
                await addNewStep({
                    title: stepTitle
                })
            }
        } catch (error) {
            console.log('failed to add new step', error);
        }
    };*/
    let addBtn: ReactNode;
    if (stepTitle.trim() !== "") {
        addBtn = (
            <button
                    className="addStepButton"
                    /*disabled={!stepTitle.trim()}*/
                    style={{ color: '#2564cf'}}
                    /*onClick={handleAddNewStep}*/
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

export const Steps = () => {

    const task = useAppSelector(selectFocusedTask);
    let steps: ReactNode;
    if (task.steps?.length){
        steps = (
            <div className="stepTitle-container">
                <GoCircle className="complete-step-icon" />
                <input
                    className="step-title"
                    type="text"
                    placeholder="Add step"
                    value={task.title}
                    /*onChange={handleStepTitle}*/
                />
                <GrClose />
            </div>
        );
    }

    return (
        <div className="steps-container">
            {steps}
            <StepsAdder />
        </div>

    );
};
