import { useForm } from "react-hook-form";

export const Login = () => {
    const {
        regsiter,
        formState: { errors },
        getValues,
        handleSubmit
    } = useForm({
        defaultValues: {
            name:'',
            email:'',
            password:''
        }
    });

    return(
        <div>
            <h2 className="text-2xl mb-3">Login</h2>
            <form>
                <div>Email
                    <input type="email" className="ml-2 mb-3 border border-slate-700 rounded-sm" />
                </div>
                <div>Password
                    <input type="password" className="ml-2 mb-3 border border-slate-700 rounded-sm" />
                </div>
                <input type="submit" value="Login" className="p-2 border border-slate-700 rounded-sm" />
            </form>
        </div>
    );
}