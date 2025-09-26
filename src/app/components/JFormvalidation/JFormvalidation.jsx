import { useState, useEffect, useCallback } from "react";
import { validationAllControl, validationbyControl } from "./@validation";

export default function JFormvalidation({
    // props hiện có
    values,
    validation,
    language,
    ssearch,
    sform,
    cdlist,
    status,
    fetchData,
    controlData,
    handleChange: parentHandleChange,
    handleBlur: parentHandleBlur,
    handleClear: parentHandleClear,
    handleCancel,
    onSubmit,
    children,
}) {
    const [errors, setErrors] = useState({ default: "" });

    // Re-validate toàn bộ khi đổi ngôn ngữ (giống componentDidUpdate( được gọi ngay sau khi DOM RENDER và có thể apply state check để render lại) check language)
    useEffect(() => {
        // const validate = validationAllControl(language, values, validation);
        // setErrors(validate.errorMessage);
        
        
    }, [language]);

    const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;

            if (parentHandleChange) {
                parentHandleChange(event);
                // const validate = validationbyControl(
                //     language,
                //     values,
                //     validation,
                //     name,
                //     value
                // );
                // setErrors((prev) => ({ ...prev, [name]: validate.errorMessage }));
            }
        },
        [parentHandleChange, language, values, validation]
    );

    const handleBlur = useCallback(
        (event) => {
            if (parentHandleBlur) parentHandleBlur(event);
        },
        [parentHandleBlur]
    );

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();
            // const validate = validationAllControl(language, values, validation);
            // setErrors(validate.errorMessage);
            // if (onSubmit && validate.isSuccess) onSubmit(event);
        },
        [language, values, validation, onSubmit]
    );

    const handleClear = useCallback(
        (event) => {
            event.preventDefault();
            setErrors({ default: "" });
            if (parentHandleClear) parentHandleClear(event);
        },
        [parentHandleClear]
    );

    // Giữ nguyên pattern render-prop: children là 1 function
    return (
        <div>
            {children({
                values,
                errors,
                ssearch,
                sform,
                cdlist,
                handleChange,
                handleBlur,
                handleSubmit,
                handleClear,
                handleCancel,
                fetchData,
                controlData,
                language,
                status,
            })}
        </div>
    );
}
