"use server";


import { signupFormValues, signupSchema } from "../schemas/signup.schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export default async function signupAction(values: signupFormValues) {
  const validationResult = signupSchema.safeParse(values);
  console.log({ validationResult });

  // !validation => errors
  if (!validationResult.success) {
    // TODO : get validation errors
    const errors: Record<string, string> = {}; //  ^ e.g {name:"name is required"}, {password:password must be at least 8 characters}

    if (validationResult.error) {
      validationResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        const message = issue.message;

        // i cant use the dot notation here .. i must use the bracket notation
        if (!errors[field]) {
          errors[field] = message;
        }
      });
    }

    return {
      success: false,
      message: "validation errors",
      errors,
    };
  }

  //  * validation => success
  const requestBody = {
    name: values.name,
    email: values.email,
    password: values.password,
    rePassword: values.rePassword,
    phone: values.phone,
  };

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: requestBody,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "account created successfully",
        data,
      };
    }

    return {
      success: false,
      message: data.message || "something went wrong",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data.message;
      if (errorMessage === "Account Already Exists") {
        return {
          success: false,
          message: "account exists",
          errors: {
            email: "an account with this email already exists",
          },
        };
      }
    }

    return {
      success: false,
      message: "something went wrong , please try again later",
    };
  }
}

// *validationResult => Success

//   const validationResult = {
//     success: true,
//     data: {
//       name: 'Amr El Rashidy',
//       email: 'amr.rashidy2020@gmail.com',
//       password: 'Amr@0000',
//       rePassword: 'Amr@0000',
//       phone: '01069021226',
//       terms: true
//     }
//   }

// ! validationResult =>error

//   const validationResult = {
//     success: false,
//     error:  [
//       {
//         "origin": "string",
//         "code": "too_small",
//         "minimum": 3,
//         "inclusive": true,
//         "path": [
//           "name"
//         ],
//         "message": "name must be at least 3 characters long"
//       },
//       {
//         "origin": "string",
//         "code": "invalid_format",
//         "format": "email",
//         "pattern": "/^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
//         "path": [
//           "email"
//         ],
//         "message": "invalid email address"
//       },
//       {
//         "origin": "string",
//         "code": "too_small",
//         "minimum": 8,
//         "inclusive": true,
//         "path": [
//           "password"
//         ],
//         "message": "password must be at least 8 characters long"
//       },
//       {
//         "origin": "string",
//         "code": "invalid_format",
//         "format": "regex",
//         "pattern": "/[A-Z]/",
//         "path": [
//           "password"
//         ],
//         "message": "Password must contain at least one uppercase letter"
//       },
//       {
//         "origin": "string",
//         "code": "invalid_format",
//         "format": "regex",
//         "pattern": "/[a-z]/",
//         "path": [
//           "password"
//         ],
//         "message": "Password must contain at least one lowercase letter"
//       },
//       {
//         "origin": "string",
//         "code": "invalid_format",
//         "format": "regex",
//         "pattern": "/[a-z]/",
//         "path": [
//           "password"
//         ],
//         "message": "Password must contain at least one number"
//       },
//       {
//         "origin": "string",
//         "code": "invalid_format",
//         "format": "regex",
//         "pattern": "/[!@#$%^&*(),.?\":{}|<>]/",
//         "path": [
//           "password"
//         ],
//         "message": "Password must contain at least one special character"
//       },
//       {
//         "origin": "string",
//         "code": "invalid_format",
//         "format": "regex",
//         "pattern": "/^(\\+2)?01[0125][0-9]{8}$/",
//         "path": [
//           "phone"
//         ],
//         "message": "only Egyptiam numbers are allowed"
//       },
//       {
//         "code": "custom",
//         "path": [
//           "terms"
//         ],
//         "message": "you must accept the terms and conditions"
//       }
//     ]
// }
