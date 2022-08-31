import axios from 'axios';
import { useForm } from "react-hook-form";

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            Account: '',
            Password: ''
        }
    });
    const onSubmit = data => {
        console.log(data);

        const {
            Account,
            Password
        } = data;

        axios
            .post(`https://easysplit.rocket-coding.com/api/User/Login`,
                {
                    "Account": Account,
                    "Password": Password.trim()
                })
            .then(res => {
                console.log(res);
                console.log("登入成功");
            })
            .catch(err => {
                console.log(err);
            });


        //     var myHeaders = new Headers();
        //     myHeaders.append("Content-Type", "application/json");

        //     var raw = JSON.stringify({
        //         "Name": "Dora",
        //         "Account": "poyuhq@gmail.com",
        //         "Password": "VV778899"
        //     });

        //     var requestOptions = {
        //         method: 'POST',
        //         headers: myHeaders,
        //         body: raw,
        //         redirect: 'follow'
        //     };

        //     fetch("https://easysplit.rocket-coding.com/api/user/SignUp", requestOptions)
        //         .then(response => response.text())
        //         .then(result => console.log(result))
        //         .catch(error => console.log('error', error));
    }

    // const {
    //     regsiter,
    //     formState: { errors },
    //     getValues,
    //     handleSubmit
    // } = useForm({
    //     defaultValues: {
    //         name:'',
    //         email:'',
    //         password:''
    //     }
    // });

    return (
        <div>
            <h2 className="text-2xl mb-3">Login</h2>
            <form
                className="flex flex-col w-1/3"
                onSubmit={handleSubmit(onSubmit)}>
                <label
                    htmlFor="Account">
                    Email
                </label>
                <input
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="email"
                    placeholder="email"
                    {...register("Account",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "格式有誤!"
                            }
                        }
                    )}
                />
                <p
                    className="text-xs mb-2 text-rose-600">
                    {errors.Account?.message}
                </p>
                <label
                    htmlFor="Password">
                    Password
                </label>
                <input
                    className="mb-3 border border-slate-700 rounded-sm"
                    type="password"
                    placeholder="Password"
                    {...register("Password",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            minLength: {
                                value: 8,
                                message: "密碼長度至少6位字元"
                            }
                        }
                    )} />
                <p className="text-xs mb-2 text-rose-600">{errors.Password?.message}</p>

                <input
                    className="p-2 border border-slate-700 rounded-sm w-1/3"
                    value="Login"
                    type="submit" />
            </form>

            {/* <form>
                <div>Name
                    <input type="text" className="ml-2 mb-3 border border-slate-700 rounded-sm"/>
                </div>
                <div>Email
                    <input type="email" className="ml-2 mb-3 border border-slate-700 rounded-sm"/>
                </div>
                <div>Password
                    <input type="password" className="ml-2 mb-3 border border-slate-700 rounded-sm"/>
                </div>
                <input type="submit" value="Signup" className="p-2 border border-slate-700 rounded-sm"/>
            </form> */}
        </div>
    );
}