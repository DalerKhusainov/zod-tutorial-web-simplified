import "./pedro-tech-form.css";
// ZOD HOOKS
import { z, ZodType } from "zod";
// REACT HOOK FROM
import { useForm } from "react-hook-form";
//
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function PedroTechForm() {
  //
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  //
  const submitData = (data: FormData) => {
    console.log("It worked", data);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(submitData)}>
          <h3>Register</h3>
          <label>First Name:</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && <span>{errors.firstName.message}</span>}

          <label>Last Name:</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && <span>{errors.lastName.message}</span>}

          <label>Email:</label>
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}

          <label>Age:</label>
          <input type="number" {...register("age", { valueAsNumber: true })} />
          {errors.age && <span>{errors.age.message}</span>}

          <label>Password:</label>
          <input type="password" {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}

          <label>Confirm Password:</label>
          <input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}

          <input type="submit" className="submit-btn" />
          {/* <button className="submit-btn" type="submit">
            Submit
          </button> */}
        </form>
      </div>
    </>
  );
}

export default PedroTechForm;
