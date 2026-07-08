import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckBox from "../Elements/CheckBox";
import Button from "../Elements/Button";
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

// Skema validasi Formik + Yup, mengikuti pola yang sama dengan form Login
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Nama minimal 3 karakter")
    .required("Nama lengkap wajib diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .required("Password wajib diisi"),
  agree: Yup.boolean()
    .oneOf([true], "Anda harus menyetujui syarat dan ketentuan"),
});

function FormSignUp(props) {
  const { onSubmit } = props;
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      agree: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSubmit(values);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {/* form start */}
      <div className="mt-10">
        <form onSubmit={formik.handleSubmit} noValidate>

          {/* Full Name field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-01 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-02">
                <FiUser size={18} />
              </span>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-4 py-3 text-sm rounded-md bg-special-mainBg border text-defaultBlack focus:outline-none focus:ring-0 transition-colors ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-05 focus:border-primary"
                }`}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500 mt-1.5">{formik.errors.name}</p>
            )}
          </div>

          {/* Email field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-01 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-02">
                <FiMail size={18} />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="hello@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-4 py-3 text-sm rounded-md bg-special-mainBg border text-defaultBlack focus:outline-none focus:ring-0 transition-colors ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-05 focus:border-primary"
                }`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500 mt-1.5">{formik.errors.email}</p>
            )}
          </div>

          {/* Password field with show/hide toggle */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-01 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-02">
                <FiLock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-10 py-3 text-sm rounded-md bg-special-mainBg border text-defaultBlack focus:outline-none focus:ring-0 transition-colors ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-05 focus:border-primary"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-02 hover:text-gray-01 transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1.5">{formik.errors.password}</p>
            )}
          </div>

          <div className="mb-1">
            <CheckBox
              label="I agree to the terms and conditions"
              id="agree"
              type="checkbox"
              name="agree"
              checked={formik.values.agree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.agree && formik.errors.agree && (
            <p className="text-xs text-red-500 mb-4 ml-6">{formik.errors.agree}</p>
          )}

          <div className={formik.touched.agree && formik.errors.agree ? "mt-4" : "mt-5"}>
            <Button type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Loading.." : "Register"}
            </Button>
          </div>
        </form>
      </div>
      {/* form end */}

      {/* link */}
      <div className="flex justify-center text-sm text-gray-01 mt-6">
        Already have an account?&nbsp;
        <Link to="/login" className="text-primary font-bold">
          Sign In Here
        </Link>
      </div>
    </>
  );
}

export default FormSignUp;
