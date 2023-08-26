import "./App.css";

// ZOD HOOKS
import { z } from "zod";

// PUTTING HOBBIES VALUE IN AN ARRAY
const hobbies = ["Programming", "Weight Lifting", "Guitar"] as const;

hobbies.push("Gaming"); // it says Property 'push' does not exist on type 'readonly ["Programming", "Weight Lifting", "Guitar"]'.

// CREATING ZOD SCHEMA
const UserSchema = z.object({
  userName: z.string().min(3).max(5),
  age: z.number().gt(12),
  birthday: z.date(),
  isProgrammer: z.boolean(),
  hobbies: z.enum(hobbies), // <== WE GET no ERROR HERE
});

type User = z.infer<typeof UserSchema>;

const user: User = {
  userName: "WDS",
  age: 13,
  birthday: new Date(),
  isProgrammer: false,
  hobbies: "Programming",
};

console.log(UserSchema.safeParse(user).success); // true

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Zod Titorial</h1>
      </div>
    </>
  );
}

export default App;
