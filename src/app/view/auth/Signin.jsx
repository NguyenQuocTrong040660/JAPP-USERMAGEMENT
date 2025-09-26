import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { loginWithUserAndPassword } from "../../redux/actions/LoginActions";
import { getLangText } from "../../utils/@lang";
import BasicModal from "../../components/JModal/BasicModal";
import JFormvalidation from "../../components/JFormvalidation/JFormvalidation";

export default function Signin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy state từ Redux (giữ đúng tên nhánh store của bạn)
    const login = useSelector((s) => s.login);
    const languageObj = useSelector((s) => s.language); // { lang: 'vi' | 'en' | ... }

    // Local state cho form
    const [data, setData] = useState({ username: "", password: "" });
    const [showWarning, setShowWarning] = useState(false);
    const [warning, setWarning] = useState("");

    // Validation rules giữ nguyên như bản class
    const validation = {
        username: {
            caption: '{"en": "Username", "vi": "Tài khoản" , "kh": "ឈ្មោះ​អ្នកប្រើប្រាស់"}',
            isRequired: true,
            minLength: 6,
        },
        password: {
            caption: '{"en": "Password", "vi": "Mật khẩu" , "kh": "ពាក្យសម្ងាត់"}',
            isRequired: true,
            minLength: 6,
        },
    };

    // Thay cho componentDidMount: nhận cảnh báo từ redirect
    useEffect(() => {
        if (
            location.state &&
            location.state.warning &&
            location.state.showWarning
        ) {
            setWarning(location.state.warning);
            setShowWarning(location.state.showWarning);
            navigate(location.pathname, { replace: true }); // xóa state để tránh lặp lại khi back
        }
        // chỉ chạy lần đầu
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle navigation after successful login
    useEffect(() => {
        if (login.success) {
            navigate("/", { replace: true });
        }
    }, [login.success, navigate]);

    // === handlers (giữ luồng như bản class) ===
    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        // immutable update, tránh mutate state
        setData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(() => {
        dispatch(loginWithUserAndPassword(data));
    }, [dispatch, data]);

    const handleClose = useCallback(() => {
        setShowWarning(false);
    }, []);

    const langCode = languageObj?.lang; // ví dụ: 'vi' | 'en'

    return (
        <div
            className="auth-layout-wrap"
            style={{ backgroundImage: "url(/assets/images/photo-wide-4.jpg)" }}
        >
            <BasicModal
                show={showWarning}
                title="Information"
                bodyText={warning}
                handleClose={handleClose}
                isInforModal
                isRedColor
            />
            <div className="auth-content">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="p-4">
                                <div className="auth-logo text-center mb-4">
                                    <img
                                        src="/assets/images/logo.png"
                                        alt=""
                                        style={{ width: 100, height: 100 }}
                                    />
                                    <h1 style={{ alignContent: "center", fontWeight: 750, color: "#385898" }}>
                                        FAST PAYMENT SYSTEM
                                    </h1>
                                </div>

                                <JFormvalidation
                                    values={data}
                                    validation={validation}
                                    onSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    language={langCode}
                                >
                                    {({
                                        values,
                                        errors,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        handleClear,
                                        controlData,
                                        language,
                                        status,
                                    }) => (
                                        <form onSubmit={handleSubmit} onReset={handleClear}>
                                            <div className="form-group">
                                                <label id="lblusername" htmlFor="username">
                                                    {getLangText("username", langCode)}
                                                </label>
                                                <input
                                                    className="form-control form-control-rounded position-relative"
                                                    type="text" // sửa 'username' -> 'text'
                                                    name="username"
                                                    aria-labelledby="lblusername"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.username}
                                                />
                                                {errors.username && (
                                                    <div className="text-danger mt-1 ml-2">{errors.username}</div>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <label id="lblpass" htmlFor="password">
                                                    {getLangText("password", langCode)}
                                                </label>
                                                <input
                                                    className="form-control form-control-rounded"
                                                    type="password"
                                                    name="password"
                                                    aria-labelledby="lblpass"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                {errors.password && (
                                                    <div className="text-danger mt-1 ml-2">{errors.password}</div>
                                                )}
                                            </div>

                                            <p style={{ color: "red" }}>{login.errormessage}</p>

                                            <button
                                                type="submit"
                                                className="btn btn-rounded btn-primary btn-block mt-2"
                                                disabled={!!login.loading}
                                            >
                                                {login.loading ? (
                                                    <span
                                                        className="spinner-grow spinner-grow-sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                ) : null}
                                                {getLangText("signin", langCode)}
                                            </button>
                                        </form>
                                    )}
                                </JFormvalidation>

                                <div className="mt-3 text-center">
                                    <Link to="/forgot-password" className="text-muted">
                                        <u>{getLangText("forgotpassword", langCode)}</u>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
